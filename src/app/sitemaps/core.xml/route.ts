import { buildUrlSet, getCoreSitemapEntries, xmlResponse } from '@/lib/sitemap';

export const revalidate = 3600;

export async function GET() {
  return xmlResponse(buildUrlSet(await getCoreSitemapEntries()));
}
