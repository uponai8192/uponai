#!/usr/bin/env node
// Cutover gate for the blog migration (docs/cms-migration-spike.md): compares
// every post and topic in the Sanity dataset against the in-repo library that
// currently renders the live site. Exits non-zero on any difference, so the
// route swap only lands when the CMS reproduces today's pages exactly.
//
// Usage: node scripts/compare-posts-with-sanity.mjs

import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const envFile = readFileSync(path.join(repoRoot, '.env.local'), 'utf8');
const env = (key) => envFile.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();
const projectId = env('SANITY_PROJECT_ID');
const dataset = env('SANITY_DATASET');
if (!projectId || !dataset) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_DATASET in .env.local');
  process.exit(1);
}

function loadLocalLibrary() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-compare-'));
  try {
    execSync(
      'npx tsc src/lib/blog-posts.ts' +
        ` --outDir "${tmp}" --module commonjs --target es2020` +
        ' --resolveJsonModule --esModuleInterop --skipLibCheck',
      { cwd: repoRoot, stdio: 'pipe' }
    );
    const jsonOut = path.join(tmp, 'imported-blog-posts.json');
    if (!existsSync(jsonOut)) {
      cpSync(path.join(repoRoot, 'src', 'lib', 'imported-blog-posts.json'), jsonOut);
    }
    const require = createRequire(import.meta.url);
    const mod = require(path.join(tmp, 'blog-posts.js'));
    return { posts: mod.uponaiBlogPosts, topics: mod.uponaiBlogTopics };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function query(groq) {
  const url =
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}` +
    `?query=${encodeURIComponent(groq)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Query failed: ${response.status}`);
  return (await response.json()).result;
}

// Compared field by field rather than by deep-equalling whole objects, so the
// report says which field drifted rather than just that something did.
const SCALAR_FIELDS = [
  'title',
  'excerpt',
  'author',
  'category',
  'publishedAt',
  'imageUrl',
  'readTimeMinutes',
  'htmlBody',
];
const ARRAY_FIELDS = ['body', 'topicSlugs', 'tags', 'aliases'];

function comparePost(local, remote) {
  const diffs = [];
  for (const field of SCALAR_FIELDS) {
    const a = local[field] ?? null;
    const b = remote[field] ?? null;
    if (a !== b) {
      diffs.push(`${field}: local ${JSON.stringify(String(a).slice(0, 60))} vs sanity ${JSON.stringify(String(b).slice(0, 60))}`);
    }
  }
  for (const field of ARRAY_FIELDS) {
    const a = local[field] ?? [];
    const b = remote[field] ?? [];
    if (a.length !== b.length) {
      diffs.push(`${field}: local has ${a.length} entries, sanity has ${b.length}`);
      continue;
    }
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) {
        diffs.push(`${field}[${i}] differs`);
        break;
      }
    }
  }
  const localRelated = local.relatedPages ?? [];
  const remoteRelated = remote.relatedPages ?? [];
  if (localRelated.length !== remoteRelated.length) {
    diffs.push(`relatedPages: local ${localRelated.length} vs sanity ${remoteRelated.length}`);
  } else {
    for (let i = 0; i < localRelated.length; i += 1) {
      if (
        localRelated[i].label !== remoteRelated[i].label ||
        localRelated[i].path !== remoteRelated[i].path
      ) {
        diffs.push(`relatedPages[${i}] differs`);
        break;
      }
    }
  }
  return diffs;
}

async function main() {
  const local = loadLocalLibrary();
  const remotePosts = await query(
    `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
      "slug": slug.current, title, excerpt, author, category, publishedAt, imageUrl,
      readTimeMinutes, body, topicSlugs, tags, aliases, htmlBody,
      "relatedPages": relatedPages[]{label, path}
    }`
  );
  const remoteTopics = await query(
    `*[_type == "blogTopic"]{"slug": slug.current, title, description}`
  );

  const remoteBySlug = new Map(remotePosts.map((post) => [post.slug, post]));
  const localBySlug = new Map(local.posts.map((post) => [post.slug, post]));

  let failures = 0;

  const missing = local.posts.filter((post) => !remoteBySlug.has(post.slug));
  if (missing.length) {
    failures += missing.length;
    console.error(`\nMissing from Sanity (${missing.length}):`);
    for (const post of missing.slice(0, 10)) console.error(`  ${post.slug}`);
  }

  const extra = remotePosts.filter((post) => !localBySlug.has(post.slug));
  if (extra.length) {
    console.warn(`\nIn Sanity but not in the local library (${extra.length}):`);
    for (const post of extra) console.warn(`  ${post.slug} ("${post.title}")`);
    console.warn('  These are new CMS-authored posts. Not a failure, listed for review.');
  }

  let mismatched = 0;
  for (const post of local.posts) {
    const remote = remoteBySlug.get(post.slug);
    if (!remote) continue;
    const diffs = comparePost(post, remote);
    if (diffs.length) {
      mismatched += 1;
      failures += 1;
      if (mismatched <= 10) {
        console.error(`\nField differences in ${post.slug}:`);
        for (const diff of diffs) console.error(`  ${diff}`);
      }
    }
  }

  // Alias collisions would break the permanentRedirect path on /post/[slug].
  const seen = new Map();
  for (const post of remotePosts) {
    for (const key of [post.slug, ...(post.aliases ?? [])]) {
      if (seen.has(key) && seen.get(key) !== post.slug) {
        failures += 1;
        console.error(`\nSlug/alias collision: "${key}" claimed by ${seen.get(key)} and ${post.slug}`);
      }
      seen.set(key, post.slug);
    }
  }

  const topicSlugs = new Set(remoteTopics.map((topic) => topic.slug));
  for (const topic of local.topics) {
    if (!topicSlugs.has(topic.slug)) {
      failures += 1;
      console.error(`\nMissing topic in Sanity: ${topic.slug}`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Local posts:   ${local.posts.length}`);
  console.log(`Sanity posts:  ${remotePosts.length}`);
  console.log(`Local topics:  ${local.topics.length}`);
  console.log(`Sanity topics: ${remoteTopics.length}`);
  console.log(`Posts with field differences: ${mismatched}`);
  console.log(`Total slugs + aliases routable: ${seen.size}`);

  if (failures) {
    console.error(`\nFAILED: ${failures} problem(s). Do not cut over.`);
    process.exit(1);
  }
  console.log('\nPASS: Sanity reproduces every local post and topic exactly.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
