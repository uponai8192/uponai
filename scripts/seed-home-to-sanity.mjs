#!/usr/bin/env node
// Seed the homePage singleton in Sanity from the in-repo homepage copy
// (src/lib/home-content.ts), on the fixed _id "homePage".
//
// Usage:
//   node scripts/seed-home-to-sanity.mjs                                   # dry run
//   node scripts/seed-home-to-sanity.mjs --section=customerStories --apply # patch one section
//   node scripts/seed-home-to-sanity.mjs --all --apply                     # replace the whole document
//
// A full replace overwrites every section with the repo defaults, including
// copy edited in the Studio since, so it needs the explicit --all flag.
// The token needs update permission on the dataset.

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const apply = process.argv.includes('--apply');
const sectionArg = process.argv.find((arg) => arg.startsWith('--section'));
const section = sectionArg?.startsWith('--section=') ? sectionArg.slice('--section='.length) : undefined;
const replaceAll = process.argv.includes('--all');
// A mistyped flag must never fall through to replacing the whole document.
if (sectionArg !== undefined && !section) {
  console.error('Use --section=<name>, e.g. --section=customerStories');
  process.exit(1);
}
if (apply && !section && !replaceAll) {
  console.error('Refusing to replace the whole document. Pass --section=<name>, or --all to replace everything.');
  process.exit(1);
}

const envFile = readFileSync(path.join(repoRoot, '.env.local'), 'utf8');
const env = (key) => envFile.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();
const projectId = env('SANITY_PROJECT_ID');
const dataset = env('SANITY_DATASET');
const token = env('SANITY_API_TOKEN');
if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_PROJECT_ID, SANITY_DATASET or SANITY_API_TOKEN in .env.local');
  process.exit(1);
}

function loadHomeContent() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-home-'));
  try {
    execSync(
      'npx tsc src/lib/home-content.ts' +
        ` --outDir "${tmp}" --module commonjs --target es2020 --esModuleInterop --skipLibCheck`,
      { cwd: repoRoot, stdio: 'pipe' }
    );
    const require = createRequire(import.meta.url);
    return require(path.join(tmp, 'home-content.js')).defaultHomePageContent;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// Sanity requires a _key on every item in an array of objects. The position is
// part of the hash so two identical items still get distinct keys.
const keyed = (items) =>
  items.map((item, index) => ({
    _key: createHash('sha1').update(`${index}:${JSON.stringify(item)}`).digest('hex').slice(0, 8),
    ...item,
  }));

async function main() {
  const content = loadHomeContent();
  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: content.hero,
    socialProof: content.socialProof,
    solutions: { ...content.solutions, items: keyed(content.solutions.items) },
    intro: { ...content.intro, stats: keyed(content.intro.stats) },
    capabilities: { ...content.capabilities, items: keyed(content.capabilities.items) },
    howItWorks: { ...content.howItWorks, steps: keyed(content.howItWorks.steps) },
    customerStories: {
      ...content.customerStories,
      stories: keyed(
        content.customerStories.stories.map((story) =>
          story.transcript ? { ...story, transcript: keyed(story.transcript) } : story
        )
      ),
    },
    faq: { ...content.faq, items: keyed(content.faq.items) },
    finalCta: content.finalCta,
  };

  // --section=<name> patches that one section and leaves the rest of the live
  // document, including copy edited in the Studio, untouched.
  let mutation = { createOrReplace: doc };
  if (section) {
    if (!(section in doc) || section.startsWith('_')) {
      throw new Error(`Unknown section "${section}". Options: ${Object.keys(doc).filter((k) => !k.startsWith('_')).join(', ')}`);
    }
    mutation = { patch: { id: doc._id, set: { [section]: doc[section] } } };
  }

  if (!apply) {
    console.log(section ? `Dry run. Section "${section}" to set:` : 'Dry run. Whole document to replace:');
    console.log(JSON.stringify(section ? doc[section] : doc, null, 2).slice(0, 1600));
    console.log('\nRe-run with --apply to write.');
    return;
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ mutations: [mutation] }),
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Seed failed: ${response.status} ${JSON.stringify(body)}`);
  }
  console.log(
    `${section ? `Patched homePage.${section}` : 'Replaced homePage document'} (transaction ${body.transactionId}).`
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
