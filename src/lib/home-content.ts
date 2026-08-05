// Homepage copy, lifted out of the section components so it can come from
// the CMS (docs/cms-migration-spike.md). The defaults below are the exact
// strings the components used to hold inline; each component accepts an
// optional content prop that falls back to these, so the live homepage
// renders identically whether or not a CMS document exists.
//
// Decorative data stays in the components: the hero console animation, the
// agent avatar row, and the capability visuals are design, not copy.

export type HomeHeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  lede: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  footnoteStrong: string;
  footnoteRest: string;
};

export type HomeSocialProofContent = {
  lead: string;
  leadHighlight: string;
};

export type HomeOldWayContent = {
  badge: string;
  heading: string;
  systems: { icon: string; label: string; tag: string }[];
  problems: { title: string; body: string }[];
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

export type HomeAllFeaturesContent = {
  eyebrow: string;
  heading: string;
  sub: string;
  columns: { tag: string; title: string; items: string[] }[];
  ctaLabel: string;
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
  oldWay: HomeOldWayContent;
  intro: HomeIntroContent;
  capabilities: HomeCapabilitiesContent;
  allFeatures: HomeAllFeaturesContent;
  howItWorks: HomeHowItWorksContent;
  customerStories: HomeCustomerStoriesContent;
  finalCta: HomeFinalCtaContent;
};

export const defaultHomeHero: HomeHeroContent = {
  eyebrow: 'The AI Agent Platform for Enterprise',
  headline: 'Build AI agents once.',
  headlineAccent: 'Deploy them everywhere.',
  lede:
    'UponAI is the all-in-one platform for enterprise teams to train, test, and deploy AI agents across phone, chat, and web, augmenting your workforce with visibility, speed, and scale.',
  primaryCtaLabel: 'Get a demo →',
  secondaryCtaLabel: '▶ Watch 2-min overview',
  footnoteStrong: 'First agent live in 10 minutes',
  footnoteRest: ' · No-code builder · Works with your existing stack',
};

export const defaultHomeSocialProof: HomeSocialProofContent = {
  lead: 'Trusted by support and operations teams building their front line on',
  leadHighlight: 'UponAI',
};

export const defaultHomeOldWay: HomeOldWayContent = {
  badge: 'The old way',
  heading: 'Your channels do not talk. Neither does your data.',
  systems: [
    { icon: '☎', label: 'Phone system', tag: 'siloed' },
    { icon: '💬', label: 'Web chat vendor', tag: 'separate' },
    { icon: '📱', label: 'WhatsApp', tag: 'unmanaged' },
    { icon: '📊', label: 'Reporting', tag: 'manual' },
  ],
  problems: [
    {
      title: 'Every channel is a separate build',
      body: 'You rebuild the same logic three times, once for the phone line, once for web chat, once for messaging. Every change means shipping it everywhere, again.',
    },
    {
      title: 'No visibility into what is actually happening',
      body: 'Conversations end and the insight leaves with them. No transcripts, no trends, no way to see where customers drop off or which requests keep coming back.',
    },
  ],
};

export const defaultHomeIntro: HomeIntroContent = {
  eyebrow: 'Introducing the new way · AI Agent Platform',
  headingStart: 'One platform.',
  headingAccent: 'Every channel.',
  headingEnd: 'Full visibility.',
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

export const defaultHomeAllFeatures: HomeAllFeaturesContent = {
  eyebrow: 'All Features',
  heading: 'The full platform, at a glance',
  sub: 'Everything included across building, deploying, and measuring your AI agents.',
  columns: [
    {
      tag: 'Build',
      title: 'Train and test',
      items: [
        'Simple training interface',
        'Multiple test playgrounds (sandbox)',
        'Integrations',
        'Version history and rollback',
        'First version in 10 minutes',
      ],
    },
    {
      tag: 'Deploy',
      title: 'Launch anywhere',
      items: [
        'No-code builder',
        'Multi-channel: phone, chat, web, WhatsApp',
        'Custom branding (logo, domain, number)',
        '100% mobile support',
        'Human handoff and routing rules',
      ],
    },
    {
      tag: 'Intelligence',
      title: 'Measure and improve',
      items: [
        'Transcribed call transcripts',
        'Real-time insights and reporting',
        'Multi-step complex workflows',
        'Auto lead generation',
        'CRM sync',
      ],
    },
  ],
  ctaLabel: 'Explore all features →',
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
  ctaLabel: 'Build your first agent →',
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
  oldWay: defaultHomeOldWay,
  intro: defaultHomeIntro,
  capabilities: defaultHomeCapabilities,
  allFeatures: defaultHomeAllFeatures,
  howItWorks: defaultHomeHowItWorks,
  customerStories: defaultHomeCustomerStories,
  finalCta: defaultHomeFinalCta,
};
