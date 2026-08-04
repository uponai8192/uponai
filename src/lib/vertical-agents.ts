// Per-vertical voice agent configuration (client-safe).
//
// Seven verticals have a dedicated demo agent in the UponAI workspace. Those
// are showcases: each one walks a caller through a fixed set of workflows
// rather than running a full production deployment, so the copy here stays
// scoped to what the agent actually demonstrates.
//
// Every other page falls back to Grace, the general UponAI website agent.
//
// Agent ids are deliberately NOT in this file: it is imported by a client
// component, so anything here ships in the browser bundle. The key sent to the
// server is resolved to an agent id server-side (see vertical-agents.server.ts).

export type VerticalAgent = {
  /** Stable key sent to the server and mapped to an agent id. */
  key: string;
  /** The agent's own name, e.g. "Aria". */
  name: string;
  /** Vertical shown under the name, e.g. "UponAI agent · Healthcare". */
  contextLabel: string;
  /** What this agent actually walks through on a call. */
  blurb: string;
  /** Three capabilities, matching the agent's real demo scope. */
  chips: [string, string, string];
  /** True for the scoped showcase agents, false for the general website agent. */
  demo: boolean;
};

/** The general website agent, used wherever there is no dedicated demo agent. */
const graceFallback = {
  name: 'Grace',
  demo: false,
} as const;

const verticalAgents: VerticalAgent[] = [
  {
    key: 'healthcare',
    name: 'Aria',
    contextLabel: 'Healthcare & Life Sciences',
    blurb: 'Walks through patient triage intake, clinical documentation summaries, and research query handling.',
    chips: ['Triage intake', 'Clinical summaries', 'Research queries'],
    demo: true,
  },
  {
    key: 'financial-services',
    name: 'Maxwell',
    contextLabel: 'Financial Services',
    blurb: 'Walks through risk analysis briefings, compliance document review, research summarisation, and account support queries.',
    chips: ['Risk briefings', 'Compliance review', 'Research summaries'],
    demo: true,
  },
  {
    key: 'legal',
    name: 'Lex',
    contextLabel: 'Legal & Professional Services',
    blurb: 'Walks through contract clause review, discovery query handling, and first-draft document generation.',
    chips: ['Clause review', 'Discovery queries', 'Draft generation'],
    demo: true,
  },
  {
    key: 'retail',
    name: 'Sage',
    contextLabel: 'Retail & E-Commerce',
    blurb: 'Walks through product discovery, personalised recommendations, order support, and catalogue generation.',
    chips: ['Product discovery', 'Recommendations', 'Order support'],
    demo: true,
  },
  {
    key: 'hospitality',
    name: 'Maren',
    contextLabel: 'Hospitality & Travel',
    blurb: 'Walks through trip planning and building a personalised itinerary the way a travel advisor would.',
    chips: ['Trip planning', 'Itinerary building', 'Traveller questions'],
    demo: true,
  },
  {
    key: 'education',
    name: 'Nova',
    contextLabel: 'Education',
    blurb: 'Walks through conversational student tutoring and curriculum development support.',
    chips: ['Student tutoring', 'Curriculum support', 'Learner questions'],
    demo: true,
  },
  {
    key: 'government',
    name: 'Max',
    contextLabel: 'Government & Public Sector',
    blurb: 'Walks through service queries, application status checks, public information requests, and form guidance.',
    chips: ['Service queries', 'Application status', 'Form guidance'],
    demo: true,
  },
];

const byKey = new Map(verticalAgents.map((agent) => [agent.key, agent]));

/** Vertical keys the server will accept. Anything else uses the default agent. */
export const verticalAgentKeys = verticalAgents.map((agent) => agent.key);

/**
 * Route slugs mapped to a vertical key. Only slugs with a dedicated demo agent
 * appear here; everything else falls back to the general website agent.
 */
const slugToVerticalKey: Record<string, string> = {
  // voice-ai-* landing pages
  'voice-ai-for-healthcare-page': 'healthcare',
  'voice-ai-for-legal-services': 'legal',
  // /industries/* entries
  healthcare: 'healthcare',
  'law-firms': 'legal',
  'financial-services': 'financial-services',
  retail: 'retail',
  'hotels-hospitality': 'hospitality',
  education: 'education',
  government: 'government',
};

/**
 * Look up a vertical agent, falling back to the general website agent. The
 * fallback copy stays generic on purpose: Grace is not trained per vertical,
 * so promising vertical-specific skills there would overstate what she does.
 */
export function getVerticalAgent(key: string | undefined, fallbackLabel: string): VerticalAgent {
  const found = key ? byKey.get(key) : undefined;
  if (found) return found;

  return {
    key: 'general',
    name: graceFallback.name,
    contextLabel: fallbackLabel,
    blurb: 'Answers questions about UponAI and how a voice agent would handle calls for your team.',
    chips: ['Answers questions', 'Explains workflows', 'Books a demo'],
    demo: graceFallback.demo,
  };
}

/**
 * Name of the agent for a vertical key, for UI that only knows the key (the
 * shared call modal). Falls back to the general website agent.
 */
export function getVerticalAgentName(key: string | undefined): string {
  const found = key ? byKey.get(key) : undefined;
  return found?.name ?? graceFallback.name;
}

/** Resolve the agent shown on a page from its route slug. */
export function getVerticalAgentForSlug(slug: string, fallbackLabel: string): VerticalAgent {
  return getVerticalAgent(slugToVerticalKey[slug], fallbackLabel);
}
