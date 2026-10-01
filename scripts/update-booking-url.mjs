#!/usr/bin/env node
// Rewrites the booking link inside published Sanity documents.
//
// The in-repo fallbacks live in src/lib/booking.ts and src/lib/blog-posts.ts
// and are changed by editing those files; this script covers the copies that
// the CMS serves instead, which otherwise keep pointing at the old page.
//
// It walks every string in each document, so it catches the URL wherever it
// sits: Portable Text marks, CTA fields, menu entries.
//
// Usage:
//   node scripts/update-booking-url.mjs                   # dry run, lists hits
//   node scripts/update-booking-url.mjs --apply           # write
//   node scripts/update-booking-url.mjs --from <old> --to <new>

import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const apply = process.argv.includes('--apply');
const argValue = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const FROM = argValue('--from', 'https://uponai.ai/uponai-booking-page');
const TO = argValue('--to', 'https://uponai.ai/uponai-book-your-democall');

const envFile = readFileSync(path.join(repoRoot, '.env.local'), 'utf8');
const env = (key) => envFile.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();
const projectId = env('SANITY_PROJECT_ID');
const dataset = env('SANITY_DATASET');
const token = env('SANITY_API_TOKEN');
if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_PROJECT_ID, SANITY_DATASET or SANITY_API_TOKEN in .env.local');
  process.exit(1);
}
const API = `https://${projectId}.api.sanity.io/v2025-02-19`;

// Returns a copy with every occurrence replaced, plus how many it changed.
function rewrite(value, counter) {
  if (typeof value === 'string') {
    if (!value.includes(FROM)) return value;
    counter.n += value.split(FROM).length - 1;
    return value.split(FROM).join(TO);
  }
  if (Array.isArray(value)) return value.map((v) => rewrite(v, counter));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v, counter)]));
  }
  return value;
}

const query = encodeURIComponent(`*[!(_id in path("drafts.**"))]`);
const res = await fetch(`${API}/data/query/${dataset}?query=${query}`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!res.ok) {
  console.error(`Query failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const { result: docs } = await res.json();

const patches = [];
for (const doc of docs) {
  const counter = { n: 0 };
  const next = rewrite(doc, counter);
  if (!counter.n) continue;
  patches.push({ doc, next, hits: counter.n });
  console.log(`${doc._type.padEnd(14)} ${doc._id.padEnd(34)} ${counter.n} link(s)  ${doc.title ?? ''}`);
}

if (!patches.length) {
  console.log(`No document contains ${FROM}`);
  process.exit(0);
}
console.log(`\n${patches.length} document(s), ${patches.reduce((a, p) => a + p.hits, 0)} link(s)`);
console.log(`  ${FROM}\n  -> ${TO}`);

if (!apply) {
  console.log('\nDry run. Re-run with --apply to write.');
  process.exit(0);
}

// One transaction: either every document moves to the new link or none does.
const mutations = patches.map(({ doc, next }) => {
  const { _id, _rev, _createdAt, _updatedAt, _type, ...fields } = next;
  void _rev;
  void _createdAt;
  void _updatedAt;
  return { patch: { id: _id, ifRevisionID: doc._rev, set: fields } };
});
const write = await fetch(`${API}/data/mutate/${dataset}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});
if (!write.ok) {
  console.error(`Write failed: ${write.status} ${await write.text()}`);
  process.exit(1);
}
console.log(`\nUpdated ${patches.length} document(s). Publishing a change in the Studio, or the`);
console.log('revalidate webhook, will clear the cached pages.');
