import { NextResponse, type NextRequest } from 'next/server';

// bench.uponai.com is the benchmark page on its own hostname. Its root renders
// /benchmarks in place; every other page path goes to the main site so the
// rest of uponai.com is not duplicated under the subdomain. Next's assets and
// root-level files (icons, images) are excluded by the matcher and served
// as usual.
export function middleware(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').toLowerCase();
  if (!host.startsWith('bench.')) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  if (pathname === '/' || pathname === '/benchmarks') {
    if (pathname === '/benchmarks') return NextResponse.redirect(new URL(`/${search}`, `https://${host}`), 308);
    return NextResponse.rewrite(new URL(`/benchmarks${search}`, request.url));
  }
  return NextResponse.redirect(new URL(`${pathname}${search}`, 'https://uponai.com'), 308);
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)'],
};
