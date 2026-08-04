# Staging server runbook

Stand up `staging.uponai.com` on the same box as production so the team can
preview a branch before it merges. Production stays untouched: staging is a
separate checkout, a separate container, and a separate port.

| | Production | Staging |
|---|---|---|
| Host | `uponai.com`, `www.uponai.com` | `staging.uponai.com` |
| Upstream | `http://172.17.0.1:3000` | `http://172.17.0.1:3002` |
| Directory | `~/uponai_website` | `~/uponai_website_staging` |
| Branch | production branch | `feat/site-redesign` |
| Access | public | basic auth via NPM access list |
| Indexing | allowed | blocked |

---

## 0. Pre-flight, do this first

Measured on the server:

```
/dev/root   96G   76G used   21G avail   79%
Mem: 7.6Gi total   3.9Gi used   3.7Gi available
Swap: 0B
```

Two things follow from that. **There is no swap**, so any memory spike is an
immediate OOM kill with no grace, and 3.7GB available is not enough for a full
production build of this site.

### Staging builds a fraction of the pages

Production generates 13,465 pages, almost all of which are city permutations:
15 city routes across 305 cities. Staging does not need them. Setting
`NEXT_PUBLIC_SITE_ENV=staging` trims the static list to 6 cities:

| | Pages |
|---|---|
| Production | 13,465 |
| Staging | about 609 |

This is driven by `staticParamCities` in `src/lib/data.ts`, which every city
route's `generateStaticParams` reads. Cities outside that sample still render
on demand, because no route sets `dynamicParams = false` — so staging keeps
full functionality, it just does not pre-render 13,000 pages. Production is
untouched: without the env var the full 305-city list is used.

### Add swap anyway

Cheap insurance, and it keeps the box healthy for everything else it runs:

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
free -h
```

To make it survive a reboot, append `/swapfile none swap sw 0 0` to `/etc/fstab`.

### Disk

21GB free is enough for a second `node_modules` plus a trimmed `.next`, but it
is not roomy. If you want headroom first:

```bash
docker system prune -a --volumes
```

Read what that will delete before confirming: it removes unused images and
volumes, and anything not attached to a running container is fair game.

---

## 1. DNS

Add an A record for `staging.uponai.com` pointing at the same public IP as
`uponai.com`. Let it propagate before requesting a certificate in step 5, or
Let's Encrypt validation fails.

```bash
dig +short staging.uponai.com
```

---

## 2. Clone the branch

```bash
cd ~
git clone https://github.com/uponai8192/uponai.git uponai_website_staging
cd uponai_website_staging
git checkout feat/site-redesign
```

---

## 3. Build files and environment

`Dockerfile`, `.dockerignore` and `docker-compose.yml` are **not in the repo**.
They live only on the server, so a fresh clone cannot build until you copy them
across. This is the first thing that will fail otherwise.

```bash
cd ~/uponai_website_staging
cp ~/uponai_website/Dockerfile ~/uponai_website/.dockerignore .
cp ~/uponai_website/docker-compose.yml ./docker-compose.staging.yml
```

Production keeps two env files, and they do different jobs:

- `.env.production.local` is what compose loads via `env_file`, so it is the
  **runtime** environment. The final image copies only `package*.json`,
  `.next`, `public` and `node_modules`, so no env file ships inside it.
- `.env.local` is also copied into the builder by `COPY . .` and read during
  `next build`, but `.env.production.local` wins for any shared key.

Copy both, then set the staging overrides in `.env.production.local`, since
that is the file used at both build and run time:

```bash
cp ~/uponai_website/.env.local ~/uponai_website/.env.production.local .
sed -i 's/^NOTIFY_EMAILS=.*/NOTIFY_EMAILS=you@uponai.com/' .env.production.local
printf '\nNEXT_PUBLIC_SITE_ENV=staging\n' >> .env.production.local
grep -n 'NOTIFY_EMAILS\|NEXT_PUBLIC_SITE_ENV' .env.production.local
```

Use `sed` rather than appending for `NOTIFY_EMAILS`: the key already exists, and
a duplicate makes which value wins depend on parser order.

**`NEXT_PUBLIC_SITE_ENV` must be set at build time, not run time.** Anything
prefixed `NEXT_PUBLIC_` is inlined into the bundle when `next build` runs, and
both `robots.txt` and the city page list are decided during that same build.
Putting it only under `environment:` in compose sets it at run time, which is
too late: the build will already have emitted `Allow: /` and queued all 13,465
pages, which is exactly the build this box cannot finish.

The simplest way to guarantee it lands is to write it into the staging
checkout before building, since Next reads this file during `next build`:

```bash
cd ~/uponai_website_staging
echo 'NEXT_PUBLIC_SITE_ENV=staging' >> .env.production.local
```

If you would rather drive it through Docker, the Dockerfile needs to accept it
as a build argument and promote it to an env var *before* the build step:

```dockerfile
ARG NEXT_PUBLIC_SITE_ENV
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV
RUN npm run build
```

and compose passes it under `build.args`, not just `environment`. Verify it
took effect in step 6 before you hand out the URL.

Keep the same `UPONAI_API_KEY` and agent ids unless you want staging pointed at
different agents. Every vertical accepts an override, so you can redirect one
without touching code:

```bash
UPONAI_AGENT_ID_HEALTHCARE=agent_...
```

---

## 4. Container

Edit `docker-compose.staging.yml` so it differs from production in exactly two
places, the container name and the published port. Everything else, including
`env_file`, must match or staging will come up missing runtime secrets and the
voice API and SMTP will fail in ways that look like code bugs:

```yaml
services:
  uponai-website:
    build: .
    container_name: uponai-website-staging
    restart: unless-stopped
    ports:
      - "3002:3000"
    env_file:
      - .env.production.local
```

Bring it up:

```bash
docker compose -f docker-compose.staging.yml up -d --build
```

Watch the build, since this is where an OOM would surface:

```bash
docker compose -f docker-compose.staging.yml logs -f
```

Confirm it is serving before touching the proxy:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3002
```

---

## 5. Nginx Proxy Manager

In `playground.upon-ai.com/nginx/proxy`:

1. **Add Proxy Host**
   - Domain: `staging.uponai.com`
   - Scheme `http`, Forward Hostname `172.17.0.1`, Forward Port `3002`
   - Enable **Block Common Exploits** and **Websockets Support**
     (websockets matter: the voice widget uses one for live calls)
2. **SSL tab**: request a new Let's Encrypt certificate, enable **Force SSL**
   and **HTTP/2**
3. **Access list**: create one under Access Lists with a username and password
   for the team, then attach it to this proxy host

The access list is what actually keeps staging private. `robots.txt` only asks
crawlers politely; basic auth stops everything else.

**Leave the Access tab empty.** An NPM access list has two tabs and they do
different jobs:

- **Authorization** holds usernames and passwords, and produces a `401`
- **Access** holds IP rules. Put anything here and NPM emits
  `allow <listed>; deny all;`, so everyone else gets a flat `403` before auth
  is ever considered, including you and the server itself

A `403` from openresty means an IP rule is rejecting you; a `401` means basic
auth is working as intended. For a remote team, IP rules are the wrong tool
anyway: laptops, phones and tethered connections all move. One shared username
and password, Satisfy Any unchecked, Access tab empty.

---

## 6. Verify

```bash
curl -su USER:PASS https://staging.uponai.com/robots.txt      # expect Disallow: /
curl -s -o /dev/null -w '%{http_code}\n' https://staging.uponai.com   # expect 401 without auth
```

If `robots.txt` comes back `Allow: /`, the build did not see
`NEXT_PUBLIC_SITE_ENV`. Fix it per step 3 and rebuild; a run-time restart will
not change it. Do not skip this check, it is the difference between a private
preview and a second copy of the site competing with production in search.

The build log is the other tell. Staging should report roughly 600 pages
generated. If it starts counting toward 13,465, the env var did not reach the
build and it will likely be OOM-killed before finishing.

Then in a browser, signed in through basic auth, check:

- homepage renders the new layout and the seven agent avatars
- an industry page shows the right agent, for example `/voice-ai-for-healthcare-page` shows Aria
- light and dark theme both look right
- a voice call connects and the on-call timer appears

---

## Gotchas

**Turnstile is domain-locked.** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` only validates
on hostnames registered against that widget in Cloudflare. Until you add
`staging.uponai.com` to the widget's hostname list, every form on staging fails
with "Captcha could not be verified". This is the same thing that makes forms
fail on `localhost`.

**Voice calls on staging are real.** They hit the live agents, consume real
minutes, and email a real lead. Point `NOTIFY_EMAILS` somewhere harmless before
you hand the URL out.

**Canonical tags still say production.** Pages hardcode
`alternates.canonical: 'https://uponai.com'`. That is helpful here, since it
tells any crawler that slips past to credit production, but do not read a
canonical on staging as a bug.

**Do not point staging at the production database or CRM** if that ever changes.
Today the only write path is `/api/contact`, which pushes to GHL and sends mail,
so staging submissions land in the real CRM. Use a test GHL location if that
matters to you.

---

## Updating staging

```bash
cd ~/uponai_website_staging
git fetch origin
git checkout feat/site-redesign
git pull
docker compose -f docker-compose.staging.yml up -d --build
```

## Tearing it down

```bash
cd ~/uponai_website_staging
docker compose -f docker-compose.staging.yml down
cd ~ && rm -rf uponai_website_staging
```

Then delete the proxy host and its certificate in NPM, and remove the DNS
record.
