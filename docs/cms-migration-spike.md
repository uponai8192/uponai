# CMS migration spike: moving UponAI site content into Sanity

Status: research spike with a narrow proof of concept. Nothing in this
document changes production behaviour. The PoC lives under `/cms-poc` and
`src/lib/cms-poc/`, is dev-only by default, and touches no existing route.

## 0. What we are actually migrating

Grounded inventory, counted from the repo on this branch:

| Source | Entities | Shape |
|---|---|---|
| `src/lib/imported-blog-posts.json` | 220 posts | Already CMS-shaped JSON: title, slug, body[], htmlBody, excerpt, author, category, tags, topicSlugs, publishedAt, readTimeMinutes, imageUrl, relatedPages, aliases |
| `src/lib/blog-posts.ts` | 9 manual posts + 4 topics | Same shape as imported posts, plus topic definitions |
| `src/lib/voice-ai-industries.ts` (4,479 lines) | 11 vertical landing pages | heroTitle, heroDescription, stats, workflowMoments, capabilityCards, outcomes, faqs, localUseCaseTemplates, cityLead, citySupport, cta, integrations. Also ~30 per-city page overrides and city narrative template pools |
| `src/lib/uponai-pages.ts` (1,376 lines) | 52 landing pages + 5 menus | title, description, eyebrow, highlights, sections, featureCards, faqs, image, cta, alias/redirect fields |
| `src/lib/data.ts` (842 lines) | 22 industries, 9 services, 305 cities | Typed arrays. Cities are data, not content (see scope boundary) |
| `src/lib/site-content.ts` (300 lines) | 9 service content overrides | Derivation helpers that combine service/industry/city data |
| `src/components/home/*.tsx` (~950 lines) | ~10 homepage sections | Copy in const arrays at the top of each component; lifts out cleanly |

Roughly 85% of site copy is already structured, typed data. This is the
best possible starting position for a headless CMS migration: the schema
design is mostly transcription, not invention.

**Scope boundary: cities are not content.** The 305 cities in `data.ts`
stay a code-side array. City pages are one template multiplied across
cities (programmatic SEO). Editors manage the roughly 40 real entities
(11 verticals, 22 industries, 9 services, blog) and the templates those
city pages are stamped from. A CMS holding 13,465 documents would be slow
to query, miserable to edit, and would blow through document quotas for
zero editorial value.

## 1. Recommendation: Sanity

Sanity is the right choice for this site, and the deployment reality is
what decides it, not the editing UI.

### Why the deployment model decides this

The site self-hosts in Docker behind Nginx Proxy Manager on an EC2 box
with 7.6GB RAM, no swap, and about 21GB free disk (`docs/staging-server.md`).
Deploys are manual: `git pull`, `docker compose up -d --build`. There is
no Vercel-style auto-deploy on push. That kills or favours each candidate:

**Keystatic (git-backed, no database)** stores content as files in the
repo. On Vercel, an editor's save becomes a commit which becomes an
auto-deploy, so editing feels live. On this infrastructure a commit does
nothing until someone SSHes in and runs the deploy. Goal #1 is "sales and
ops edit copy without a developer or a deploy", and git-backed content
structurally cannot deliver that here without building our own
webhook-triggered pull-and-rebuild pipeline on a box that cannot afford
full rebuilds. Keystatic's runtime reader API does not help either: the
running container has a baked-in checkout, so new commits are invisible
to it until redeploy. Keystatic is the right answer for a different
hosting setup, not this one.

**Payload 3 (self-hosted, Next-native)** embeds the CMS into the Next app
itself. Two problems on this box. First, it requires a real database
(Postgres or MongoDB) which we would have to run and back up on the same
7.6GB machine. Second, Payload's own deployment guidance recommends
`NODE_OPTIONS="--max-old-space-size=4096"` for builds because
Payload + Next builds are memory-heavy. Our constraint is precisely that
builds barely fit in memory today. Payload moves the CMS workload onto
the machine we are trying to relieve, and makes the build heavier, not
lighter. It also puts the admin UI inside the same container as the
public site, so a CMS bug or upgrade risks the site itself.

**Sanity (hosted content lake, hosted or separately-deployed Studio)**
puts zero new load on the server. The content API is a hosted service
with a CDN; the editing UI (Sanity Studio) can be hosted free on
`*.sanity.studio` via `sanity deploy`, completely outside this repo's
build. The Next app consumes content over HTTPS at request time and gets
told about publishes via a webhook. Nothing new runs on the EC2 box, no
database to operate, and the site build gets smaller because content
leaves the bundle.

### Cost check

Sanity's free plan (verified at sanity.io/pricing, August 2026): up to 20
user seats, 2 datasets, 10,000 documents, 100GB assets and bandwidth, 1M
API CDN requests/month, 250k uncached API requests/month, 2 GROQ webhooks.

Our full migration lands around 300 to 350 documents (229 posts, 11
verticals, 52 pages, 22 industries, 9 services, ~10 homepage sections,
~30 city overrides, a handful of settings/menu singletons). That is 3.5%
of the free document quota. Because rendered pages are cached by Next and
only re-fetch on revalidation, API request volume stays far below the
caps even with the 13k city URLs being crawled: city pages share one
cached template document per vertical rather than one fetch per URL.

Free plan is realistically permanent for this content volume. The paid
trigger points are: needing private datasets, needing content-level
roles beyond admin/editor, or wanting Sanity's comments/tasks workflow.
That is Growth at $15/seat/month, and only editor seats would need it.
**Decision needed from Melvin before Phase 1: creating the Sanity project
(free tier, $0) is still a new external service and a new vendor
dependency, so sign off on that explicitly.**

### Honest costs of choosing Sanity

- Vendor dependency: if Sanity has an outage, published pages keep
  serving from Next's cache (ISR serves stale on fetch failure), but
  revalidation and editing stall. Acceptable for marketing content.
- GROQ and Studio schema are Sanity-specific skills. Mitigated by keeping
  the site-side types identical to today's TypeScript types, so the
  coupling is confined to the fetch layer and one schema package.
- Content leaves the repo. Mitigate with a scheduled `sanity dataset
  export` snapshot committed to a backup location (exports are free and
  scriptable), so we can always reconstruct or walk away.

## 2. Proposed schema

One Sanity project, one `production` dataset. Document types map onto the
existing TypeScript types nearly one-to-one. Field types stay primitive
(strings, arrays of objects) instead of Portable Text wherever the
current site renders plain strings, which keeps rendering code unchanged.

| Document type | Count | Maps from | Notes |
|---|---|---|---|
| `post` | 229 | imported-blog-posts.json + manual posts in blog-posts.ts | `body` as array of paragraph strings exactly as today; `htmlBody` kept as an escape-hatch text field for the 220 legacy posts; new posts author `body` only. `aliases` as string array powers the existing alias redirect. `relatedPages` as array of {label, path} |
| `blogTopic` | 4 | uponaiBlogTopics | slug, title, description |
| `vertical` | 11 | voiceAIIndustryPages | All fields of `VoiceAIIndustryPage`: hero, stats[], workflowMoments[], capabilityCards[], outcomes[], faqs[], localUseCaseTemplates[], cityLead, citySupport, cta, integrations. Template strings keep their `{city}` placeholders; editors see help text explaining them |
| `verticalCityOverride` | ~30 | voiceAICityPageOverrides | Reference to `vertical` + city slug string + the override fields. City slug validated against the code-side city list at import time, not a CMS relation |
| `cityNarrativePool` | 2 singletons | market/region narrative template pools in voice-ai-industries.ts | The rotating template arrays used by `getCityMarketNarrative` / `getCityRegionNarrative` |
| `landingPage` | 52 | uponaiPages | Full `UponAIPage` shape including aliasTo/externalRedirectTo |
| `industry` | 22 | data.ts industries | Full `Industry` shape; icon and color stay constrained string fields |
| `service` | 9 | data.ts services + site-content.ts overrides | Merge the `serviceOverrides` from site-content.ts into the service document as an optional field group, retiring the override indirection |
| `homeSection` | ~10 | src/components/home/*.tsx const arrays | One document per section (hero, intro, capabilities, stories, CTA...), each with its own typed fields. Not a generic page-builder: the homepage layout stays in code, only copy moves |
| `siteSettings` | 1 singleton | uponai-pages.ts menus, office locations, footer | Nav menus as arrays of {label, href, external} |

Not modelled, stays in code: `cities` (305), `staticParamCities` logic,
`promotedVoiceAICityRoutes`, brand photo manifest, booking URL logic,
SEO helpers. Total document count ~370.

Images: post `imageUrl` and page `image` become Sanity image assets where
we migrate the binary (see risks), with a plain-URL fallback field for
assets we leave on the current CDN during transition.

## 3. Rendering strategy

### Today

Every content route is fully static at build time. `generateStaticParams`
enumerates everything: 305 cities x (11 vertical routes + 22 industry
city routes + 9 service city routes + location route) plus statics =
13,465 pages. The whole content corpus compiles into the bundle. Editing
one word requires a full rebuild that no longer fits on the deployment
server, which is why staging exists on a 6-city sample (~609 pages).

### Target: on-demand ISR with tag-based revalidation

All CMS-backed routes switch to cache-on-first-request:

- Fetches to Sanity go through one helper that attaches Next cache tags
  by document type (and slug for detail pages):
  `{ cache: 'force-cache', next: { tags: ['post', 'post:my-slug'] } }`,
  with `revalidate: false`. Pages are cached indefinitely until a
  publish invalidates them. No time-based revalidation, so crawl traffic
  over 13k city URLs does not generate background refetch load.
- `generateStaticParams` shrinks to a curated head: the ~60 promoted
  city routes in `promotedVoiceAICityRoutes`, top-level verticals,
  services, industries, landing pages, and the newest ~20 posts.
  Everything else renders on first request and is then cached on disk by
  the running server. `dynamicParams` stays default (true), which is the
  same property that already lets staging serve unlisted cities.
- Build page count drops from 13,465 to roughly 150 to 200. The build
  stops needing the content corpus in memory at all, which retires the
  "cannot build on the server" problem outright rather than working
  around it. Staging and production converge on the same build shape.

### Revalidation on publish

Sanity GROQ webhook (2 included on free plan) fires on create, update,
delete, and publish. It POSTs `{_type, slug}` to
`https://uponai.com/api/revalidate` with an HMAC signature. The route
handler verifies the signature and calls `revalidateTag` for the type
tag and the slug tag, plus dependent tags: publishing a `post` also
revalidates the blog index and topic tags; publishing a `vertical`
revalidates that vertical's tag, which covers all 305 of its city pages
in one call because they all read the same tagged fetch. Editor clicks
Publish, affected pages regenerate on next request, typically live in
seconds. No rebuild, no deploy, no SSH.

This is Vercel-free: it is stock Next `revalidateTag` against the
filesystem-backed incremental cache that `next start` already uses in
the Docker container. The only infrastructure requirement is that the
webhook can reach the site over HTTPS, which it can, since it is just a
public POST route through Nginx Proxy Manager. One caveat: the cache
lives inside the container, so a container restart or redeploy starts
cold and pages re-render on first hit, which is acceptable (first hit
per page does one CDN-cached Sanity fetch).

The PoC in this repo proves the loop end to end with the real route
handler and tag wiring (see `docs` section of the PoC below).

### Sitemaps

`src/lib/sitemap.ts` currently imports the content arrays at build time.
The sitemap routes become dynamic route handlers that fetch slugs from
Sanity with the same tags, so a published post appears in
`/sitemaps/core.xml` after the same revalidation event. City sitemap
sections keep enumerating from the code-side city array, unchanged.

## 4. Migration path

Principle: strangler pattern. The CMS fetch layer returns the exact
existing TypeScript types (`UponAIBlogPost`, `VoiceAIIndustryPage`,
`UponAIPage`, `Industry`, `Service`), so components do not change. Each
phase swaps one data source behind its existing interface, ships, and
bakes before the next starts.

### One-off import script for the 220 posts (Phase 1)

A Node script (`scripts/import-posts-to-sanity.mts`, run locally, never
on the server) that:

1. Reads `imported-blog-posts.json` plus the 9 manual posts.
2. Normalises: decode the mojibake Windows-1252 artifacts present in the
   JSON (curly quotes and ellipses currently render as `�` in some
   fields), trim the machine-generated `new-blog-post-2790-...` slugs
   into their alias arrays untouched (slugs must not change, see risks).
3. Uploads each `imageUrl` binary to Sanity assets (with retry and a
   dry-run mode); on failure, falls back to storing the external URL in
   the fallback field so the import never blocks on a dead image.
4. Writes documents with `_id: post-<slug-hash>` so the script is
   idempotent: re-running patches instead of duplicating.
5. Emits a diff report: document count, field-level changes, posts whose
   body/htmlBody differ from what is live.

Validation gate before switching reads: a comparison script renders
title/excerpt/body lengths for all 229 posts from both sources and
diffs them; zero unexplained diffs required.

### Phases

- **Phase 0, done in this spike:** PoC route proving fetch-with-tags +
  webhook revalidation, with a mock content source so it runs before any
  Sanity project exists.
- **Phase 1, blog:** Create Sanity project + Studio repo (separate repo
  or `/studio` folder deployed with `sanity deploy`, never part of the
  Next build). Define `post` + `blogTopic` schemas. Run import. Point
  `/post/[slug]`, `/blogs`, `/blogs/topics/[slug]` and blog sitemap at
  Sanity behind the existing function signatures. Trim blog
  `generateStaticParams` to newest 20. Configure webhook + revalidate
  route (promote the PoC handler). Delete `imported-blog-posts.json`
  after a soak week.
- **Phase 2, verticals and landing pages:** `vertical`,
  `verticalCityOverride`, `cityNarrativePool`, `landingPage` schemas and
  import. This is the phase that collapses the build: city routes'
  `generateStaticParams` shrink to promoted routes only.
- **Phase 3, industries and services:** `industry`, `service` schemas,
  merge site-content.ts overrides, swap `data.ts` reads. Cities array
  stays.
- **Phase 4, homepage and settings:** `homeSection` documents,
  `siteSettings` singleton for menus/footer.
- **Phase 5, editorial hardening:** draft preview via Presentation tool
  pointed at production `/api/draft`, editor roles, dataset export
  backup cron, editor walkthrough doc for sales/ops.

Rollback per phase is trivial while the old data files still exist: flip
the data source import back and redeploy.

## 5. Risks

**SEO regressions (highest risk).** The site earns programmatic SEO
traffic; slugs, canonicals, metadata, JSON-LD and redirect behaviour
must be byte-compatible. Mitigations: slugs imported verbatim including
the ugly machine-generated ones; alias arrays preserved so the existing
`permanentRedirect` logic keeps working; the comparison script gates the
blog cutover; metadata builders (`buildPageMetadata`, article schema)
keep running on the same fields. On-demand ISR means a previously
unvisited page renders on first request (hundreds of ms server-side
render + one CDN-cached content fetch); Googlebot tolerates this fine,
but we keep the promoted city routes and top pages prebuilt so the
highest-value URLs are never cold. Sitemap must move to dynamic with the
same revalidation tags or new posts will silently stop being indexed.

**Preview and drafts.** Sanity drafts are invisible to the public API
until published, so out of the box editors see changes only after
Publish. Good enough for launch (publish-to-live is seconds), but proper
preview needs Next `draftMode` plus a preview route using a read token
with the drafts perspective. Staging sits behind NPM basic auth, which
the Presentation tool iframe will prompt for; workable, but plan for
preview against production with a secret-gated draft route instead.

**Editor permissions.** Free plan roles are effectively admin and
editor; no field-level or type-level restrictions. A sales editor can
technically edit a vertical template string with `{city}` placeholders
and break 305 pages at once. Mitigations: Studio-side validation rules
(required fields, placeholder linting on template fields), keep
structural fields (slugs, alias arrays) read-only in the Studio UI after
creation, and dataset export snapshots for restore. True role
separation is a Growth-plan feature if it becomes a problem.

**Image handling.** `images.unoptimized: true` means Next serves image
URLs verbatim, so Sanity CDN URLs work with zero pipeline changes; add
`cdn.sanity.io` to `remotePatterns` at Phase 1. Legacy post images live
on `assets.cdn.filesafe.space` (a GHL asset host we do not control);
importing binaries into Sanity removes that silent dependency. Asset
storage (100GB free) is orders of magnitude above need. We deliberately
skip Sanity's image transformation URLs initially to keep parity with
today's unoptimized behaviour.

**Cost and quota.** ~370 documents against a 10k cap, and tag-cached
fetches keep API calls to roughly one per page regeneration, so free
plan limits are not a realistic constraint. The failure mode to watch is
a bug that drops `force-cache` (every request hits Sanity: 250k uncached
requests/month cap) - the shared fetch helper is the guard, and Sanity's
usage dashboard alerts before overage since free plan hard-stops rather
than bills.

**Self-hosted cache semantics.** `revalidateTag` invalidates the cache
of the single running container. Today production is one container, so
this is fine; if we ever scale to replicas, each has its own cache and
the webhook only hits one. Flagging now so a future scale-out knows to
add a shared cache handler (Redis-backed) or loop the revalidate call
over replicas.

**Editorial safety.** A CMS makes bad edits as easy as good ones and
they go live in seconds without review. Free plan has no scheduled
publishing or approval workflow. Process mitigation initially (edit
guidelines for sales/ops), Growth plan if it bites.

## 6. Effort estimate

Assumes one developer, familiar with the codebase, part-time alongside
other work. Calendar ranges include soak time between phases.

| Phase | Work | Estimate |
|---|---|---|
| 0. Spike + PoC | this document, PoC route, revalidate handler | done |
| 1. Blog to Sanity | project setup, schemas, import script + validation, route swap, webhook, sitemap | 3 to 4 days |
| 2. Verticals + landing pages | biggest schema surface, template placeholder validation, build-shape change | 4 to 6 days |
| 3. Industries + services | schema + override merge + swap | 2 to 3 days |
| 4. Homepage + settings | section documents, menu singleton | 1 to 2 days |
| 5. Editorial hardening | preview, roles, backups, editor guide | 2 days |
| Total | | 12 to 17 dev days over 6 to 8 weeks |

Deployment-server work is minimal by design: no new containers, no new
env vars until Phase 1 (`SANITY_PROJECT_ID`, `SANITY_DATASET`,
`SANITY_REVALIDATE_SECRET` in `.env.production.local`), and every phase
after 2 shrinks the build the server has to perform.

---

## Appendix: the PoC in this branch

Blog posts only, dev-only by default, zero new npm dependencies, no
existing route touched.

| Piece | Path |
|---|---|
| Content source (mock file now, Sanity via env later) | `src/lib/cms-poc/source.ts` |
| Mock content store (stands in for the Sanity dataset) | `cms-poc-content/posts.json` |
| List route | `/cms-poc/blog` |
| Detail route | `/cms-poc/blog/[slug]` |
| Revalidate webhook handler | `POST /api/cms-poc/revalidate` |

The source module caches reads with `unstable_cache` under the tags
`cms-poc-posts` and `cms-poc-post:<slug>`, exactly the tag scheme the
real migration uses. The webhook handler accepts either a shared-secret
header (mock/manual testing) or a Sanity GROQ webhook HMAC signature
(verified with node:crypto, no dependency), so the same handler promotes
to Phase 1 unchanged.

Demo of the publish-to-revalidate loop, no Sanity account required:

1. `npm run dev`, open `/cms-poc/blog/hello-cms`.
2. Edit `cms-poc-content/posts.json` (change the title). Reload: page
   still shows the old title, because it is served from the tagged cache.
   That is the "stale until publish" property.
3. Simulate the publish webhook:
   `curl -X POST "http://localhost:3000/api/cms-poc/revalidate" -H "x-cms-poc-secret: dev-secret" -H "content-type: application/json" -d "{\"_type\":\"post\",\"slug\":\"hello-cms\"}"`
4. Reload: new title. Loop closed.

With `SANITY_PROJECT_ID` + `SANITY_DATASET` set, the source switches to
querying the Sanity Content Lake HTTP API (plain `fetch` + GROQ, still
no npm dependency) and the same webhook flow applies, driven by a real
GROQ webhook instead of curl. Gating: the routes 404 in production
unless `CMS_POC=1` is set, so merging this branch cannot leak the PoC.
