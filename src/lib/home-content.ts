// Homepage copy, lifted out of the section components so it can come from
// the CMS (docs/cms-migration-spike.md). The defaults below are the exact
// strings the components used to hold inline; each component accepts an
// optional content prop that falls back to these, so the live homepage
// renders identically whether or not a CMS document exists.
//
// Decorative data stays in the components: the hero console animation, the
// agent avatar row, and the capability visuals are design, not copy.

export type HomeHeroContent = {
  /** First half of the tagline, rendered in the heading colour. */
  headline: string;
  /** Second half, rendered in the brand gradient, inline with the first. */
  headlineAccent: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  footnoteStrong: string;
  footnoteRest: string;
};

export type HomeSocialProofContent = {
  lead: string;
  leadHighlight: string;
};

export type HomeSolutionsContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  /** Small label above every card title. Shared, since all cards use the same word. */
  itemKicker: string;
  /** Link label on every card. Shared for the same reason. */
  ctaLabel: string;
  items: { title: string; body: string; href: string }[];
};

export type HomeIntroContent = {
  eyebrow: string;
  headingStart: string;
  headingAccent: string;
  headingEnd: string;
  ledeStart: string;
  ledeBold1: string;
  ledeMiddle: string;
  ledeBold2: string;
  ledeEnd: string;
  stats: { value: string; label: string }[];
};

export type HomeCapabilitiesContent = {
  eyebrow: string;
  heading: string;
  sub: string;
  items: { kicker: string; title: string; lede: string; benefit: string; features: string[] }[];
};

export type HomeHowItWorksContent = {
  eyebrow: string;
  heading: string;
  sub: string;
  steps: { title: string; body: string; time: string }[];
  ctaLabel: string;
};

export type HomeCustomerStoriesContent = {
  eyebrow: string;
  heading: string;
  /** avatarUrl is set when a photo has been uploaded in the CMS. */
  stories: { quote: string; name: string; role: string; avatarUrl?: string }[];
  ctaLabel: string;
};

export type HomeFaqContent = {
  eyebrow: string;
  heading: string;
  items: { question: string; answer: string }[];
};

export type HomeFinalCtaContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type HomePageContent = {
  hero: HomeHeroContent;
  socialProof: HomeSocialProofContent;
  solutions: HomeSolutionsContent;
  intro: HomeIntroContent;
  capabilities: HomeCapabilitiesContent;
  howItWorks: HomeHowItWorksContent;
  customerStories: HomeCustomerStoriesContent;
  faq: HomeFaqContent;
  finalCta: HomeFinalCtaContent;
};

export const defaultHomeHero: HomeHeroContent = {
  headline: 'Build or Sell',
  headlineAccent: 'AI Voice Agents.',
  primaryCtaLabel: 'Get a demo →',
  secondaryCtaLabel: '▶ Watch 2-min overview',
  footnoteStrong: 'First agent live in 10 minutes',
  footnoteRest: ' · No-code builder · Works with your existing stack',
};

export const defaultHomeSocialProof: HomeSocialProofContent = {
  lead: 'Trusted by support and operations teams building their front line on',
  leadHighlight: 'UponAI',
};

export const defaultHomeSolutions: HomeSolutionsContent = {
  eyebrow: 'What UponAI builds',
  heading: 'AI voice products shaped around how calls actually move.',
  lede: 'Not a phone company with AI layered on top. Every product is positioned around conversational logic and how those workflows connect to real business operations.',
  itemKicker: 'Solution',
  ctaLabel: 'Explore →',
  items: [
    {
      title: 'AI voice systems',
      body: 'Branded voice experiences that greet callers, qualify intent, answer common questions, and route live conversations cleanly.',
      href: '/services/ivr-system',
    },
    {
      title: 'AI chatbots',
      body: 'Capture website demand instantly with conversational flows that mirror your call logic and move visitors toward the right next step.',
      href: '/services/ai-chatbots',
    },
    {
      title: 'UCaaS integrations',
      body: 'Connect AI call experiences with telecom infrastructure, routing rules, transfer logic, and reporting without operational sprawl.',
      href: '/voice-ai-for-telecommunication',
    },
    {
      title: 'Call overflow automation',
      body: 'Keep inbound opportunities moving during surges, after-hours periods, and missed-call windows instead of sending prospects to dead ends.',
      href: '/ai-voice-for-answering-service-replacement',
    },
  ],
};

export const defaultHomeIntro: HomeIntroContent = {
  eyebrow: 'Introducing the new way · AI Agent Platform',
  headingStart: 'One Platform.',
  headingAccent: 'Every Channel.',
  headingEnd: 'Full Control',
  ledeStart: 'Build and deploy AI agents across ',
  ledeBold1: 'phone, chat, and web',
  ledeMiddle: ' to augment your workforce with ',
  ledeBold2: 'visibility, speed, and scale',
  ledeEnd: ', trained once, live everywhere, measured in real time.',
  stats: [
    { value: '10 min', label: 'To your first working agent' },
    { value: '1 build', label: 'Deployed across every channel' },
    { value: 'Every', label: 'Conversation captured and analyzed' },
  ],
};

export const defaultHomeCapabilities: HomeCapabilitiesContent = {
  eyebrow: 'Capabilities',
  heading: 'Everything you need to run AI agents in production',
  sub: 'Three capabilities that take you from first prototype to a measured, multi-channel workforce.',
  items: [
    {
      kicker: 'Capability 01 · Build',
      title: 'An all-in-one AI voice platform',
      lede: 'Train, test, and deploy from a single place. A simple training interface and sandbox playgrounds let your team ship a working agent without waiting on engineering.',
      benefit: 'your first version is live in 10 minutes, not a quarter-long integration project.',
      features: [
        'Simple training interface',
        'Multiple test playgrounds (sandbox)',
        'Integrations with your existing stack',
      ],
    },
    {
      kicker: 'Capability 02 · Deploy',
      title: 'Train once, deploy everywhere',
      lede: 'The same AI agent handles phone calls, website chat, WhatsApp, and more, under your own branding, on your own domain and numbers, fully mobile.',
      benefit: 'one agent to maintain instead of three, every improvement ships to every channel at once.',
      features: [
        'No-code builder',
        'Multi-channel: phone, chat, web, WhatsApp',
        'Custom branding: logo, domain, phone number',
        '100% mobile support',
      ],
    },
    {
      kicker: 'Capability 03 · Intelligence',
      title: 'AI intelligence into your customer service',
      lede: 'Every conversation is transcribed, analyzed, and turned into insight, so you get real-time intelligence about your operations instead of a black box.',
      benefit: 'you finally see what customers ask for, where they drop off, and which leads you would have missed.',
      features: [
        'Transcribed call transcripts and insights',
        'Multi-step complex workflows',
        'Automatic lead generation',
      ],
    },
  ],
};

export const defaultHomeHowItWorks: HomeHowItWorksContent = {
  eyebrow: 'How it works',
  heading: 'How it works in 3 steps',
  sub: 'From knowledge base to a live, measured agent across every channel.',
  steps: [
    {
      title: 'Train',
      body: 'Point the agent at your knowledge base, scripts, and FAQs using the training interface. No code, no scripting language.',
      time: '~10 minutes',
    },
    {
      title: 'Deploy',
      body: 'Publish the same agent to phone, web chat, and WhatsApp under your own branding, numbers, and domain.',
      time: '1 click',
    },
    {
      title: 'Analyze',
      body: 'Watch transcripts, insights, and captured leads flow in real time, then retrain to improve.',
      time: 'Continuous',
    },
  ],
  ctaLabel: 'See how agents are built →',
};

export const defaultHomeCustomerStories: HomeCustomerStoriesContent = {
  eyebrow: 'Customer stories',
  heading: 'What our customers say about us',
  stories: [
    { quote: 'Customer story coming soon.', name: '[Customer name]', role: '[Title], [Company]' },
    { quote: 'Customer story coming soon.', name: '[Customer name]', role: '[Title], [Company]' },
    { quote: 'Customer story coming soon.', name: '[Customer name]', role: '[Title], [Company]' },
  ],
  ctaLabel: 'Read case studies →',
};

export const defaultHomeFaq: HomeFaqContent = {
  eyebrow: 'Answers',
  heading: 'Frequently asked questions.',
  items: [
    {
      question: 'What is UponAI?',
      answer:
        'UponAI is an AI voice company that builds phone and chat workflows: greeting, qualifying, routing, and escalating conversations so your team only steps in when a person is the better answer.',
    },
    {
      question: 'Is this just a chatbot?',
      answer:
        'No. UponAI runs voice and chat as one system with real routing logic, appointment and intake flows, overflow handling, and clean human handoff, not a scripted bot bolted onto a website.',
    },
    {
      question: 'Which industries do you support?',
      answer:
        'Healthcare, insurance, home services, real estate, dental, veterinary, restaurants, telecommunications, and legal, each shipped as a productized voice path rather than a generic template.',
    },
    {
      question: 'Can it integrate with our phone system and CRM?',
      answer:
        'Yes. UCaaS integrations connect AI call experiences to your telecom infrastructure, routing rules, and reporting, with CRM-ready lead capture so records stay clean.',
    },
    {
      question: 'What happens after hours or during call surges?',
      answer:
        'Call overflow automation keeps inbound opportunities moving during surges, after-hours periods, and missed-call windows instead of sending prospects to dead ends.',
    },
    {
      question: 'How do I see it in action?',
      answer:
        'Book a demo and talk to Grace, an AI voice agent built on UponAI. She answers questions, books appointments, and transfers to a live team when it matters.',
    },
  ],
};

export const defaultHomeFinalCta: HomeFinalCtaContent = {
  eyebrow: 'Get started',
  heading: 'Build and deploy AI agents across every channel, in minutes, not quarters.',
  lede: 'See how UponAI trains once, deploys everywhere, and gives you real-time visibility into every customer conversation.',
  primaryCtaLabel: 'Get a demo →',
  secondaryCtaLabel: 'Talk to sales',
};

export const defaultHomePageContent: HomePageContent = {
  hero: defaultHomeHero,
  socialProof: defaultHomeSocialProof,
  solutions: defaultHomeSolutions,
  intro: defaultHomeIntro,
  capabilities: defaultHomeCapabilities,
  howItWorks: defaultHomeHowItWorks,
  customerStories: defaultHomeCustomerStories,
  faq: defaultHomeFaq,
  finalCta: defaultHomeFinalCta,
};
