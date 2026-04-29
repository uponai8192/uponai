import type { City, Industry, Service } from '@/lib/data';
import { formatCityState } from '@/lib/data';
import { getCityMarketNarrative, getCityRegionNarrative } from '@/lib/voice-ai-industries';

type ServiceContent = {
  badgeLabel: string;
  tagline: string;
  description: string;
  metaDescription: string;
  badgeTop: string;
  badgeBottom: string;
  whyTitle: string;
  whyBody: string;
  whyStats: { value: string; label: string }[];
  locationIntro: string;
  localHighlights: string[];
};

type IndustryContent = {
  badgeLabel: string;
  heroTitle: string;
  tagline: string;
  description: string;
  metaDescription: string;
  stats: { value: string; label: string }[];
  trustPoints: string[];
  cityIntro: string;
  locationSummary: string;
};

const serviceOverrides: Record<string, Omit<ServiceContent, 'locationIntro' | 'localHighlights'>> = {
  'business-voip': {
    badgeLabel: 'Cloud communications platform',
    tagline: 'Cloud calling, routing, and AI-ready communication workflows for modern teams',
    description:
      'UponAI gives teams a flexible communications foundation that supports desk phones, softphones, mobile users, intelligent routing, and future AI voice layers without forcing an outdated PBX model.',
    metaDescription:
      'Cloud calling, routing, softphones, business messaging, and AI-ready communication workflows for modern teams.',
    badgeTop: 'AI-ready platform',
    badgeBottom: 'Routing + calling',
    whyTitle: 'Modern calling without the legacy PBX baggage.',
    whyBody:
      'This is the core communications layer for teams that want reliable calling, cleaner routing, and a platform that can expand into AI voice, analytics, and automation later.',
    whyStats: [
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '24/7', label: 'US-based support' },
      { value: 'AI', label: 'Ready for voice workflows' },
      { value: 'Fast', label: 'Launch and onboarding' },
    ],
  },
  'contact-centers': {
    badgeLabel: 'Omnichannel operations',
    tagline: 'Voice, SMS, chat, and AI-assisted routing for higher-volume customer conversations',
    description:
      'UponAI helps support and revenue teams manage omnichannel conversations with cleaner queue design, better supervisor visibility, and routing logic that can evolve with AI-driven workflows.',
    metaDescription:
      'Omnichannel contact center workflows with voice, SMS, chat, routing, dashboards, analytics, and AI-assisted operations.',
    badgeTop: 'Omnichannel ready',
    badgeBottom: 'Queues + routing',
    whyTitle: 'Designed for teams that manage real conversation volume.',
    whyBody:
      'The focus is not just on handling calls. It is on organizing voice, messaging, and routing so support and sales teams can operate from one coherent workflow.',
    whyStats: [
      { value: 'Voice + SMS', label: 'Connected channels' },
      { value: 'Live', label: 'Supervisor visibility' },
      { value: 'AI', label: 'Workflow expansion path' },
      { value: '24/7', label: 'Operational support' },
    ],
  },
  'sip-trunks': {
    badgeLabel: 'SIP connectivity',
    tagline: 'Flexible SIP connectivity for teams that want carrier control and cleaner call architecture',
    description:
      'UponAI gives businesses a flexible SIP layer for connecting existing infrastructure, managing call paths more cleanly, and supporting more modern routing and failover strategies.',
    metaDescription:
      'Flexible SIP connectivity, carrier control, failover, DID management, and cleaner call architecture for modern businesses.',
    badgeTop: 'Flexible carrier control',
    badgeBottom: 'SIP + routing',
    whyTitle: 'Built for teams that need control without unnecessary complexity.',
    whyBody:
      'SIP trunking still matters when businesses want to preserve existing infrastructure, improve resilience, or keep a tighter grip on how calls enter and leave the stack.',
    whyStats: [
      { value: 'Resilient', label: 'Failover options' },
      { value: 'Flexible', label: 'Carrier architecture' },
      { value: 'DID', label: 'Number management' },
      { value: 'Scale', label: 'Concurrent call support' },
    ],
  },
  'hosted-fax': {
    badgeLabel: 'Cloud fax workflow',
    tagline: 'Secure digital fax workflows for teams that still depend on document-heavy communication',
    description:
      'For industries that still rely on faxing, UponAI replaces physical hardware with a more manageable cloud workflow that fits into modern operations and compliance expectations.',
    metaDescription:
      'Cloud fax workflows for secure document delivery, email-to-fax, fax-to-email, and operationally simpler fax management.',
    badgeTop: 'Secure document flow',
    badgeBottom: 'Cloud fax',
    whyTitle: 'Keep fax where it is needed, modernize everything around it.',
    whyBody:
      'Some industries still need fax. The goal is to reduce hardware pain, simplify delivery, and make those workflows easier to support inside a broader communications stack.',
    whyStats: [
      { value: 'Secure', label: 'Document handling' },
      { value: 'Email', label: 'Inbound + outbound flow' },
      { value: 'Cloud', label: 'No local hardware dependence' },
      { value: 'Operational', label: 'Simpler management' },
    ],
  },
  'mobile-voip-sms': {
    badgeLabel: 'Mobile communications',
    tagline: 'Business calling and messaging that follows your team across every device',
    description:
      'UponAI helps mobile and distributed teams keep one professional communication layer across smartphones, laptops, desks, and remote workflows without splitting the customer experience.',
    metaDescription:
      'Business calling and messaging across smartphones, laptops, softphones, SMS, and distributed team workflows.',
    badgeTop: 'Work anywhere',
    badgeBottom: 'Calling + SMS',
    whyTitle: 'Built for teams that move faster than a desk phone.',
    whyBody:
      'When teams are on the road, remote, or split across offices, mobility stops being a feature and becomes the baseline communication model.',
    whyStats: [
      { value: 'Mobile', label: 'Cross-device workflow' },
      { value: 'SMS', label: 'Business messaging' },
      { value: 'Unified', label: 'One communication layer' },
      { value: 'Remote', label: 'Team-ready' },
    ],
  },
  'web-video-conferencing': {
    badgeLabel: 'Meetings and collaboration',
    tagline: 'Meetings, webinars, and collaboration built into your communications stack',
    description:
      'UponAI gives teams a cleaner way to run meetings, webinars, and internal collaboration without treating calling, conferencing, and follow-up workflows as separate systems.',
    metaDescription:
      'Meetings, webinars, screen sharing, recording, and collaboration integrated into the broader communications stack.',
    badgeTop: 'Collaboration ready',
    badgeBottom: 'Meetings + webinars',
    whyTitle: 'Keep communication channels connected instead of fragmented.',
    whyBody:
      'Voice, meetings, and collaboration workflows work better when they are part of the same stack, especially for teams that need less friction between internal and external communication.',
    whyStats: [
      { value: 'Video', label: 'Meetings + webinars' },
      { value: 'Shared', label: 'Screen and content workflow' },
      { value: 'Recorded', label: 'Meeting playback' },
      { value: 'Unified', label: 'Connected stack' },
    ],
  },
  'voip-integration': {
    badgeLabel: 'Integration layer',
    tagline: 'Connect calling data, routing, and automation to the rest of your business stack',
    description:
      'UponAI helps teams connect communications to CRM, automation, analytics, and internal systems so customer conversations become part of the actual operating workflow instead of a disconnected channel.',
    metaDescription:
      'Integrate calling, routing, CRM, automation, analytics, and business tools into one connected workflow.',
    badgeTop: 'API + workflow ready',
    badgeBottom: 'CRM + automation',
    whyTitle: 'Useful communication data should not stay trapped in the phone system.',
    whyBody:
      'Integrations matter when you want better reporting, faster handoffs, cleaner data capture, and communications that feed the rest of your stack automatically.',
    whyStats: [
      { value: 'CRM', label: 'Connected workflows' },
      { value: 'API', label: 'Integration options' },
      { value: 'Logs', label: 'Cleaner conversation data' },
      { value: 'AI', label: 'Automation-ready stack' },
    ],
  },
  'ai-voice-agents': {
    badgeLabel: 'AI voice workflow',
    tagline: 'Human-sounding voice AI that answers, qualifies, routes, and books around the clock',
    description:
      'UponAI voice agents handle live phone conversations with a workflow designed for qualification, scheduling, routing, after-hours coverage, and cleaner handoff to your team.',
    metaDescription:
      'Human-sounding voice AI for qualification, scheduling, routing, after-hours coverage, and live handoff.',
    badgeTop: '24/7 AI answering',
    badgeBottom: 'Voice automation',
    whyTitle: 'Replace voicemail and rigid IVR with a real conversation layer.',
    whyBody:
      'This is the fastest way to give teams always-on phone coverage without forcing callers through outdated menus or pushing every after-hours call into a callback pile.',
    whyStats: [
      { value: '24/7', label: 'Always-on coverage' },
      { value: 'Live', label: 'Scheduling + qualification' },
      { value: 'AI', label: 'Conversation workflow' },
      { value: 'Fast', label: 'Response experience' },
    ],
  },
  'ai-chatbots': {
    badgeLabel: 'AI chatbot workflow',
    tagline: 'Website and messaging AI that captures intent, qualifies leads, and routes conversations',
    description:
      'UponAI chatbots help businesses respond faster on the web and across messaging channels by handling routine questions, qualification, lead capture, and escalation into the right team workflow.',
    metaDescription:
      'AI chatbot workflows for website conversations, qualification, lead capture, escalation, and customer support.',
    badgeTop: 'Lead capture ready',
    badgeBottom: 'Chat automation',
    whyTitle: 'Move faster online without making the experience feel robotic.',
    whyBody:
      'Chatbots matter when businesses want faster lead capture, stronger qualification, and a clearer path from website intent to human follow-up.',
    whyStats: [
      { value: 'Web', label: 'Conversation coverage' },
      { value: 'AI', label: 'Qualification logic' },
      { value: 'CRM', label: 'Data capture path' },
      { value: 'Live', label: 'Escalation ready' },
    ],
  },
};

export function getServiceContent(service: Service, city?: City): ServiceContent {
  const base = serviceOverrides[service.slug];
  const location = city ? formatCityState(city) : null;
  const market = city ? getCityMarketNarrative(city) : null;
  const region = city ? getCityRegionNarrative(city) : null;

  const fallback: ServiceContent = {
    badgeLabel: 'Communication workflow',
    tagline: service.tagline.replace(/\bVoIP\b/gi, 'communications').replace(/phone system/gi, 'communication workflow'),
    description: service.description.replace(/MyVoIP/gi, 'UponAI').replace(/\bVoIP\b/gi, 'communications'),
    metaDescription: service.description.replace(/MyVoIP/gi, 'UponAI').replace(/\bVoIP\b/gi, 'communications'),
    badgeTop: 'Modern workflow',
    badgeBottom: 'Communications',
    whyTitle: 'Designed for cleaner communication workflows.',
    whyBody:
      'UponAI connects calling, routing, and AI-aware operations so teams can manage customer conversations with less friction and better visibility.',
    whyStats: [
      { value: '24/7', label: 'Support' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: 'AI', label: 'Workflow expansion' },
      { value: 'Fast', label: 'Launch path' },
    ],
    locationIntro: city
      ? `Teams in ${location} often need ${service.shortName.toLowerCase()} that can handle ${market?.seo.toLowerCase() ?? 'local demand'}`
      : '',
    localHighlights: city
      ? [
          `${service.shortName} helps ${city.name} teams respond faster when call volume spikes or internal bandwidth gets thin.`,
          `${region?.body ?? ''} That makes cleaner routing and communication design more valuable in ${city.name}.`,
          `UponAI supports ${service.shortName.toLowerCase()} for businesses in ${location} with a stack that can expand into AI workflows as operational needs grow.`,
        ]
      : [],
  };

  const merged = base ? { ...fallback, ...base } : fallback;

  return {
    ...merged,
    locationIntro: city
      ? `${merged.description} In ${location}, ${market?.seo.toLowerCase() ?? 'response speed and routing still matter'}, and ${region?.body.toLowerCase() ?? 'teams need a steadier first response.'}`
      : merged.description,
    localHighlights: city
      ? [
          `${service.shortName} helps ${city.name} teams support inbound demand with cleaner routing, better handoff logic, and a more modern communication layer.`,
          `${market?.headline ?? 'Local demand changes how teams need to answer.'} ${market?.body ?? ''}`,
          `${region?.title ?? 'Regional expectations matter.'} ${region?.body ?? ''}`,
        ]
      : [],
  };
}

export function getIndustryContent(industry: Industry, city?: City): IndustryContent {
  const location = city ? formatCityState(city) : null;
  const market = city ? getCityMarketNarrative(city) : null;
  const region = city ? getCityRegionNarrative(city) : null;

  const filteredStats = industry.stats.filter((stat) => !/\$/.test(stat.value) && !/starting/i.test(stat.label));
  const stats =
    filteredStats.length >= 3
      ? filteredStats
      : [
          { value: '24/7', label: 'Support coverage' },
          { value: '99.99%', label: 'Uptime SLA' },
          { value: 'AI', label: 'Workflow expansion path' },
        ];

  return {
    badgeLabel: city ? `${industry.name} in ${location}` : 'Industry workflow',
    heroTitle: city ? `${industry.name} communication workflows in ${location}` : `${industry.name} communication workflows`,
    tagline: industry.tagline
      .replace(/\bVoIP\b/gi, 'communications')
      .replace(/phone systems?/gi, 'communication workflows')
      .replace(/\s+starting at.*$/i, ''),
    description: city
      ? `UponAI helps ${industry.name.toLowerCase()} teams in ${location} improve customer communication, routing, and operational handoff with a stack designed around real workflow pressure. ${market?.seo ?? ''}`
      : `UponAI helps ${industry.name.toLowerCase()} teams improve customer communication, routing, and operational handoff with cloud communications, AI workflows, and implementation shaped around real day-to-day operations.`,
    metaDescription: city
      ? `Communication workflows, AI routing, and operationally-aware handoff design for ${industry.name.toLowerCase()} teams in ${location}.`
      : `Communication workflows, AI routing, and operationally-aware handoff design for ${industry.name.toLowerCase()} teams.`,
    stats: stats.slice(0, 4),
    trustPoints: [
      '24/7 US-based support',
      'Communication workflows shaped around real operations',
      'Cleaner routing and handoff design',
      'Cloud communications that can expand into AI voice and automation',
      'No generic one-size-fits-all deployment model',
      city ? `Built to support teams operating in and around ${city.name}` : 'Built for teams that need operationally-aware communication workflows',
    ],
    cityIntro: city
      ? `${market?.headline ?? ''} ${market?.body ?? ''} ${region?.body ?? ''}`.trim()
      : industry.description.replace(/MyVoIP/gi, 'UponAI').replace(/\bVoIP\b/gi, 'communications'),
    locationSummary: city
      ? `${industry.name} teams in ${location} need communication workflows that can support local demand, cleaner routing, and stronger first-response coverage across the market.`
      : `${industry.name} teams need communication workflows that reflect operational reality, not generic phone-system marketing.`,
  };
}
