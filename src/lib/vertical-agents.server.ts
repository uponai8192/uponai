import { verticalAgentKeys } from '@/lib/vertical-agents';

// Server-only map of vertical key to UponAI agent id.
//
// These are the demo showcase agents in the UponAI workspace. An env var of the
// form UPONAI_AGENT_ID_<KEY> overrides its entry, so a staging environment can
// point a vertical at a different agent without a code change.
//
// Import this module from server code only (currently just the create-web-call
// route handler) so the ids stay out of the browser bundle. They are
// identifiers rather than credentials - a call also needs UPONAI_API_KEY, which
// stays server-side - but there is no reason to ship them to visitors.
const verticalAgentIds: Record<string, string> = {
  healthcare: 'agent_12331b2178f004579a99eb30d5',
  education: 'agent_33d88e13f97f58345e7f32efdb',
  'financial-services': 'agent_120b15af2630d3d53a04cc6ce4',
  government: 'agent_269d094f1446fdc3e7e111c0ec',
  hospitality: 'agent_675fce135e35049f4afb4bb9fa',
  legal: 'agent_35b937c6441ad88ae35488f477',
  retail: 'agent_1842883056b6c05d6c929649c7',
};

/**
 * Resolve which agent answers a call.
 *
 * The client only ever sends a vertical key, never an agent id, and the key
 * must be one we published, so a caller cannot point the widget at an arbitrary
 * agent. Resolution order: env override, then the configured demo agent, then
 * the default website agent.
 */
export function resolveAgentId(vertical?: string): string | undefined {
  const key = vertical?.trim();

  if (key && verticalAgentKeys.includes(key)) {
    const envName = `UPONAI_AGENT_ID_${key.toUpperCase().replace(/-/g, '_')}`;
    const override = process.env[envName]?.trim();
    if (override) return override;

    const configured = verticalAgentIds[key];
    if (configured) return configured;
  }

  return process.env.UPONAI_AGENT_ID;
}
