import type { Metadata } from 'next';
import Link from 'next/link';
import IntegrationsHub from '@/components/home/IntegrationsHub';
import CTASection from '@/components/sections/CTASection';
import { integrations, type Integration } from '@/lib/integrations';
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from '@/lib/seo';

const DESCRIPTION =
  'Connect UponAI voice agents to your phone system, CRM, calendar, helpdesk and payment tools. Book, update records, open tickets and take payments mid-call.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Integrations',
  description: DESCRIPTION,
  path: '/integrations',
});

// Brand colours in integrations.ts were picked for the hub's dark tiles (some
// are near white), so the directory draws them on the same dark tile in both
// themes.
const TILE_BG = 'linear-gradient(160deg, #22406c, #0d1c3a)';

// The directory groups the same brands the hub section draws, by what the
// agent does with them on a call. Anything not listed here lands in "More".
const categories: { title: string; body: string; names: string[] }[] = [
  {
    title: 'Automation & Workflows',
    body: 'n8n is the bridge to every tool below. Zapier and Make work too if your team already runs on them.',
    names: ['n8n', 'Zapier', 'Make'],
  },
  {
    title: 'CRM & Sales',
    body: 'Capture lead details on the call and push clean records into the pipeline your team already works.',
    names: ['GoHighLevel', 'HubSpot', 'Salesforce', 'Pipedrive', 'Zoho', 'Airtable'],
  },
  {
    title: 'Calendars & Meetings',
    body: 'Check availability and book, move or cancel appointments while the caller is still on the line.',
    names: ['Google Calendar', 'Calendly', 'Outlook', 'Google Meet', 'Zoom', 'Microsoft Teams'],
  },
  {
    title: 'Support & Helpdesk',
    body: 'Open and update tickets with the full transcript attached, so nobody asks the caller to repeat themselves.',
    names: ['Zendesk', 'Freshdesk', 'Intercom', 'ServiceNow', 'Jira'],
  },
  {
    title: 'Telephony & Messaging',
    body: 'Run agents on the numbers and carriers you already have, and follow up by text or chat after the call.',
    names: ['Twilio', 'RingCentral', 'Aircall', 'WhatsApp', 'Messenger', 'Slack', 'Gmail'],
  },
  {
    title: 'Payments & Commerce',
    body: 'Look up orders, send payment links and record transactions without handing the caller off.',
    names: ['Stripe', 'Square', 'PayPal', 'Shopify', 'WooCommerce', 'QuickBooks', 'Xero'],
  },
];

const connectionMethods = [
  {
    eyebrow: 'Phone system',
    title: 'Keep your numbers and your carrier',
    body: 'Agents answer and place calls over Twilio, Telnyx, Vonage or any SIP trunk, and warm transfer to your team when a human should take over. Contact center ready for Five9, Genesys, Avaya and Amazon Connect.',
    href: '/sip-integrations-and-transfers-685191',
    linkLabel: 'SIP integration & call transfer',
  },
  {
    eyebrow: 'Mid-call actions',
    title: 'Agents that do the work, not just talk',
    body: 'Custom functions let an agent call your APIs during the conversation: check a calendar, look up an account, create a ticket or update a CRM record, then tell the caller what happened.',
    href: 'https://documentation.uponai.com/',
    linkLabel: 'Read the documentation',
    external: true,
  },
  {
    eyebrow: 'Powered by n8n',
    title: '1,700+ apps through n8n',
    body: 'UponAI connects to n8n, and n8n connects to over 1,700 apps. Agents trigger n8n workflows during or after a call, passing the transcript, recording and post-call analysis to any tool in its library. Start from our ready-made templates.',
    href: '/n8n-downloads',
    linkLabel: 'Get the n8n templates',
  },
];

const faqs = [
  {
    question: 'Which tools does UponAI integrate with?',
    answer:
      'UponAI connects to n8n, and through n8n to its library of over 1,700 apps: the CRM, calendar, helpdesk, messaging and payment tools most teams run on. If a tool has an API but no n8n node, an agent can still call it mid-conversation through a custom function.',
  },
  {
    question: 'Do we have to change phone providers?',
    answer:
      'No. Agents run on your existing numbers over Twilio, Telnyx, Vonage or any SIP trunk, and can transfer callers to your team on the same lines.',
  },
  {
    question: 'Can the agent update our CRM during the call?',
    answer:
      'Yes. Lead details captured in the conversation can be written to your CRM during the call or right after it, so records are complete before anyone follows up.',
  },
  {
    question: 'What if a tool we use is not listed?',
    answer:
      'Book a demo and tell us what you run. Most gaps are closed with a custom function or an automation workflow rather than a custom build.',
  },
];

const byName = new Map(integrations.map((item) => [item.name, item]));
const categorized = new Set(categories.flatMap((group) => group.names));
const directory = [
  ...categories.map((group) => ({
    ...group,
    items: group.names.map((name) => byName.get(name)).filter((item): item is Integration => !!item),
  })),
  {
    title: 'More',
    body: 'Docs, storage, forms, project management and the rest of the stack.',
    items: integrations.filter((item) => !categorized.has(item.name)),
  },
].filter((group) => group.items.length);

function BrandMark({ item }: { item: Integration }) {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundImage: TILE_BG }}
    >
      {item.path ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill={item.color} aria-hidden>
          <path d={item.path} />
        </svg>
      ) : (
        <span className="text-sm font-bold leading-none tracking-tight" style={{ color: item.color }}>
          {item.mark}
        </span>
      )}
    </span>
  );
}

export default function IntegrationsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Integrations', path: '/integrations' },
  ]);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pb-20 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-8 h-56 w-56 rounded-full bg-[#1e78cc]/16 blur-3xl" />
          <div className="absolute right-[12%] top-24 h-72 w-72 rounded-full bg-[#63ade5]/14 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <span aria-current="page" className="theme-heading">
              Integrations
            </span>
          </nav>

          <div className="max-w-4xl">
            <div className="theme-pill-primary inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#1e78cc] shadow-[0_0_16px_rgba(30,120,204,0.75)]" />
              Integrations
            </div>

            <h1 className="theme-heading mt-7 max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
              Plugs Into
              <span className="block text-[#1e78cc]">The Stack You Already Run</span>
            </h1>

            <p className="theme-body mt-7 max-w-3xl text-lg leading-8 md:text-xl">
              UponAI agents book appointments, update the CRM, open tickets and take payments while the
              caller is still on the line, on the phone system you already have and across 1,700+ apps
              through n8n.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {connectionMethods.map((method) => (
            <div key={method.title} className="theme-card flex flex-col rounded-[1.75rem] p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                {method.eyebrow}
              </p>
              <h2 className="theme-heading mt-3 text-2xl font-bold">{method.title}</h2>
              <p className="theme-body mt-3 flex-1 text-base leading-7">{method.body}</p>
              {method.external ? (
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-link-muted mt-6 text-sm font-semibold"
                >
                  {method.linkLabel} <span aria-hidden>→</span>
                </a>
              ) : (
                <Link href={method.href} className="theme-link-muted mt-6 text-sm font-semibold">
                  {method.linkLabel} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                Directory
              </p>
              <h2 className="theme-heading mt-3 text-3xl font-bold md:text-5xl">
                What your agent can reach.
              </h2>
            </div>
            <p className="theme-soft max-w-2xl text-base leading-7">
              A sample of the most requested tools, reachable through n8n. The full list is n8n&apos;s
              library of 1,700+ apps, and anything else with an API is a custom function away.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {directory.map((group) => (
              <div key={group.title} className="theme-card rounded-[1.75rem] p-7">
                <h3 className="theme-heading text-xl font-bold">{group.title}</h3>
                <p className="theme-body mt-2 text-sm leading-6">{group.body}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex min-w-0 items-center gap-3">
                      <BrandMark item={item} />
                      <span className="theme-heading text-sm font-medium">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntegrationsHub />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="theme-heading text-3xl font-bold md:text-4xl">Integration questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="theme-card group rounded-[1.25rem] p-6">
                <summary className="theme-heading flex cursor-pointer list-none items-center justify-between text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span aria-hidden className="theme-subtle ml-4 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="theme-body mt-3 text-base leading-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Using A Tool That Is Not Listed?"
        subheading="Book a demo, tell us what you run, and we will show you how the agent connects to it."
      />
    </>
  );
}
