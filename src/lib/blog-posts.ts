import importedBlogPosts from './imported-blog-posts.json';

export type UponAIBlogTopic = {
  description: string;
  slug: string;
  title: string;
};

export type UponAIBlogRelatedPage = {
  label: string;
  path: string;
};

export type UponAIBlogPost = {
  aliases?: string[];
  author: string;
  body: string[];
  category: string;
  excerpt: string;
  htmlBody?: string;
  imageUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  relatedPages: UponAIBlogRelatedPage[];
  slug: string;
  tags?: string[];
  title: string;
  topicSlugs: string[];
};

export const BLOG_POSTS_PER_PAGE = 12;

// Local blog library built from the public UponAI blog plus imported legacy preview posts.
// The token in this repo does not currently have blog-read scopes, so this snapshot keeps
// the site functional and indexable until a scoped token is added.
export const uponaiBlogTopics: UponAIBlogTopic[] = [
  {
    slug: 'ai-voice-operations',
    title: 'AI Voice Operations',
    description:
      'Articles about how AI voice systems hold up in live production, from call handling and routing logic to human escalation and workflow reliability.',
  },
  {
    slug: 'telecom-partnerships',
    title: 'Telecom Partnerships',
    description:
      'Coverage of MSPs, UCaaS partners, white-label providers, and telecom channel teams evaluating or deploying UponAI.',
  },
  {
    slug: 'business-continuity',
    title: 'Business Continuity',
    description:
      'Posts focused on missed calls, front-desk coverage, after-hours responsiveness, and the operational cost of broken inbound workflows.',
  },
  {
    slug: 'integration-strategy',
    title: 'Integration Strategy',
    description:
      'Guidance on fitting AI voice into the existing stack, from CRM handoff and call routing to platform flexibility and long-term rollout planning.',
  },
];

const manualUponAIBlogPosts: UponAIBlogPost[] = [
  {
    author: 'Bill McClain',
    body: [
      'Last week I shared that we signed three new SkySwitch partners and two new Viirtue, Inc. partners, and the response was immediate.',
      'This week, we added one more Viirtue, Inc. partner and one new White Label Communications LLC partner. That is momentum across multiple platforms and market segments, not just a single lane.',
      'Providers are choosing UponAI because they can hear what the platform actually delivers. SkySwitch, Viirtue, and White Label Communications all operate in different parts of the market, but the common thread is the same: they want telecom-grade AI voice workflows that solve real provider problems.',
      'The partner community is growing because we show up differently. UponAI is built by telecom people for telecom people, and that difference becomes obvious once teams see the workflow in action.',
      'If your platform or your partners have not experienced UponAI yet, this is the right time to take a closer look.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'New SkySwitch, Viirtue, and White Label Communications partners are choosing UponAI because they can hear the operational difference.',
    imageUrl:
      'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69e63acfcc4d90735ee15041.jpeg',
    publishedAt: '2026-04-20T14:40:40.000Z',
    readTimeMinutes: 0.7,
    relatedPages: [
      { label: 'AI Voice For Telecommunications', path: '/voice-ai-for-telecommunication' },
      { label: 'Book a Demo', path: 'https://uponai.ai/uponai-booking-page' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081-8240-1812-6926-8960-8950-4686-7032-9142-8747-7035-3778-3763',
    title: 'More telecom partners are choosing UponAI',
    topicSlugs: ['telecom-partnerships', 'ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'The MSPs winning with AI voice agents are usually not the most technical people in the room. They are the ones who can walk into a messy workflow, identify the real cost of the problem, and stay focused on the business case instead of the novelty.',
      'They start with pain, not the pitch. Most SMB owners are not waking up asking for an AI voice agent. They are worrying about missed calls, repetitive interruptions, dropped appointments, and frustrated customers.',
      'They also quantify the problem. What percentage of calls go unanswered? What is one missed appointment actually worth? How much is the business paying an answering service just to take a message and promise a callback later?',
      'If a customer is paying human-per-minute answering costs just to collect basic details, a voice AI agent can capture intent, log the conversation, answer FAQs, book the appointment, and close the loop for less while improving speed and consistency.',
      'That is why the best MSPs sell the outcome instead of the AI itself. Faster answered calls, recovered revenue after hours, better staff focus, and lower servicing cost are the real product. The AI is simply how it gets delivered.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'The MSPs closing AI voice deals do not start with the tech. They start with missed calls, lost appointments, and the cost of broken phone workflows.',
    imageUrl:
      'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69e63a39774ef96b9bbc0e4e.jpeg',
    publishedAt: '2026-04-20T14:38:00.000Z',
    readTimeMinutes: 1.3,
    relatedPages: [
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
      { label: 'AI Voice For Telecommunications', path: '/voice-ai-for-telecommunication' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081-8240-1812-6926-8960-8950-4686-7032-9142-8747-7035-3778',
    title: 'How MSPs are actually winning with AI voice agents',
    topicSlugs: ['telecom-partnerships', 'business-continuity'],
  },
  {
    author: 'Bill McClain',
    body: [
      'After the introductions, we walked a white-label UCaaS provider through the UponAI vision: a platform built by telecom experts and shaped around the infrastructure and operational realities that carriers and MSPs actually live in every day.',
      'Then we opened the dashboard. About ten minutes into the demo, he stopped the conversation and said, "It\'s like night and day."',
      'When we pressed on that reaction, he explained that his current AI provider had nothing close to what he had just seen. The gap was not subtle, and it was not theoretical.',
      'By the end of the meeting, the conversation had moved past whether he should sign up. He was asking how to get started and made it clear the cost was not the blocker.',
      'That is the real takeaway for MSPs and channel partners evaluating AI voice right now: just because a UCaaS provider has an AI voice product does not mean it is a real solution. Too often it is a checkbox feature. UponAI was built from the ground up by people who have lived in telecom for decades, and that difference shows up immediately in the workflow.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'A white-label UCaaS provider saw the UponAI demo and immediately recognized the difference between a checkbox AI feature and a real telecom-grade solution.',
    imageUrl:
      'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69e638b6ed4bb7f4ed3005c9.jpeg',
    publishedAt: '2026-04-20T14:36:30.000Z',
    readTimeMinutes: 1.0,
    relatedPages: [
      { label: 'AI Voice For Telecommunications', path: '/voice-ai-for-telecommunication' },
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081-8240-1812-6926-8960-8950-4686-7032-9142-8747-7035',
    title: 'A UCaaS provider saw the UponAI demo and said, "It\'s like night and day."',
    topicSlugs: ['telecom-partnerships', 'ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'Last week, we signed three new SkySwitch partners.',
      'Then we added two new Viirtue, Inc. partners.',
      'That kind of momentum happens because partners are hearing and seeing the difference in how UponAI performs for real telecom teams.',
      'The pattern is straightforward: when providers get a closer look at the workflow, they understand why the platform is gaining traction so quickly.',
      'If you want to see what is driving that response, book a call and experience what sets UponAI apart.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'Partner momentum is building because telecom teams can hear the difference in how UponAI handles AI voice workflows.',
    imageUrl: '/brand-photos/ai-voice-mic.jpeg',
    publishedAt: '2026-04-20T14:30:09.000Z',
    readTimeMinutes: 0.3,
    relatedPages: [
      { label: 'AI Voice For Telecommunications', path: '/voice-ai-for-telecommunication' },
      { label: 'Book a Demo', path: 'https://uponai.ai/uponai-booking-page' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081-8240-1812-6926-8960-8950-4686-7032-9142-8747',
    title: 'UponAI momentum is accelerating across telecom partners',
    topicSlugs: ['telecom-partnerships'],
  },
  {
    author: 'Bill McClain',
    body: [
      'Most AI voice products sound polished in a demo, but production environments expose the real gaps fast. Once calls involve real customers, scheduling edge cases, routing logic, CRM handoff requirements, and after-hours expectations, brittle workflows become obvious.',
      'UponAI is built around live operations instead of a single scripted moment. That means the system has to answer with useful context, follow business rules, handle repetitive demand without sounding robotic, and escalate to a human only when the situation truly calls for it.',
      'For teams evaluating voice AI, the real question is not whether the system can answer a call. It is whether the workflow still holds up under real call volume, real objections, and real business conditions. That is the standard UponAI is designed around.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'Why telecom and operations teams are moving away from demo-friendly voice AI products and choosing systems that hold up in production.',
    imageUrl: 'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69dcceddf41f6d9228840490.jpeg',
    publishedAt: '2026-04-13T11:11:05.000Z',
    readTimeMinutes: 1,
    relatedPages: [
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
      { label: 'AI Voice For Healthcare', path: '/voice-ai-for-healthcare-page' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081-8240',
    title: 'Why most AI voice platforms break once they hit production',
    topicSlugs: ['ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'When a front-desk employee quits, most businesses do not have the luxury of waiting through a long software evaluation cycle. They need coverage immediately, especially if calls drive appointments, revenue, and customer confidence.',
      'That is where AI voice has to prove it can do more than look impressive. The workflow has to capture intent, answer common questions, route the right calls, and keep the business reachable while the team regains stability.',
      'UponAI focuses on that practical gap. The goal is not to replace planning with hype. It is to give businesses a responsive first-contact layer when the alternative is voicemail, missed calls, and operational drag.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'How AI voice helps businesses recover call coverage fast when a front-desk role disappears and missed calls start hurting revenue.',
    imageUrl: 'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69dccda5eda1703f8764aa6b.jpeg',
    publishedAt: '2026-04-13T11:02:31.000Z',
    readTimeMinutes: 1.3,
    relatedPages: [
      { label: 'Contact Us', path: '/contact-us-page' },
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781-9081',
    title: 'A receptionist quit. The business needed AI voice coverage immediately.',
    topicSlugs: ['business-continuity', 'ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'Many vendors push businesses toward a single AI stack and frame flexibility as a weakness. In practice, operations are rarely that simple. Teams often need to connect call routing, CRM workflows, messaging, reporting, and AI layers across more than one platform.',
      'UponAI is designed to fit into that environment rather than forcing the customer into an artificial all-in decision too early. The point is to support the workflow that already matters, not to create a migration project for its own sake.',
      'That makes integration strategy a practical advantage. Businesses can keep the tools that already work, improve the first-contact experience, and still evolve their AI layer over time without repainting the entire operating model.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'Why businesses get better long-term results when AI voice fits into the tools they already use instead of forcing a single-stack decision.',
    imageUrl: 'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69dccbc41024797b2ba962de.jpeg',
    publishedAt: '2026-04-13T10:56:32.000Z',
    readTimeMinutes: 1.1,
    relatedPages: [
      { label: 'AI Chatbots', path: '/services/ai-chatbots' },
      { label: 'IVR System', path: '/services/ivr-system' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568-5781',
    title: 'Why locking into one AI stack is usually the wrong move',
    topicSlugs: ['integration-strategy', 'ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'Home services businesses often think about revenue leakage in terms of missed jobs or weak follow-up, but the problem usually starts earlier. Calls come in when the office is busy, after hours, or during dispatch pressure, and too many of them fail to become clean next steps.',
      'For HVAC companies in particular, every missed inquiry can mean a lost booking, a delayed estimate, or a service opportunity that goes to a competitor with a faster response path. The phone workflow matters more than many teams realize.',
      'Voice AI helps close that gap by keeping the first interaction active. Instead of sending routine demand into voicemail or callback limbo, the business can capture intent, answer common questions, and preserve job opportunities while the live team focuses on active work.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'A practical look at how HVAC companies lose booked work when calls go unanswered, follow-up slows down, and after-hours demand disappears.',
    imageUrl: 'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69d4eff1ef6a58e99d9afe7c.webp',
    publishedAt: '2026-04-07T11:52:33.000Z',
    readTimeMinutes: 1.7,
    relatedPages: [
      { label: 'AI Voice For Home Services', path: '/voice-ai-for-home-services-page' },
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756-9568',
    title: 'How HVAC businesses lose revenue through broken call handling',
    topicSlugs: ['business-continuity', 'ai-voice-operations'],
  },
  {
    author: 'Bill McClain',
    body: [
      'AI and VoIP are changing together, and that matters because communications infrastructure is no longer separate from customer experience design. Businesses now expect routing, automation, qualification, and follow-up to work as one operating layer.',
      'The most important updates are rarely about novelty alone. They are about which tools are becoming reliable enough to use in production, which integrations reduce friction, and which workflows are starting to outperform manual handling at scale.',
      'That is why teams watching this space need more than trend headlines. They need to understand which developments actually improve responsiveness, reduce missed demand, and create a better conversation flow for customers and staff.',
    ],
    category: 'UponAI Solutions & Features',
    excerpt:
      'A short roundup of the AI and VoIP developments that actually matter for routing, automation, and customer communication workflows.',
    imageUrl: 'https://assets.cdn.filesafe.space/2Z5oHdwWBos6RIXwgZot/media/69d4ee7cebf1a60843f73cac.jpeg',
    publishedAt: '2026-04-07T11:46:15.000Z',
    readTimeMinutes: 0.8,
    relatedPages: [
      { label: 'AI Voice Agents', path: '/services/ai-voice-agents' },
      { label: 'IVR System', path: '/services/ivr-system' },
    ],
    slug: 'new-blog-post-2790-9107-1733-5871-8734-7108-7407-1404-8356-4011-1478-5079-1027-3530-2260-7595-9925-8540-2943-1832-4961-2022-5333-2308-4929-9134-3756',
    title: 'This week in AI and VoIP: 3 updates worth watching',
    topicSlugs: ['integration-strategy', 'ai-voice-operations'],
  },
];

export const uponaiBlogPosts: UponAIBlogPost[] = [
  ...manualUponAIBlogPosts,
  ...(importedBlogPosts as UponAIBlogPost[]),
].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

export function getUponAIBlogPost(slug: string) {
  return uponaiBlogPosts.find((post) => post.slug === slug || post.aliases?.includes(slug));
}

export function getUponAIBlogTopic(slug: string) {
  return uponaiBlogTopics.find((topic) => topic.slug === slug);
}

export function getUponAIBlogPostsByTopic(slug: string) {
  return uponaiBlogPosts.filter((post) => post.topicSlugs.includes(slug));
}

export function normalizeBlogPageNumber(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(rawValue ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateBlogPosts(posts: UponAIBlogPost[], page: number, pageSize = BLOG_POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    currentPage,
    items: posts.slice(startIndex, startIndex + pageSize),
    pageSize,
    totalItems: posts.length,
    totalPages,
  };
}
