// Per-vertical voice agent configuration.
//
// Each industry page shows a live agent card instead of a stock photo. The
// card sends its `verticalKey` when starting a web call so the server can
// route to the agent trained for that vertical (see the API route). Keys here
// are the allowlist: anything not listed falls back to the default agent.

export type VerticalAgent = {
  /** Stable key sent to the server and mapped to an agent id. */
  key: string;
  /** Vertical shown next to the agent name, e.g. "UponAI agent · Healthcare". */
  contextLabel: string;
  /** One line on what this agent handles for this vertical. */
  blurb: string;
  /** Three short capabilities, tuned per vertical. */
  chips: [string, string, string];
};

const AGENT_NAME = 'Grace';

/** Persona name is shared across verticals; only the training differs. */
export const verticalAgentName = AGENT_NAME;

const verticalAgents: VerticalAgent[] = [
  {
    key: 'healthcare',
    contextLabel: 'Healthcare',
    blurb: 'Books and reschedules patients, answers hours and insurance questions, and routes urgent calls to your staff.',
    chips: ['Books appointments', 'Insurance questions', 'Urgent routing'],
  },
  {
    key: 'financial-services',
    contextLabel: 'Financial Services',
    blurb: 'Handles account and product questions, qualifies enquiries, and routes regulated requests to a licensed person.',
    chips: ['Qualifies enquiries', 'Product questions', 'Compliant handoff'],
  },
  {
    key: 'legal',
    contextLabel: 'Legal',
    blurb: 'Screens new matters, captures case details, and books consultations without pulling your team off billable work.',
    chips: ['Screens matters', 'Captures details', 'Books consults'],
  },
  {
    key: 'retail',
    contextLabel: 'Retail & E-Commerce',
    blurb: 'Answers order, stock, and returns questions around the clock, and escalates the ones that need a person.',
    chips: ['Order status', 'Returns support', 'Product questions'],
  },
  {
    key: 'hospitality',
    contextLabel: 'Hospitality & Travel',
    blurb: 'Takes bookings, answers guest questions, and passes on requests the front desk needs to see.',
    chips: ['Takes bookings', 'Guest questions', 'Front-desk handoff'],
  },
  {
    key: 'education',
    contextLabel: 'Education',
    blurb: 'Fields admissions, enrolment, and campus questions, and routes students to the right department.',
    chips: ['Admissions questions', 'Enrolment support', 'Department routing'],
  },
  {
    key: 'government',
    contextLabel: 'Government & Public Sector',
    blurb: 'Answers routine constituent questions, handles surges, and routes cases to the right office.',
    chips: ['Constituent questions', 'Surge coverage', 'Case routing'],
  },
  {
    key: 'insurance',
    contextLabel: 'Insurance',
    blurb: 'Captures claim and policy enquiries, qualifies intent, and routes to the right adjuster or agent.',
    chips: ['Policy questions', 'Claim intake', 'Agent routing'],
  },
  {
    key: 'home-services',
    contextLabel: 'Home Services',
    blurb: 'Captures service requests, qualifies urgency, and books the job to the right crew.',
    chips: ['Books jobs', 'Qualifies urgency', 'Dispatch handoff'],
  },
  {
    key: 'real-estate',
    contextLabel: 'Real Estate',
    blurb: 'Answers listing enquiries instantly, books showings, and keeps leads out of voicemail.',
    chips: ['Listing enquiries', 'Books showings', 'Lead capture'],
  },
  {
    key: 'dental',
    contextLabel: 'Dental',
    blurb: 'Fills the schedule, confirms visits, and answers the questions that tie up your front desk.',
    chips: ['Books appointments', 'Confirms visits', 'Cuts no-shows'],
  },
  {
    key: 'veterinary',
    contextLabel: 'Veterinary',
    blurb: 'Books visits, answers common pet-owner questions, and flags urgent cases for your team.',
    chips: ['Books visits', 'Owner questions', 'Urgent triage'],
  },
  {
    key: 'restaurants',
    contextLabel: 'Restaurants',
    blurb: 'Takes reservations and answers the basics so the phone stops pulling staff off the floor.',
    chips: ['Takes reservations', 'Hours & menu', 'Large bookings'],
  },
  {
    key: 'telecom',
    contextLabel: 'Telecommunications',
    blurb: 'Handles support and provisioning questions at volume, and routes technical cases to your engineers.',
    chips: ['Support questions', 'High call volume', 'Technical routing'],
  },
];

const byKey = new Map(verticalAgents.map((agent) => [agent.key, agent]));

/** Vertical keys the server will accept. Anything else uses the default agent. */
export const verticalAgentKeys = verticalAgents.map((agent) => agent.key);

/**
 * Route slugs (voice-ai-* pages and /industries/* entries) mapped to a vertical
 * key. Anything absent here falls back to the generic profile.
 */
const slugToVerticalKey: Record<string, string> = {
  // voice-ai-* landing pages
  'voice-ai-for-healthcare-page': 'healthcare',
  'voice-ai-for-legal-services': 'legal',
  'voice-ai-for-insurance-page': 'insurance',
  'voice-ai-for-home-services-page': 'home-services',
  'voice-ai-real-estate': 'real-estate',
  'voice-ai-for-dental-offices': 'dental',
  'voice-ai-veterinary-clinics': 'veterinary',
  'for-restaurant-page': 'restaurants',
  'voice-ai-for-telecommunication': 'telecom',
  // /industries/* entries
  healthcare: 'healthcare',
  'law-firms': 'legal',
  'financial-services': 'financial-services',
  retail: 'retail',
  'hotels-hospitality': 'hospitality',
  education: 'education',
  government: 'government',
  insurance: 'insurance',
  'real-estate': 'real-estate',
  dental: 'dental',
  restaurants: 'restaurants',
  'home-services': 'home-services',
};

/** Resolve the agent shown on a page from its route slug. */
export function getVerticalAgentForSlug(slug: string, fallbackLabel: string): VerticalAgent {
  return getVerticalAgent(slugToVerticalKey[slug], fallbackLabel);
}

/**
 * Look up a vertical agent, falling back to a generic profile built from the
 * page's own label so every industry page can show the card.
 */
export function getVerticalAgent(key: string | undefined, fallbackLabel: string): VerticalAgent {
  const found = key ? byKey.get(key) : undefined;
  if (found) return found;

  return {
    key: key ?? 'general',
    contextLabel: fallbackLabel,
    blurb: `Answers questions, books appointments, and routes callers to the right person, tuned to how ${fallbackLabel.toLowerCase()} teams actually work.`,
    chips: ['Answers questions', 'Books appointments', 'Routes callers'],
  };
}
