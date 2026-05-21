import { NextRequest, NextResponse } from 'next/server';

// Paths that are purely scanner/exploit probes — block silently
const SCANNER_PATTERNS = [
  // Environment & credential files
  /^\/.env/i,
  /^\/.git/i,
  /^\/.aws/i,
  /^\/.ssh/i,
  /^\/.netrc/i,
  /^\/.pypirc/i,
  /^\/.docker/i,
  /^\/.netlify/i,
  /^\/.pip/i,
  /^\/.zsh_history/i,
  /^\/.bash_history/i,
  /^\/.sh_history/i,
  /^\/.svn/i,
  /^\/.hg/i,
  /^\/.terraform/i,
  /^\/.vercel/i,
  /^\/.github/i,
  /^\/.gitlab-ci/i,
  /^\/.circleci/i,
  /^\/.vscode/i,
  /^\/.envrc/i,
  /^\/.git-credentials/i,
  /^\/.DS_Store/i,

  // Config/secret files anywhere in the path
  /\/\.env($|[./])/i,
  /\/credentials(\.yml)?(\.enc)?$/i,
  /\/master\.key$/i,
  /\/database\.yml$/i,
  /\/pip\.conf$/i,
  /\/terraform\.tfstate/i,

  // Path traversal attempts
  /^\/@fs\//i,

  // SSRF probe query params
  /[?&](url|dest|proxy|redirect)=https?:\/\//i,
  /[?&](url|dest|proxy|redirect)=http:\/\/(127\.|169\.254\.|metadata\.|localhost|::|ip6)/i,

  // Known scanner/exploit endpoints
  /^\/api\/(fetch|proxy)\b/i,
  /^\/debug\//i,
  /^\/_cat\//i,
  /^\/server-status/i,
  /^\/server-info/i,
  /^\/minio\//i,
  /^\/haproxy/i,
  /^\/v2\/api-docs/i,
  /^\/api\/swagger/i,
  /^\/swagger-ui/i,
  /^\/openapi\.json$/i,
  /^\/graphiql$/i,
  /^\/app\/kibana/i,
  /^\/metrics$/i,
  /^\/buildspec\.(yml|yaml)$/i,
  /^\/cloudbuild\.(yml|yaml|json)$/i,
  /^\/Jenkinsfile$/i,
  /^\/Procfile$/i,
  /^\/serverless\.(yml|yaml)$/i,
  /^\/bitbucket-pipelines\.yml$/i,
  /^\/azure-pipelines\.yml$/i,
  /^\/netlify\.toml$/i,
  /^\/firebase-debug\.log$/i,
  /^\/functions\//i,
];

// User-Agent substrings that indicate bots/crawlers/scrapers
const BOT_UA_PATTERNS = [
  'bot', 'crawl', 'spider', 'scrape', 'slurp', 'fetch',
  'python-requests', 'python-urllib', 'python-httpx',
  'go-http-client', 'go http package',
  'curl', 'wget', 'libwww', 'httpclient',
  'java/', 'okhttp', 'apache-httpclient',
  'axios', 'node-fetch', 'got/', 'undici',
  'scrapy', 'mechanize', 'aiohttp',
  'headlesschrome', 'phantomjs', 'selenium',
  'nuclei', 'zgrab', 'masscan', 'nmap', 'nikto', 'sqlmap',
  'dataforseo', 'semrush', 'ahrefsbot', 'mj12bot',
];

// In-memory rate limit store: ip -> { count, resetAt }
// Module-level so it persists across requests in the same process
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_REQUESTS = 20;  // max requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per 60 seconds

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  record.count++;

  if (record.count > RATE_LIMIT_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  return { limited: false, retryAfter: 0 };
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const fullPath = pathname + search;

  // 1. Block scanner patterns
  if (SCANNER_PATTERNS.some((pattern) => pattern.test(fullPath))) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. Block bot/crawler User-Agents
  const ua = (req.headers.get('user-agent') ?? '').toLowerCase();
  if (!ua || BOT_UA_PATTERNS.some((s) => ua.includes(s))) {
    return new NextResponse(null, { status: 403 });
  }

  // 3. Rate limit
  const ip = getClientIP(req);
  const { limited, retryAfter } = isRateLimited(ip);

  if (limited) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png).*)'],
};
