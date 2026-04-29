import { buildUrlSet, voiceAIRootEntries, xmlResponse } from '@/lib/sitemap';

export const revalidate = 3600;

export function GET() {
  return xmlResponse(buildUrlSet(voiceAIRootEntries));
}
