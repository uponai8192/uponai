import { permanentRedirect } from 'next/navigation';

const legacyTagRedirects: Record<string, string> = {
  agents: '/blogs/topics/ai-voice-operations',
  ai: '/blogs/topics/ai-voice-operations',
  aiagents: '/blogs/topics/ai-voice-operations',
  aisolutions: '/blogs/topics/ai-voice-operations',
  balance: '/blogs/topics/ai-voice-operations',
  callanswering: '/blogs/topics/business-continuity',
  chatgpt: '/blogs/topics/ai-voice-operations',
  claude: '/blogs/topics/ai-voice-operations',
  cloudvoice: '/blogs/topics/telecom-partnerships',
  competition: '/blogs/topics/telecom-partnerships',
  connection: '/blogs/topics/telecom-partnerships',
  broadworks: '/blogs/topics/integration-strategy',
  experince: '/blogs/topics/ai-voice-operations',
  homeservices: '/blogs/topics/business-continuity',
  humancreativity: '/blogs/topics/ai-voice-operations',
  innovation: '/blogs/topics/ai-voice-operations',
  integrations: '/blogs/topics/integration-strategy',
  'legacy-answering-services': '/blogs/topics/business-continuity',
  opportunities: '/blogs/topics/telecom-partnerships',
  roofing: '/blogs/topics/business-continuity',
  savemoney: '/blogs/topics/business-continuity',
  smallwins: '/blogs/topics/ai-voice-operations',
  smartrouting: '/blogs/topics/integration-strategy',
  timely: '/blogs/topics/business-continuity',
  usecase: '/blogs/topics/business-continuity',
  'voice-agents': '/blogs/topics/ai-voice-operations',
};

function normalizeLegacyTag(value: string) {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function LegacyBlogTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const normalizedTag = normalizeLegacyTag(tag);
  permanentRedirect(legacyTagRedirects[normalizedTag] ?? '/blogs');
}
