#!/usr/bin/env node
// One-off import of the 11 industry landing pages and their per-city copy
// overrides into Sanity (Phase 2 of docs/cms-migration-spike.md).
//
// Usage:
//   node scripts/import-verticals-to-sanity.mjs           # dry run
//   node scripts/import-verticals-to-sanity.mjs --apply   # import
//
// Idempotent: deterministic document ids mean re-running patches rather than
// duplicating. Run locally only, never on the server.

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import Module from 'node:module';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
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
const API = `https://${projectId}.api.sanity.io/v2025-02-19`;

// voice-ai-industries.ts imports from data.ts, brand-photos.ts and
// uponai-pages.ts, so the whole graph is compiled into a temp dir and required
// from there. That keeps the in-repo file the single source of truth rather
// than re-parsing it.
function loadModules() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-verticals-'));
  let restoreResolve = () => {};
  try {
    // A generated tsconfig rather than CLI flags: the path mapping for "@/*"
    // does not survive shell quoting reliably on Windows.
    const configPath = path.join(tmp, 'tsconfig.import.json');
    writeFileSync(
      configPath,
      JSON.stringify({
        compilerOptions: {
          outDir: tmp,
          module: 'commonjs',
          // es2021 for String.replaceAll, which the template formatter uses,
          // and the node types for the process.env read in data.ts.
          target: 'es2021',
          lib: ['es2021'],
          // The config lives in a temp dir outside the repo, so the type roots
          // have to be pointed back at the project's node_modules.
          typeRoots: [path.join(repoRoot, 'node_modules/@types').replace(/\\/g, '/')],
          types: ['node'],
          moduleResolution: 'node',
          resolveJsonModule: true,
          esModuleInterop: true,
          skipLibCheck: true,
          baseUrl: repoRoot,
          paths: { '@/*': ['src/*'] },
        },
        include: [path.join(repoRoot, 'src/lib/voice-ai-industries.ts').replace(/\\/g, '/')],
      })
    );
    try {
      execSync(`npx tsc -p "${configPath}"`, { cwd: repoRoot, stdio: 'pipe' });
    } catch (error) {
      // tsc reports on stdout, which execSync hides unless it is surfaced.
      throw new Error(`Compiling the content modules failed:\n${error.stdout?.toString() ?? error.message}`);
    }
    // tsc picks its own rootDir from the inputs, so the emitted tree depth
    // varies. Locate the entry point rather than assuming where it landed.
    const find = (dir, name) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const hit = find(full, name);
          if (hit) return hit;
        } else if (entry.name === name) {
          return full;
        }
      }
      return null;
    };
    const entry = find(tmp, 'voice-ai-industries.js');
    if (!entry) throw new Error(`Compiled output not found under ${tmp}`);

    // tsc type-checks the "@/..." alias but emits it verbatim, so require has
    // to be taught to resolve it against the compiled output.
    const outRoot = path.dirname(entry);
    const originalResolve = Module._resolveFilename;
    Module._resolveFilename = function resolveWithAlias(request, ...rest) {
      if (request.startsWith('@/')) {
        const withoutPrefix = request.slice(2).replace(/^lib\//, '');
        return originalResolve.call(this, path.join(outRoot, withoutPrefix), ...rest);
      }
      return originalResolve.call(this, request, ...rest);
    };
    restoreResolve = () => {
      Module._resolveFilename = originalResolve;
    };

    const require = createRequire(import.meta.url);
    return {
      verticals: require(entry),
      data: require(path.join(path.dirname(entry), 'data.js')),
    };
  } finally {
    // The modules are fully required by now, so the alias hook and the temp
    // output can both go.
    restoreResolve();
    rmSync(tmp, { recursive: true, force: true });
  }
}

const key = (value) => createHash('sha1').update(value).digest('hex').slice(0, 12);
const keyed = (items, prefix) =>
  (items ?? []).map((item, index) => ({
    _key: `${prefix}${index}`,
    ...item,
  }));

const verticalId = (slug) => `vertical-${slug}`;
const overrideId = (pageSlug, citySlug) => `verticalCityOverride-${key(`${pageSlug}/${citySlug}`)}`;

function verticalDoc(page) {
  const doc = {
    _id: verticalId(page.slug),
    _type: 'vertical',
    slug: { _type: 'slug', current: page.slug },
    label: page.label,
    eyebrow: page.eyebrow,
    heroTitle: page.heroTitle,
    heroDescription: page.heroDescription,
    stats: keyed(page.stats, 'stat'),
    workflowMoments: keyed(page.workflowMoments, 'wm'),
    capabilityCards: keyed(page.capabilityCards, 'cc'),
    outcomes: page.outcomes ?? [],
    faqs: keyed(page.faqs, 'faq'),
    localUseCaseTemplates: page.localUseCaseTemplates ?? [],
    cityLead: page.cityLead,
    citySupport: page.citySupport,
    ctaHeading: page.ctaHeading,
    ctaSubheading: page.ctaSubheading,
  };
  if (page.integrations) {
    doc.integrations = {
      title: page.integrations.title,
      body: page.integrations.body,
      examples: page.integrations.examples ?? [],
      ...(page.integrations.href ? { href: page.integrations.href } : {}),
      ...(page.integrations.hrefLabel ? { hrefLabel: page.integrations.hrefLabel } : {}),
    };
  }
  return doc;
}

function overrideDoc(pageSlug, citySlug, override) {
  const doc = {
    _id: overrideId(pageSlug, citySlug),
    _type: 'verticalCityOverride',
    vertical: { _type: 'reference', _ref: verticalId(pageSlug) },
    citySlug,
    heroTitle: override.heroTitle,
    heroDescription: override.heroDescription,
    localUseCases: override.localUseCases ?? [],
    customHighlights: keyed(override.customHighlights, 'hl'),
  };
  for (const field of ['marketHeadline', 'marketBody', 'regionTitle', 'regionBody', 'ctaHeading', 'ctaSubheading']) {
    if (override[field]) doc[field] = override[field];
  }
  return doc;
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

async function main() {
  const { verticals, data } = loadModules();
  const pages = verticals.voiceAIIndustryPages;
  const citySlugs = new Set(data.cities.map((city) => city.slug));

  const verticalDocs = pages.map(verticalDoc);

  // The override map is keyed "pageSlug/citySlug" and is not exported, so it is
  // reconstructed by probing the exported accessor across every combination.
  const overrideDocs = [];
  const unknownCities = [];
  for (const page of pages) {
    for (const citySlug of citySlugs) {
      const override = verticals.getVoiceAICityPageOverride(page.slug, citySlug);
      if (override) overrideDocs.push(overrideDoc(page.slug, citySlug, override));
    }
  }

  console.log(`Industry pages: ${verticalDocs.length}`);
  console.log(`City overrides: ${overrideDocs.length}`);
  const withIntegrations = verticalDocs.filter((doc) => doc.integrations).length;
  console.log(`Pages with an integrations block: ${withIntegrations}`);
  const templated = verticalDocs.reduce((sum, doc) => sum + doc.localUseCaseTemplates.length, 0);
  console.log(`Local use case templates across all pages: ${templated}`);
  if (unknownCities.length) {
    console.error(`Overrides referencing unknown cities: ${unknownCities.join(', ')}`);
    process.exit(1);
  }

  if (!apply) {
    console.log('\nDry run. Sample industry page:');
    console.log(JSON.stringify(verticalDocs[0], null, 2).slice(0, 900));
    console.log('\nSample city override:');
    console.log(JSON.stringify(overrideDocs[0], null, 2).slice(0, 600));
    console.log('\nRe-run with --apply to import.');
    return;
  }

  // Verticals first: the override documents reference them.
  await mutate(verticalDocs.map((doc) => ({ createOrReplace: doc })));
  console.log(`Imported ${verticalDocs.length} industry pages`);

  const batchSize = 25;
  for (let index = 0; index < overrideDocs.length; index += batchSize) {
    await mutate(overrideDocs.slice(index, index + batchSize).map((doc) => ({ createOrReplace: doc })));
    console.log(`Imported ${Math.min(index + batchSize, overrideDocs.length)}/${overrideDocs.length} overrides`);
  }

  const counts = await fetch(
    `${API}/data/query/${dataset}?query=${encodeURIComponent(
      '{"verticals": count(*[_type == "vertical"]), "overrides": count(*[_type == "verticalCityOverride"])}'
    )}`
  ).then((res) => res.json());
  console.log(`\nDataset now has: ${JSON.stringify(counts.result)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
