#!/usr/bin/env node
// Cutover gate for the vertical migration (Phase 2 of
// docs/cms-migration-spike.md). Compares every industry page and city override
// in Sanity against the in-repo definitions that render the live site, and
// checks the templated city copy renders identically for a sample of cities.
// Exits non-zero on any difference.
//
// Usage: node scripts/compare-verticals-with-sanity.mjs

import Module from 'node:module';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
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
const API = `https://${projectId}.api.sanity.io/v2025-02-19`;

function loadModules() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'uponai-vcompare-'));
  let restoreResolve = () => {};
  try {
    const configPath = path.join(tmp, 'tsconfig.compare.json');
    writeFileSync(
      configPath,
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
        include: [path.join(repoRoot, 'src/lib/voice-ai-industries.ts').replace(/\\/g, '/')],
      })
    );
    try {
      execSync(`npx tsc -p "${configPath}"`, { cwd: repoRoot, stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Compiling the content modules failed:\n${error.stdout?.toString() ?? error.message}`);
    }

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

    const outRoot = path.dirname(entry);
    const originalResolve = Module._resolveFilename;
    Module._resolveFilename = function resolveWithAlias(request, ...rest) {
      if (request.startsWith('@/')) {
        return originalResolve.call(this, path.join(outRoot, request.slice(2).replace(/^lib\//, '')), ...rest);
      }
      return originalResolve.call(this, request, ...rest);
    };
    restoreResolve = () => {
      Module._resolveFilename = originalResolve;
    };

    const require = createRequire(import.meta.url);
    return { verticals: require(entry), data: require(path.join(outRoot, 'data.js')) };
  } finally {
    restoreResolve();
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function query(groq) {
  const res = await fetch(`${API}/data/query/${dataset}?query=${encodeURIComponent(groq)}`);
  if (!res.ok) throw new Error(`Query failed: ${res.status}`);
  return (await res.json()).result;
}

const SCALARS = [
  'label',
  'eyebrow',
  'heroTitle',
  'heroDescription',
  'cityLead',
  'citySupport',
  'ctaHeading',
  'ctaSubheading',
];

function diffStrings(field, a, b) {
  return (a ?? null) === (b ?? null)
    ? null
    : `${field}: local ${JSON.stringify(String(a).slice(0, 70))} vs sanity ${JSON.stringify(String(b).slice(0, 70))}`;
}

function diffStringArray(field, a = [], b = []) {
  if (a.length !== b.length) return `${field}: local ${a.length} entries vs sanity ${b.length}`;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return `${field}[${i}]: local ${JSON.stringify(a[i].slice(0, 60))} vs sanity ${JSON.stringify(String(b[i]).slice(0, 60))}`;
  }
  return null;
}

function diffObjectArray(field, a = [], b = [], keys) {
  if (a.length !== b.length) return `${field}: local ${a.length} entries vs sanity ${b.length}`;
  for (let i = 0; i < a.length; i += 1) {
    for (const key of keys) {
      if (a[i][key] !== b[i][key]) return `${field}[${i}].${key} differs`;
    }
  }
  return null;
}

function compareVertical(local, remote) {
  const diffs = [];
  for (const field of SCALARS) {
    const diff = diffStrings(field, local[field], remote[field]);
    if (diff) diffs.push(diff);
  }
  diffs.push(diffObjectArray('stats', local.stats, remote.stats, ['value', 'label']));
  diffs.push(diffObjectArray('workflowMoments', local.workflowMoments, remote.workflowMoments, ['title', 'body']));
  diffs.push(diffObjectArray('capabilityCards', local.capabilityCards, remote.capabilityCards, ['title', 'body']));
  diffs.push(diffObjectArray('faqs', local.faqs, remote.faqs, ['question', 'answer']));
  diffs.push(diffStringArray('outcomes', local.outcomes, remote.outcomes));
  diffs.push(diffStringArray('localUseCaseTemplates', local.localUseCaseTemplates, remote.localUseCaseTemplates));

  const localInt = local.integrations;
  const remoteInt = remote.integrations;
  if (Boolean(localInt) !== Boolean(remoteInt)) {
    diffs.push(`integrations: local ${localInt ? 'present' : 'absent'} vs sanity ${remoteInt ? 'present' : 'absent'}`);
  } else if (localInt && remoteInt) {
    for (const field of ['title', 'body', 'href', 'hrefLabel']) {
      const diff = diffStrings(`integrations.${field}`, localInt[field], remoteInt[field]);
      if (diff) diffs.push(diff);
    }
    diffs.push(diffStringArray('integrations.examples', localInt.examples, remoteInt.examples));
  }
  return diffs.filter(Boolean);
}

function compareOverride(local, remote) {
  const diffs = [];
  for (const field of ['heroTitle', 'heroDescription', 'marketHeadline', 'marketBody', 'regionTitle', 'regionBody', 'ctaHeading', 'ctaSubheading']) {
    const diff = diffStrings(field, local[field], remote[field]);
    if (diff) diffs.push(diff);
  }
  diffs.push(diffStringArray('localUseCases', local.localUseCases, remote.localUseCases));
  diffs.push(diffObjectArray('customHighlights', local.customHighlights, remote.customHighlights, ['title', 'body']));
  return diffs.filter(Boolean);
}

async function main() {
  const { verticals, data } = loadModules();
  const localPages = verticals.voiceAIIndustryPages;

  const remotePages = await query(`*[_type == "vertical"]{
    "slug": slug.current, label, eyebrow, heroTitle, heroDescription,
    stats[]{value, label}, workflowMoments[]{title, body}, capabilityCards[]{title, body},
    outcomes, faqs[]{question, answer}, localUseCaseTemplates, cityLead, citySupport,
    ctaHeading, ctaSubheading,
    integrations{title, body, examples, href, hrefLabel}
  }`);
  const remoteOverrides = await query(`*[_type == "verticalCityOverride"]{
    "verticalSlug": vertical->slug.current, citySlug, heroTitle, heroDescription,
    marketHeadline, marketBody, regionTitle, regionBody, localUseCases,
    customHighlights[]{title, body}, ctaHeading, ctaSubheading
  }`);

  let failures = 0;
  const remoteBySlug = new Map(remotePages.map((page) => [page.slug, page]));

  for (const local of localPages) {
    const remote = remoteBySlug.get(local.slug);
    if (!remote) {
      failures += 1;
      console.error(`\nMissing industry page in Sanity: ${local.slug}`);
      continue;
    }
    const diffs = compareVertical(local, remote);
    if (diffs.length) {
      failures += 1;
      console.error(`\nField differences in ${local.slug}:`);
      for (const diff of diffs) console.error(`  ${diff}`);
    }
  }

  // Overrides: rebuilt from the exported accessor, same as the import does.
  const remoteOverrideMap = new Map(
    remoteOverrides.map((entry) => [`${entry.verticalSlug}/${entry.citySlug}`, entry])
  );
  let localOverrideCount = 0;
  for (const page of localPages) {
    for (const city of data.cities) {
      const local = verticals.getVoiceAICityPageOverride(page.slug, city.slug);
      if (!local) continue;
      localOverrideCount += 1;
      const mapKey = `${page.slug}/${city.slug}`;
      const remote = remoteOverrideMap.get(mapKey);
      if (!remote) {
        failures += 1;
        console.error(`\nMissing city override in Sanity: ${mapKey}`);
        continue;
      }
      const diffs = compareOverride(local, remote);
      if (diffs.length) {
        failures += 1;
        console.error(`\nField differences in override ${mapKey}:`);
        for (const diff of diffs) console.error(`  ${diff}`);
      }
    }
  }

  const orphaned = remoteOverrides.filter(
    (entry) => !localPages.some((page) => page.slug === entry.verticalSlug)
  );
  if (orphaned.length) {
    failures += orphaned.length;
    console.error(`\nOverrides pointing at an unknown industry page: ${orphaned.length}`);
  }
  const unknownCity = remoteOverrides.filter(
    (entry) => !data.cities.some((city) => city.slug === entry.citySlug)
  );
  if (unknownCity.length) {
    failures += unknownCity.length;
    console.error(`\nOverrides referencing a city not in data.ts: ${unknownCity.map((o) => o.citySlug).join(', ')}`);
  }

  // Templated city copy is what multiplies across ~305 pages per vertical, so
  // the rendered result is checked, not just the raw template string.
  const sampleCities = data.cities.slice(0, 25);
  let renderedChecked = 0;
  for (const page of localPages) {
    const remote = remoteBySlug.get(page.slug);
    if (!remote) continue;
    for (const city of sampleCities) {
      const localRendered = page.localUseCaseTemplates.map((template) =>
        verticals.formatVoiceAITemplate(template, city)
      );
      const remoteRendered = (remote.localUseCaseTemplates ?? []).map((template) =>
        verticals.formatVoiceAITemplate(template, city)
      );
      renderedChecked += localRendered.length;
      const diff = diffStringArray(`${page.slug}@${city.slug}`, localRendered, remoteRendered);
      if (diff) {
        failures += 1;
        console.error(`\nRendered city copy differs: ${diff}`);
      }
      const leftovers = remoteRendered.filter((line) => /\{[a-z]+\}/i.test(line));
      if (leftovers.length) {
        failures += 1;
        console.error(`\nUnreplaced placeholder on ${page.slug}/${city.slug}: ${leftovers[0]}`);
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Local industry pages:  ${localPages.length}`);
  console.log(`Sanity industry pages: ${remotePages.length}`);
  console.log(`Local city overrides:  ${localOverrideCount}`);
  console.log(`Sanity city overrides: ${remoteOverrides.length}`);
  console.log(`Rendered city sentences checked: ${renderedChecked} (${sampleCities.length} cities x ${localPages.length} pages)`);

  if (failures) {
    console.error(`\nFAILED: ${failures} problem(s). Do not cut over.`);
    process.exit(1);
  }
  console.log('\nPASS: Sanity reproduces every industry page and city override exactly.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
