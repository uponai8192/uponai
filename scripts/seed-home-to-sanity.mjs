#!/usr/bin/env node
// Seed the homePage singleton in Sanity from the in-repo homepage copy
// (src/lib/home-content.ts). Idempotent: createOrReplace on a fixed _id.
//
// Usage:
//   node scripts/seed-home-to-sanity.mjs           # dry run
//   node scripts/seed-home-to-sanity.mjs --apply   # write the document

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const apply = process.argv.includes('--apply');

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

// Sanity requires a _key on every item in an array of objects.
const keyed = (items) =>
  items.map((item) => ({
    _key: createHash('sha1').update(JSON.stringify(item)).digest('hex').slice(0, 8),
    ...item,
  }));

async function main() {
  const content = loadHomeContent();
  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: content.hero,
    socialProof: content.socialProof,
    oldWay: {
      ...content.oldWay,
      systems: keyed(content.oldWay.systems),
      problems: keyed(content.oldWay.problems),
    },
    intro: { ...content.intro, stats: keyed(content.intro.stats) },
    capabilities: { ...content.capabilities, items: keyed(content.capabilities.items) },
    allFeatures: { ...content.allFeatures, columns: keyed(content.allFeatures.columns) },
    howItWorks: { ...content.howItWorks, steps: keyed(content.howItWorks.steps) },
    customerStories: { ...content.customerStories, stories: keyed(content.customerStories.stories) },
    finalCta: content.finalCta,
  };

  if (!apply) {
    console.log('Dry run. Document to write:');
    console.log(JSON.stringify(doc, null, 2).slice(0, 1200));
    console.log('\nRe-run with --apply to seed.');
    return;
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Seed failed: ${response.status} ${JSON.stringify(body)}`);
  }
  console.log(`Seeded homePage document (transaction ${body.transactionId}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
