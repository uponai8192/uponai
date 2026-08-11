import { createHmac, timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import {
  CMS_TAG_HOME,
  CMS_TAG_POSTS,
  CMS_TAG_TOPICS,
  CMS_TAG_VERTICALS,
  cmsPostTag,
} from '@/lib/cms/sanity';

// Publish webhook for CMS-driven content (docs/cms-migration-spike.md).
// Sanity's GROQ webhook POSTs here on create/update/delete; the _type in the
// payload decides which cache tags are invalidated. Two auth paths:
//   1. x-cms-revalidate-secret header matching CMS_REVALIDATE_SECRET
//      (defaults to "dev-secret" outside production) - manual/dev testing.
//   2. sanity-webhook-signature header, verified as Sanity signs it:
//      base64url(HMAC-SHA256(`${timestamp}.${rawBody}`, SANITY_REVALIDATE_SECRET)).
// In production with neither secret configured every request is rejected, so
// exposing the route before the secrets land is safe.

const SANITY_SIGNATURE_HEADER = 'sanity-webhook-signature';

function sharedSecret() {
  if (process.env.CMS_REVALIDATE_SECRET) return process.env.CMS_REVALIDATE_SECRET;
  return process.env.NODE_ENV === 'production' ? null : 'dev-secret';
}

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

function verifySanitySignature(header: string, rawBody: string, secret: string) {
  const parts = new Map(
    header.split(',').map((part) => {
      const [key, ...rest] = part.split('=');
      return [key.trim(), rest.join('=')] as const;
    })
  );
  const timestamp = parts.get('t');
  const signature = parts.get('v1');
  if (!timestamp || !signature) return false;

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('base64url')
    .replace(/=+$/, '');
  return safeEqual(signature, expected);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const secretHeader = request.headers.get('x-cms-revalidate-secret');
  const sanityHeader = request.headers.get(SANITY_SIGNATURE_HEADER);
  const shared = sharedSecret();
  const sanitySecret = process.env.SANITY_REVALIDATE_SECRET;

  const authorized =
    (secretHeader !== null && shared !== null && safeEqual(secretHeader, shared)) ||
    (sanityHeader !== null &&
      sanitySecret !== undefined &&
      verifySanitySignature(sanityHeader, rawBody, sanitySecret));

  if (!authorized) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let slug: string | undefined;
  let type: string | undefined;
  try {
    const body = rawBody ? (JSON.parse(rawBody) as { slug?: string; _type?: string }) : {};
    slug = typeof body.slug === 'string' ? body.slug : undefined;
    type = typeof body._type === 'string' ? body._type : undefined;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const tags: string[] = [];
  if (type === 'homePage') {
    tags.push(CMS_TAG_HOME);
  } else if (type === 'vertical' || type === 'verticalCityOverride') {
    tags.push(CMS_TAG_VERTICALS);
  } else if (type === 'blogTopic') {
    // Topic titles appear on the blog index and every post page, so the post
    // tag goes too.
    tags.push(CMS_TAG_TOPICS, CMS_TAG_POSTS);
  } else {
    // A post, or an untyped manual call: refresh the list and, when the
    // payload names one, that post's own tag.
    tags.push(CMS_TAG_POSTS);
    if (slug) tags.push(cmsPostTag(slug));
  }
  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tags, now: new Date().toISOString() });
}
