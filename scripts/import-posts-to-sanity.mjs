#!/usr/bin/env node
// One-off import of the local blog library into Sanity (Phase 1 of
// docs/cms-migration-spike.md). Reads the merged post list (220 imported +
// 9 manual) and the 4 topics from src/lib/blog-posts.ts and writes them to
// the Content Lake with deterministic ids, so re-running patches instead of
// duplicating.
//
// Usage:
//   node scripts/import-posts-to-sanity.mjs           # dry run, prints plan
//   node scripts/import-posts-to-sanity.mjs --apply   # actually import
//
// Requires SANITY_PROJECT_ID, SANITY_DATASET and an Editor-role
// SANITY_API_TOKEN in .env.local. Run locally only, never on the server.

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cpSync, mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const apply = process.argv.includes('--apply');

// ── Env ────────────────────────────────────────────────────────────────────
const envFile = readFileSync(path.join(repoRoot, '.env.local'), 'utf8');
const env = (key) => envFile.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();
const projectId = env('SANITY_PROJECT_ID');
const dataset = env('SANITY_DATASET');
const token = env('SANITY_API_TOKEN');
if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_PROJECT_ID, SANITY_DATASET or SANITY_API_TOKEN in .env.local');
  process.exit(1);
}
const apiVersion = 'v2025-02-19';
const mutateUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`;
const queryUrl = (q) =>
  `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(q)}`;

// ── Load the content by compiling blog-posts.ts to CommonJS ────────────────
function loadBlogModule() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-import-'));
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

const sha1 = (value) => createHash('sha1').update(value).digest('hex');

// ── Build documents ────────────────────────────────────────────────────────
function topicDoc(topic) {
  return {
    _id: `blogTopic-${topic.slug}`,
    _type: 'blogTopic',
    title: topic.title,
    slug: { _type: 'slug', current: topic.slug },
    description: topic.description,
  };
}

function postDoc(post) {
  const doc = {
    _id: `post-${sha1(post.slug).slice(0, 16)}`,
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    excerpt: post.excerpt,
    author: post.author,
    category: post.category,
    publishedAt: post.publishedAt,
    imageUrl: post.imageUrl,
    readTimeMinutes: post.readTimeMinutes,
    body: post.body,
    topicSlugs: post.topicSlugs,
    relatedPages: post.relatedPages.map((page) => ({
      _key: sha1(`${page.label}|${page.path}`).slice(0, 8),
      _type: 'relatedPage',
      label: page.label,
      path: page.path,
    })),
  };
  if (post.htmlBody) doc.htmlBody = post.htmlBody;
  if (post.tags?.length) doc.tags = post.tags;
  if (post.aliases?.length) doc.aliases = post.aliases;
  return doc;
}

// ── Import ─────────────────────────────────────────────────────────────────
async function mutateBatch(docs) {
  const response = await fetch(mutateUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ mutations: docs.map((doc) => ({ createOrReplace: doc })) }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Mutation batch failed: ${response.status} ${JSON.stringify(body)}`);
  }
  return body;
}

async function main() {
  const { posts, topics } = loadBlogModule();
  const docs = [...topics.map(topicDoc), ...posts.map(postDoc)];

  const slugs = new Set();
  const duplicates = [];
  for (const post of posts) {
    if (slugs.has(post.slug)) duplicates.push(post.slug);
    slugs.add(post.slug);
  }

  console.log(`Posts: ${posts.length}, topics: ${topics.length}, documents to write: ${docs.length}`);
  console.log(`Posts with htmlBody: ${posts.filter((p) => p.htmlBody).length}`);
  console.log(`Posts with aliases: ${posts.filter((p) => p.aliases?.length).length}`);
  if (duplicates.length) {
    console.error(`Duplicate slugs, aborting: ${duplicates.join(', ')}`);
    process.exit(1);
  }

  if (!apply) {
    console.log('\nDry run. Sample document:');
    console.log(JSON.stringify(docs.find((d) => d._type === 'post'), null, 2).slice(0, 800));
    console.log('\nRe-run with --apply to import.');
    return;
  }

  const batchSize = 25;
  for (let index = 0; index < docs.length; index += batchSize) {
    const batch = docs.slice(index, index + batchSize);
    await mutateBatch(batch);
    console.log(`Imported ${Math.min(index + batchSize, docs.length)}/${docs.length}`);
  }

  const counts = await fetch(
    queryUrl('{"posts": count(*[_type == "post"]), "topics": count(*[_type == "blogTopic"])}')
  ).then((r) => r.json());
  console.log(`\nDataset now has: ${JSON.stringify(counts.result)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
