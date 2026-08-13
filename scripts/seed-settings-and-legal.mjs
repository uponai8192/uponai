#!/usr/bin/env node
// Seeds the siteSettings singleton and the two legal pages into Sanity.
//
// Site settings come from the menu exports in src/lib/uponai-pages.ts.
//
// Legal copy is NOT retyped: the script fetches the existing hand-written
// pages from a running dev server and converts their rendered HTML into
// Portable Text, so the CMS starts as a faithful copy of what is live today.
//
// Usage:
//   node scripts/seed-settings-and-legal.mjs                    # dry run
//   node scripts/seed-settings-and-legal.mjs --apply            # write
//   node scripts/seed-settings-and-legal.mjs --apply --base http://localhost:3005

import Module from 'node:module';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const apply = process.argv.includes('--apply');
const baseIndex = process.argv.indexOf('--base');
const BASE = baseIndex > -1 ? process.argv[baseIndex + 1] : 'http://localhost:3005';

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

function loadMenus() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-settings-'));
  let restore = () => {};
  try {
    const cfg = path.join(tmp, 'tsconfig.json');
    writeFileSync(
      cfg,
      JSON.stringify({
        compilerOptions: {
          outDir: tmp,
          module: 'commonjs',
          target: 'es2021',
          lib: ['es2021'],
          typeRoots: [path.join(repoRoot, 'node_modules/@types').replace(/\\/g, '/')],
          types: ['node'],
          moduleResolution: 'node',
          resolveJsonModule: true,
          esModuleInterop: true,
          skipLibCheck: true,
          baseUrl: repoRoot,
          paths: { '@/*': ['src/*'] },
        },
        include: [path.join(repoRoot, 'src/lib/uponai-pages.ts').replace(/\\/g, '/')],
      })
    );
    try {
      execSync(`npx tsc -p "${cfg}"`, { cwd: repoRoot, stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Compile failed:\n${error.stdout?.toString() ?? error.message}`);
    }
    const find = (dir, name) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          const hit = find(full, name);
          if (hit) return hit;
        } else if (e.name === name) return full;
      }
      return null;
    };
    const entry = find(tmp, 'uponai-pages.js');
    const outRoot = path.dirname(entry);
    const original = Module._resolveFilename;
    Module._resolveFilename = function (request, ...rest) {
      if (request.startsWith('@/')) {
        return original.call(this, path.join(outRoot, request.slice(2).replace(/^lib\//, '')), ...rest);
      }
      return original.call(this, request, ...rest);
    };
    restore = () => {
      Module._resolveFilename = original;
    };
    return createRequire(import.meta.url)(entry);
  } finally {
    restore();
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ── HTML to Portable Text ──────────────────────────────────────────────────
const decode = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

let keySeed = 0;
const nextKey = () => `k${(keySeed += 1).toString(36)}`;

// Splits inline HTML into spans, preserving <strong>/<em> and <a href>.
function toSpans(inner) {
  const spans = [];
  const markDefs = [];
  const re = /<(strong|b|em|i|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let last = 0;
  let match;
  const pushText = (text, marks = []) => {
    const clean = decode(text);
    if (clean) spans.push({ _key: nextKey(), _type: 'span', text: clean, marks });
  };
  while ((match = re.exec(inner))) {
    pushText(inner.slice(last, match.index));
    const [, tag, attrs, content] = match;
    if (/^a$/i.test(tag)) {
      const href = attrs.match(/href="([^"]*)"/)?.[1];
      if (href) {
        const key = nextKey();
        markDefs.push({ _key: key, _type: 'link', href });
        pushText(content, [key]);
      } else {
        pushText(content);
      }
    } else {
      pushText(content, [/^(strong|b)$/i.test(tag) ? 'strong' : 'em']);
    }
    last = re.lastIndex;
  }
  pushText(inner.slice(last));
  return { spans, markDefs };
}

function htmlToBlocks(html) {
  const blocks = [];
  const re = /<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = re.exec(html))) {
    const [, tag, inner] = match;
    const { spans, markDefs } = toSpans(inner);
    if (!spans.length) continue;
    blocks.push({
      _key: nextKey(),
      _type: 'block',
      style: 'normal',
      ...(tag.toLowerCase() === 'li' ? { listItem: 'bullet', level: 1 } : {}),
      children: spans,
      ...(markDefs.length ? { markDefs } : {}),
    });
  }
  return blocks;
}

// Both legal pages render each clause as a <section> containing an <h2>.
// Terms already carries anchor ids; privacy does not, so an id is derived from
// the heading there. Sections without an <h2> are page furniture and skipped.
const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^[0-9]+-/, '');

function parseLegalPage(html) {
  const sections = [];
  const re = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = re.exec(html))) {
    const [, attrs, inner] = match;
    const titleMatch = inner.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
    if (!titleMatch) continue;
    const title = decode(titleMatch[1]);
    const body = htmlToBlocks(inner.replace(titleMatch[0], ''));
    if (!body.length) continue;
    const id = attrs.match(/\bid="([^"]+)"/)?.[1] ?? slugify(title);
    sections.push({ _key: nextKey(), id, title, body });
  }
  return sections;
}

async function fetchPage(pathname) {
  const res = await fetch(`${BASE}${pathname}`);
  if (!res.ok) throw new Error(`Could not fetch ${BASE}${pathname}: ${res.status}. Is the dev server running?`);
  return res.text();
}

async function mutate(mutations) {
  const res = await fetch(`${API}/data/mutate/${dataset}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Mutation failed: ${res.status} ${JSON.stringify(body)}`);
  return body;
}

const keyed = (items) => items.map((item) => ({ _key: nextKey(), ...item }));

async function main() {
  const menus = loadMenus();
  const settingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    servicesMenu: keyed(menus.uponaiServicesMenu),
    industriesMenu: keyed(menus.uponaiIndustriesMenu),
    useCasesMenu: keyed(menus.uponaiUseCasesMenu),
    resourcesMenu: keyed(menus.uponaiResourcesMenu),
    footerInfo: keyed(menus.uponaiFooterInfo),
    officeLocations: menus.uponaiOfficeLocations,
  };

  const legalTargets = [
    { slug: 'privacy-policy', title: 'Privacy Policy' },
    { slug: 'terms-of-services', title: 'Terms of Service' },
  ];

  const legalDocs = [];
  for (const target of legalTargets) {
    const html = await fetchPage(`/${target.slug}`);
    const sections = parseLegalPage(html);
    if (!sections.length) throw new Error(`No sections parsed from /${target.slug}`);
    const description =
      html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
    legalDocs.push({
      _id: `legalPage-${target.slug}`,
      _type: 'legalPage',
      slug: { _type: 'slug', current: target.slug },
      title: target.title,
      description: decode(description),
      sections,
    });
  }

  console.log(`Site settings menus: ${Object.keys(settingsDoc).length - 2} lists`);
  for (const [key, value] of Object.entries(settingsDoc)) {
    if (Array.isArray(value)) console.log(`  ${key}: ${value.length}`);
  }
  console.log('\nLegal pages:');
  for (const doc of legalDocs) {
    const blocks = doc.sections.reduce((sum, s) => sum + s.body.length, 0);
    const links = doc.sections.reduce(
      (sum, s) => sum + s.body.reduce((n, b) => n + (b.markDefs?.length ?? 0), 0),
      0
    );
    console.log(`  ${doc.slug.current}: ${doc.sections.length} sections, ${blocks} blocks, ${links} links`);
    console.log(`    sections: ${doc.sections.map((s) => s.id).join(', ')}`);
  }

  if (!apply) {
    console.log('\nDry run. Sample legal section:');
    console.log(JSON.stringify(legalDocs[0].sections[0], null, 2).slice(0, 700));
    console.log('\nRe-run with --apply to seed.');
    return;
  }

  await mutate([
    { createOrReplace: settingsDoc },
    ...legalDocs.map((doc) => ({ createOrReplace: doc })),
  ]);
  console.log('\nSeeded siteSettings and 2 legal pages.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
