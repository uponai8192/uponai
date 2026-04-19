export type UponAIMenuLink = {
  label: string;
  href: string;
};

export type UponAISection = {
  title: string;
  body: string;
};

export type UponAIFAQ = {
  question: string;
  answer: string;
};

export type UponAIPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  highlights: string[];
  sections: UponAISection[];
  faqs?: UponAIFAQ[];
  image: string;
  imageAlt: string;
  ctaHeading?: string;
  ctaSubheading?: string;
  aliasTo?: string;
};

export const uponaiServicesMenu: UponAIMenuLink[] = [
  { label: 'AI Powered Voice Systems', href: '/services/ivr-system' },
  { label: 'AI Powered Chatbots', href: '/services/ai-chatbots' },
];

export const uponaiIndustriesMenu: UponAIMenuLink[] = [
  { label: 'Healthcare', href: '/voice-ai-for-healthcare-page' },
  { label: 'Insurance', href: '/voice-ai-for-insurance-page' },
  { label: 'Home Services', href: '/voice-ai-for-home-services-page' },
  { label: 'Real Estate', href: '/voice-ai-real-estate' },
  { label: 'Veterinary Clinics', href: '/voice-ai-veterinary-clinics' },
  { label: 'Restaurants', href: '/for-restaurant-page' },
  { label: 'Telecommunications', href: '/voice-ai-for-telecommunication' },
  { label: 'Legal Services', href: '/voice-ai-for-legal-services' },
];

export const uponaiUseCasesMenu: UponAIMenuLink[] = [
  { label: 'Customer Support', href: '/customer-support-page' },
  { label: 'After Hours Support', href: '/hours-support-page' },
  { label: 'Booking & Scheduling', href: '/book-and-schedule-page' },
  { label: 'Outbound Sales', href: '/voice-ai-for-outbound-sales-page' },
];

export const uponaiResourcesMenu: UponAIMenuLink[] = [
  { label: 'Recordings', href: '/recordings-page' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Partners', href: '/partners' },
];

export const uponaiFooterInfo: UponAIMenuLink[] = [
  { label: 'Get Demo', href: '/get-a-demo-page' },
  { label: 'Privacy Policy', href: '/privacy-policy-page' },
  { label: 'Terms & Condition', href: '/terms-services-page' },
];

export const uponaiOfficeLocations = [
  'Montreal, QB',
  'New York, NY',
  'Vancouver, BC',
  'Toronto, ON',
  'Atlanta, GA',
  'Houston, TX',
  'West Palm Beach, FL',
  'Allentown, PA',
  'San Francisco, CA',
  'Chicago, IL',
  'Ottawa, ON',
];

export const uponaiPages: UponAIPage[] = [
  {
    slug: 'about-us-page',
    title: 'About UponAI',
    description: 'Learn how UponAI approaches AI voice, chat, and communications automation for modern businesses.',
    eyebrow: 'About Us',
    highlights: [
      'AI voice strategy grounded in real communications workflows',
      'Built for practical deployment, not just demos',
      'Focused on customer engagement, routing, and automation outcomes',
    ],
    sections: [
      {
        title: 'What We Build',
        body: 'UponAI designs AI voice agents, AI chatbots, and communications workflows that help businesses respond faster and handle more conversations without increasing operational complexity.',
      },
      {
        title: 'How We Work',
        body: 'We start with the customer journey, then map automation around your real inbound calls, support queues, booking flow, and lead response requirements.',
      },
      {
        title: 'Why It Matters',
        body: 'The goal is not novelty. It is better coverage, faster qualification, cleaner routing, and a better customer experience across every conversation channel.',
      },
    ],
    image: '/site-photos/team-meeting.jpg',
    imageAlt: 'UponAI team discussing AI workflow planning',
    ctaHeading: 'Want To See How UponAI Approaches Real Deployments?',
    ctaSubheading: 'Book a demo and we will walk through the automation opportunities inside your current customer journey.',
  },
  {
    slug: 'get-a-demo-page',
    title: 'Get a Demo',
    description: 'Book a demo to see how UponAI handles inbound calls, qualification, routing, and AI-driven engagement.',
    eyebrow: 'Get Started',
    highlights: [
      'See AI voice and chat workflows in action',
      'Review use cases tailored to your business',
      'Map a practical rollout path with the team',
    ],
    sections: [
      {
        title: 'Demo What Matters',
        body: 'We focus the demo on the workflows you actually care about, whether that is inbound sales, after-hours coverage, support intake, or scheduling.',
      },
      {
        title: 'Understand The Architecture',
        body: 'You will see how prompts, routing, handoffs, and business rules fit together so you can evaluate the full operational impact.',
      },
      {
        title: 'Plan Next Steps',
        body: 'The goal is to leave with clarity on what should be automated first, what data matters, and how to launch without introducing unnecessary complexity.',
      },
    ],
    image: '/ai-photos/test-call.png',
    imageAlt: 'UponAI live demo screen',
    ctaHeading: 'Ready To Explore An AI Voice Rollout?',
    ctaSubheading: 'Use the contact form to tell us what you want to automate and we will tailor the conversation.',
  },
  {
    slug: 'contact-us-page',
    title: 'Contact Us',
    description: 'Contact UponAI to discuss AI voice, chat, automation, and communications workflow design.',
    eyebrow: 'Contact Us',
    highlights: [
      'Talk through your current call flow',
      'Ask about specific industries or use cases',
      'Get direction on where to start first',
    ],
    sections: [
      {
        title: 'For New Projects',
        body: 'If you are exploring AI voice or chat for the first time, we can help identify where automation will have the biggest operational impact.',
      },
      {
        title: 'For Existing Teams',
        body: 'If you already have communications infrastructure in place, we can evaluate how AI should plug into your current workflows and handoffs.',
      },
      {
        title: 'For Partnerships',
        body: 'If you are interested in channel, implementation, or strategic partnership opportunities, contact us and we will route the conversation accordingly.',
      },
    ],
    image: '/site-photos/team-consultation.jpg',
    imageAlt: 'UponAI team consultation session',
  },
  {
    slug: 'customer-support-page',
    title: 'AI Voice For Customer Support',
    description: 'Use UponAI to automate customer support intake, answer common questions, and route cases more efficiently.',
    eyebrow: 'Use Case',
    highlights: [
      'Answer common questions automatically',
      'Collect context before handoff to live staff',
      'Reduce queue pressure during peak periods',
    ],
    sections: [
      {
        title: 'Support Triage',
        body: 'UponAI can gather account context, identify the issue type, and move the customer into the correct support path before a live rep joins the conversation.',
      },
      {
        title: 'FAQ Resolution',
        body: 'Routine inquiries do not need to consume your live team. AI can handle common billing, scheduling, and process questions instantly.',
      },
      {
        title: 'Escalation Paths',
        body: 'When the issue needs a human, the handoff includes the interaction context so the customer does not have to start over.',
      },
    ],
    image: '/ai-photos/knowledge-bases.png',
    imageAlt: 'UponAI support knowledge configuration',
  },
  {
    slug: 'hours-support-page',
    title: 'After Hours Support',
    description: 'Keep customer conversations active after business hours with AI voice agents that can answer, route, and capture intent.',
    eyebrow: 'Use Case',
    highlights: [
      '24/7 call handling outside business hours',
      'Capture urgent issues and route correctly',
      'Prevent missed opportunities overnight',
    ],
    sections: [
      {
        title: 'Always-On Coverage',
        body: 'After-hours support is often where businesses lose responsiveness. UponAI keeps the line active even when your live team is offline.',
      },
      {
        title: 'Urgency Detection',
        body: 'The system can recognize high-priority scenarios, collect the right information, and trigger the next escalation path when needed.',
      },
      {
        title: 'Clean Morning Follow-Up',
        body: 'Your team starts the next day with structured context instead of a backlog of voicemails and incomplete notes.',
      },
    ],
    image: '/ai-photos/test-call.png',
    imageAlt: 'UponAI after-hours call workflow preview',
  },
  {
    slug: 'book-and-schedule-page',
    title: 'Booking & Scheduling',
    description: 'Let UponAI handle appointment booking, qualification, and calendar coordination inside voice workflows.',
    eyebrow: 'Use Case',
    highlights: [
      'Reduce booking friction on inbound calls',
      'Coordinate scheduling without back-and-forth',
      'Confirm intent before handing off valuable slots',
    ],
    sections: [
      {
        title: 'Qualification Before Booking',
        body: 'Not every caller should reach the calendar immediately. AI can filter, collect key information, and only move qualified prospects forward.',
      },
      {
        title: 'Operational Consistency',
        body: 'Booking rules stay consistent across every call so teams do not need to rely on ad hoc manual intake or inconsistent scripts.',
      },
      {
        title: 'Smoother Experience',
        body: 'Customers get a faster experience and your internal team spends less time coordinating routine scheduling tasks.',
      },
    ],
    image: '/ai-photos/agent-builder.jpeg',
    imageAlt: 'UponAI booking workflow setup',
  },
  {
    slug: 'voice-ai-for-outbound-sales-page',
    title: 'Voice AI For Outbound Sales',
    description: 'Use UponAI to power outbound sales workflows that qualify faster and prepare cleaner handoffs to live teams.',
    eyebrow: 'Industry Use Case',
    highlights: [
      'Automate first-touch outreach workflows',
      'Score responses before human involvement',
      'Improve sales team efficiency and focus',
    ],
    sections: [
      {
        title: 'Consistent Outreach Logic',
        body: 'Outbound programs often fail because process discipline breaks down. AI brings consistency to first-touch messaging, qualification, and escalation criteria.',
      },
      {
        title: 'Better Sales Handoffs',
        body: 'When a prospect is ready for a live rep, your team receives a warmer, more structured handoff with the right context attached.',
      },
      {
        title: 'Smarter Prioritization',
        body: 'Your live sales capacity is spent where it matters most instead of on low-intent conversations that could have been filtered earlier.',
      },
    ],
    image: '/ai-photos/post-call-analysis.png',
    imageAlt: 'UponAI outbound sales analysis dashboard',
  },
  {
    slug: 'voice-ai-for-healthcare-page',
    title: 'Voice AI For Healthcare',
    description: 'Deploy AI voice workflows for healthcare organizations that need better responsiveness, intake handling, and support routing.',
    eyebrow: 'Industry',
    highlights: [
      'Handle common intake and scheduling scenarios',
      'Reduce front-desk pressure during peak periods',
      'Create clearer routing for patient conversations',
    ],
    sections: [
      {
        title: 'Patient Communication Flow',
        body: 'Healthcare teams deal with high call volume and repetitive intake patterns. AI helps absorb routine interactions while protecting staff attention for higher-value work.',
      },
      {
        title: 'Operational Relief',
        body: 'Front-desk and support teams can spend less time on repetitive triage and more time on the conversations that require human care and judgment.',
      },
      {
        title: 'Structured Escalation',
        body: 'Routing paths can be designed for appointment requests, follow-up needs, office questions, and higher-priority scenarios that need a live person quickly.',
      },
    ],
    image: '/site-photos/team-consultation.jpg',
    imageAlt: 'Healthcare workflow planning with UponAI',
  },
  {
    slug: 'voice-ai-for-insurance-page',
    title: 'Voice AI For Insurance',
    description: 'Use AI voice workflows to improve intake, qualification, and follow-up across insurance teams and inbound policy conversations.',
    eyebrow: 'Industry',
    highlights: [
      'Qualify policy inquiries faster',
      'Improve routing for coverage and service calls',
      'Capture cleaner data before handoff',
    ],
    sections: [
      {
        title: 'Speed To Lead',
        body: 'Insurance organizations often win or lose on responsiveness. AI can engage first, gather context, and route qualified opportunities more efficiently.',
      },
      {
        title: 'Service Workflow Support',
        body: 'Not every inbound call needs the same team. AI helps separate service, billing, claims-related, and sales-oriented conversations early.',
      },
      {
        title: 'Operational Discipline',
        body: 'Consistent logic improves how inquiries are documented and handed off, reducing fragmentation across teams.',
      },
    ],
    image: '/site-photos/digital-cx.png',
    imageAlt: 'Insurance communication workflow illustration',
  },
  {
    slug: 'voice-ai-for-home-services-page',
    title: 'Voice AI For Home Services',
    description: 'Deploy AI voice systems for home services teams that need better call handling, after-hours capture, and booking support.',
    eyebrow: 'Industry',
    highlights: [
      'Capture more inbound job opportunities',
      'Handle after-hours inquiries more effectively',
      'Support scheduling and dispatch workflows',
    ],
    sections: [
      {
        title: 'Missed Calls Cost Jobs',
        body: 'Home services businesses often lose work when calls arrive after hours or during busy field periods. AI gives you a better first response without adding staffing overhead.',
      },
      {
        title: 'Better Intake',
        body: 'The right questions can be asked immediately so your team knows the job type, urgency, and caller intent before calling back.',
      },
      {
        title: 'Dispatch Support',
        body: 'Routing and booking logic can be structured around your service footprint and internal response model.',
      },
    ],
    image: '/site-photos/business-mobile.jpg',
    imageAlt: 'Home services team using mobile workflow tools',
  },
  {
    slug: 'voice-ai-real-estate',
    title: 'Voice AI For Real Estate',
    description: 'Use UponAI to qualify property inquiries, respond faster, and support agent workflows across real estate teams.',
    eyebrow: 'Industry',
    highlights: [
      'Capture listing inquiries faster',
      'Qualify buyers and sellers consistently',
      'Support agent handoffs without delay',
    ],
    sections: [
      {
        title: 'Faster Listing Response',
        body: 'Real estate lead quality often depends on response time. AI can engage inbound interest immediately and keep the prospect moving.',
      },
      {
        title: 'Smarter Qualification',
        body: 'Initial conversations can surface budget, timeline, and motivation details before the opportunity reaches the agent.',
      },
      {
        title: 'Cleaner Agent Handoffs',
        body: 'Agents spend less time reconstructing context and more time focusing on active, qualified conversations.',
      },
    ],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'Real estate operations planning with AI workflows',
  },
  {
    slug: 'voice-ai-veterinary-clinics',
    title: 'Voice AI For Veterinary Clinics',
    description: 'Help veterinary clinics manage call volume, appointment requests, and intake routing with AI voice workflows.',
    eyebrow: 'Industry',
    highlights: [
      'Support appointment and inquiry handling',
      'Reduce staff interruption from repetitive calls',
      'Improve call routing during busy clinic hours',
    ],
    sections: [
      {
        title: 'Clinic Efficiency',
        body: 'Veterinary teams often operate under constant interruptions from scheduling and routine inquiries. AI can absorb a large portion of that repetitive volume.',
      },
      {
        title: 'Better Intake Paths',
        body: 'Call flows can distinguish between routine scheduling, prescription or status questions, and higher-priority concerns that need quicker escalation.',
      },
      {
        title: 'Staff Focus',
        body: 'When routine communication is handled more efficiently, clinic staff can spend more time on in-person care and higher-value support tasks.',
      },
    ],
    image: '/site-photos/team-conversation.jpg',
    imageAlt: 'Veterinary support workflow planning',
  },
  {
    slug: 'for-restaurant-page',
    title: 'Voice AI For Restaurants',
    description: 'Use AI voice workflows to support bookings, overflow handling, and customer communication for restaurant operations.',
    eyebrow: 'Industry',
    highlights: [
      'Handle reservations and common inquiries faster',
      'Reduce missed calls during service rushes',
      'Improve after-hours communication coverage',
    ],
    sections: [
      {
        title: 'Rush-Hour Call Pressure',
        body: 'Restaurants cannot always pause operations to answer every inbound call. AI can keep the conversation active while your team stays focused on service.',
      },
      {
        title: 'Booking And Inquiry Handling',
        body: 'Reservation requests, common questions, and basic routing can be handled more consistently without overwhelming staff during peak windows.',
      },
      {
        title: 'Better Guest Experience',
        body: 'Customers get quicker, clearer responses instead of unanswered calls and uncertain next steps.',
      },
    ],
    image: '/site-photos/omnichannel.jpg',
    imageAlt: 'Restaurant engagement workflow illustration',
  },
  {
    slug: 'voice-ai-for-telecommunication',
    title: 'Voice AI For Telecommunications',
    description: 'Deploy AI voice workflows for telecommunications teams that need better routing, support intake, and call automation.',
    eyebrow: 'Industry',
    highlights: [
      'Improve inbound routing logic',
      'Support high-volume communications workflows',
      'Automate repetitive front-line call handling',
    ],
    sections: [
      {
        title: 'High-Volume Environments',
        body: 'Telecommunications businesses often manage large volumes of repetitive inbound communication that can be structured far more efficiently with AI.',
      },
      {
        title: 'Routing And Escalation',
        body: 'AI can help sort conversations by intent and urgency before they touch the right internal team or process path.',
      },
      {
        title: 'Operational Leverage',
        body: 'Better automation at the front of the communication flow improves responsiveness while reducing repetitive manual workload.',
      },
    ],
    image: '/site-photos/voip-phone.jpg',
    imageAlt: 'Telecommunications operations image',
  },
  {
    slug: 'voice-ai-for-telecommunications',
    title: 'Voice AI For Telecommunications',
    description: 'Deploy AI voice workflows for telecommunications teams that need better routing, support intake, and call automation.',
    eyebrow: 'Industry',
    highlights: [
      'Improve inbound routing logic',
      'Support high-volume communications workflows',
      'Automate repetitive front-line call handling',
    ],
    sections: [
      {
        title: 'High-Volume Environments',
        body: 'Telecommunications businesses often manage large volumes of repetitive inbound communication that can be structured far more efficiently with AI.',
      },
      {
        title: 'Routing And Escalation',
        body: 'AI can help sort conversations by intent and urgency before they touch the right internal team or process path.',
      },
      {
        title: 'Operational Leverage',
        body: 'Better automation at the front of the communication flow improves responsiveness while reducing repetitive manual workload.',
      },
    ],
    image: '/site-photos/voip-phone.jpg',
    imageAlt: 'Telecommunications operations image',
  },
  {
    slug: 'voice-ai-for-legal-services',
    title: 'Voice AI For Legal Services',
    description: 'Use AI voice workflows to improve legal intake, routing, and after-hours responsiveness for legal services teams.',
    eyebrow: 'Industry',
    highlights: [
      'Capture more intake opportunities',
      'Improve responsiveness after hours',
      'Create clearer qualification before handoff',
    ],
    sections: [
      {
        title: 'Better Intake',
        body: 'Legal teams need structured first conversations. AI can help gather context early so live staff can step in with a clearer picture of the request.',
      },
      {
        title: 'After-Hours Opportunity Capture',
        body: 'Potential clients do not always call during office hours. AI can keep intake active and preserve opportunities that would otherwise go cold.',
      },
      {
        title: 'Smarter Routing',
        body: 'When case types or practice areas differ, routing logic can be structured to move conversations toward the right next step faster.',
      },
    ],
    image: '/site-photos/laptop-typing.jpg',
    imageAlt: 'Legal services workflow planning image',
  },
  {
    slug: 'recordings-page',
    title: 'Recordings',
    description: 'Review how recorded interactions, summaries, and conversation insights can support better operations with UponAI.',
    eyebrow: 'Resource',
    highlights: [
      'Use interaction recordings to refine workflows',
      'Surface conversation patterns and trends',
      'Improve QA and operational visibility',
    ],
    sections: [
      {
        title: 'Operational Insight',
        body: 'Recorded interactions and summaries can help teams identify workflow friction, missed qualification moments, and routing opportunities.',
      },
      {
        title: 'Training And QA',
        body: 'Teams can review how conversations are handled over time and refine prompts, escalation logic, and downstream human processes.',
      },
      {
        title: 'Continuous Improvement',
        body: 'The value is not just storing calls. It is using structured conversation data to iterate the workflow intelligently.',
      },
    ],
    image: '/ai-photos/post-call-analysis.png',
    imageAlt: 'UponAI recordings and analysis dashboard',
  },
  {
    slug: 'recordings',
    title: 'Recordings',
    description: 'Review how recorded interactions, summaries, and conversation insights can support better operations with UponAI.',
    eyebrow: 'Resource',
    highlights: [
      'Use interaction recordings to refine workflows',
      'Surface conversation patterns and trends',
      'Improve QA and operational visibility',
    ],
    sections: [
      {
        title: 'Operational Insight',
        body: 'Recorded interactions and summaries can help teams identify workflow friction, missed qualification moments, and routing opportunities.',
      },
      {
        title: 'Training And QA',
        body: 'Teams can review how conversations are handled over time and refine prompts, escalation logic, and downstream human processes.',
      },
      {
        title: 'Continuous Improvement',
        body: 'The value is not just storing calls. It is using structured conversation data to iterate the workflow intelligently.',
      },
    ],
    image: '/ai-photos/post-call-analysis.png',
    imageAlt: 'UponAI recordings and analysis dashboard',
  },
  {
    slug: 'ucaas-page',
    title: 'UCaaS',
    description: 'Explore how unified communications and AI can fit together inside a more modern business communication stack.',
    eyebrow: 'Solution',
    highlights: [
      'Voice, routing, and communications alignment',
      'AI layered into modern engagement workflows',
      'Designed for operational flexibility',
    ],
    sections: [
      {
        title: 'Communications Foundation',
        body: 'UCaaS provides the communications backbone that many AI voice workflows need when routing, escalation, and availability rules matter.',
      },
      {
        title: 'AI + UCaaS Together',
        body: 'The most effective deployments treat AI as part of the broader communication system instead of a disconnected layer.',
      },
      {
        title: 'Long-Term Flexibility',
        body: 'A stronger communications foundation makes it easier to expand into more sophisticated voice and automation workflows over time.',
      },
    ],
    image: '/site-photos/omnichannel.jpg',
    imageAlt: 'Unified communications illustration',
  },
  {
    slug: 'call-overflow',
    title: 'Call Overflow',
    description: 'Use UponAI to handle overflow scenarios when your live team cannot answer every inbound conversation in real time.',
    eyebrow: 'Solution',
    highlights: [
      'Reduce lost conversations during peaks',
      'Keep callers engaged instead of abandoned',
      'Create cleaner overflow escalation paths',
    ],
    sections: [
      {
        title: 'Overflow Protection',
        body: 'Call spikes, understaffing, or timing mismatches do not need to result in dropped opportunities. AI can stabilize that front-line experience.',
      },
      {
        title: 'Better Caller Experience',
        body: 'Instead of voicemail or dead air, callers can still interact, share intent, and move through a useful workflow while your team catches up.',
      },
      {
        title: 'Operational Continuity',
        body: 'Overflow handling becomes a defined process rather than a collection of missed calls and manual follow-up.',
      },
    ],
    image: '/ai-photos/extension-routing.png',
    imageAlt: 'UponAI call routing and overflow setup',
  },
  {
    slug: 'sip-integrations-and-transfers-685191',
    title: 'SIP Integrations & Transfers',
    description: 'Integrate AI voice workflows with the routing and transfer logic needed to connect conversations to the right destination.',
    eyebrow: 'Technical Capability',
    highlights: [
      'Connect routing logic to real business destinations',
      'Support transfer workflows with more context',
      'Reduce friction between AI and human teams',
    ],
    sections: [
      {
        title: 'Transfer Logic',
        body: 'AI workflows are most useful when they can move callers into the right next step cleanly. Transfer behavior needs to match your real communication architecture.',
      },
      {
        title: 'Integration Design',
        body: 'The implementation matters as much as the prompt. Routing and transfer logic must align with operational roles, teams, and business processes.',
      },
      {
        title: 'Human Handoff',
        body: 'The goal is not just transfer. It is transferring with the right context, at the right time, into the right destination.',
      },
    ],
    image: '/ai-photos/sip-carrier.png',
    imageAlt: 'SIP and transfer configuration screen',
  },
  {
    slug: 'faqs',
    title: 'Frequently Asked Questions',
    description: 'Common questions about AI chatbots, AI voice systems, and how UponAI approaches business automation.',
    eyebrow: 'Common Questions About Our Company',
    highlights: [
      'Understand how AI voice and chat work in practice',
      'See where AI fits into existing workflows',
      'Get clarity on deployment expectations',
    ],
    sections: [
      {
        title: 'AI Voice Systems',
        body: 'AI voice systems use natural language understanding and business rules to handle conversations more flexibly than traditional menu-driven systems.',
      },
      {
        title: 'AI Chatbots',
        body: 'AI chatbots can answer business-specific questions, qualify visitors, and move customers toward the right next step instead of forcing them into static forms.',
      },
      {
        title: 'Deployment Approach',
        body: 'The most effective implementations start with a specific workflow, measure results, then expand into broader automation once the foundation is solid.',
      },
    ],
    faqs: [
      {
        question: 'What is an AI Chatbot and how does it work?',
        answer: 'An AI chatbot uses language models, knowledge sources, and workflow rules to interpret user intent and respond in a more natural and contextual way than a static scripted bot.',
      },
      {
        question: 'How do AI Chatbots understand the intent of user messages?',
        answer: 'They analyze the text for patterns, context, and likely goals, then combine that with your business rules and knowledge sources to determine the right response path.',
      },
      {
        question: 'What is an AI IVR system and how is it different from a traditional IVR system?',
        answer: 'A traditional IVR depends on rigid menus and keypad input. An AI-driven voice system can understand natural speech, detect intent, and route the caller more dynamically.',
      },
      {
        question: 'What makes AI-powered IVR systems more efficient than traditional touch-tone systems?',
        answer: 'They reduce menu friction, shorten time to resolution, and help callers express what they actually need instead of forcing them through generic options.',
      },
      {
        question: 'What are the benefits of using AI Chatbots in customer support?',
        answer: 'They improve response time, reduce repetitive workload, and help gather cleaner context before a human support agent becomes involved.',
      },
      {
        question: 'Can AI Chatbots be integrated with human agents in customer support?',
        answer: 'Yes. Strong implementations are designed around handoff, not replacement, so the live team receives the conversation context when escalation is needed.',
      },
      {
        question: 'Can AI IVR systems understand different accents and languages?',
        answer: 'Modern AI voice systems can handle a broader range of speech variation than older systems, though real-world performance depends on tuning, context, and deployment quality.',
      },
      {
        question: 'How do AI IVR systems contribute to improving self-service experiences?',
        answer: 'They help customers express intent naturally, move through workflows faster, and resolve routine needs without the friction of layered menu trees.',
      },
    ],
    image: '/site-photos/ai-chatbot.jpeg',
    imageAlt: 'UponAI FAQ and AI support concept image',
  },
  {
    slug: 'partners',
    title: 'Partners',
    description: 'Explore partner opportunities with UponAI around AI voice, automation, and communications workflow delivery.',
    eyebrow: 'Partners',
    highlights: [
      'Channel and referral opportunities',
      'Implementation and workflow collaboration',
      'AI voice delivery aligned to client outcomes',
    ],
    sections: [
      {
        title: 'Who We Partner With',
        body: 'We work with consultants, agencies, communications providers, and operational teams that want to bring AI engagement capabilities into client environments.',
      },
      {
        title: 'Where Partnerships Fit',
        body: 'Partnerships make sense when there is a clear workflow problem to solve and a need for practical deployment rather than abstract experimentation.',
      },
      {
        title: 'How To Start',
        body: 'If you have a partnership idea, reach out with context around your customer base, deployment model, or integration opportunity.',
      },
    ],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI partnership planning',
  },
  {
    slug: 'supports',
    title: 'Support',
    description: 'General support and assistance information for UponAI conversations, workflows, and implementation planning.',
    eyebrow: 'Support',
    highlights: [
      'Get help with current workflows',
      'Ask implementation questions',
      'Clarify routing, automation, or handoff behavior',
    ],
    sections: [
      {
        title: 'Operational Support',
        body: 'Support requests can cover workflow tuning, routing questions, implementation changes, or help clarifying how a given process should behave.',
      },
      {
        title: 'Implementation Guidance',
        body: 'When teams are building or adjusting flows, questions often surface around business rules, handoffs, and escalation logic. Those are all part of support.',
      },
      {
        title: 'Contact Path',
        body: 'Use the contact page to send your request and include as much operational context as possible so the team can route it effectively.',
      },
    ],
    image: '/site-photos/team-consultation.jpg',
    imageAlt: 'UponAI support planning session',
  },
  {
    slug: 'n8n-downloads',
    title: 'n8n Downloads',
    description: 'Access workflow-oriented resources and downloads related to automation and AI system building.',
    eyebrow: 'Resources',
    highlights: [
      'Workflow-oriented automation resources',
      'Practical material for builders and operators',
      'Useful downloads tied to AI implementation',
    ],
    sections: [
      {
        title: 'Automation Resources',
        body: 'This area is intended for teams that want practical assets around workflow automation, orchestration, and system design.',
      },
      {
        title: 'Builder-Oriented Material',
        body: 'Downloads should help move from idea to implementation more quickly by giving operators and builders something concrete to work from.',
      },
      {
        title: 'Next Step',
        body: 'If you need a custom workflow rather than a static resource, reach out and we can discuss the automation path directly.',
      },
    ],
    image: '/site-photos/digital-cx.png',
    imageAlt: 'Automation workflow resource image',
  },
  {
    slug: 'fast-start-532531',
    title: 'Fast Start',
    description: 'Use a fast-start approach to launch AI voice workflows without overcomplicating the first deployment.',
    eyebrow: 'Fast Start',
    highlights: [
      'Launch a focused workflow first',
      'Avoid unnecessary implementation drag',
      'Expand only after proving the first win',
    ],
    sections: [
      {
        title: 'Start With A Single Workflow',
        body: 'The fastest route to value is usually a narrow, high-impact workflow rather than a full automation overhaul on day one.',
      },
      {
        title: 'Reduce Deployment Risk',
        body: 'A focused first rollout makes it easier to validate assumptions, collect data, and improve the design before scaling wider.',
      },
      {
        title: 'Build From Results',
        body: 'Once the initial workflow proves itself, expansion into adjacent call paths and use cases becomes much clearer.',
      },
    ],
    image: '/ai-photos/agent-builder.jpeg',
    imageAlt: 'UponAI fast-start workflow configuration',
  },
  {
    slug: 'ai-quality-assurance-982024',
    title: 'AI Quality Assurance',
    description: 'Use quality assurance practices to evaluate AI-driven conversations, routing, and workflow performance over time.',
    eyebrow: 'Quality Assurance',
    highlights: [
      'Review conversation quality systematically',
      'Refine prompts, logic, and handoffs over time',
      'Use operational data to improve outcomes',
    ],
    sections: [
      {
        title: 'Why QA Matters',
        body: 'AI systems need operational review just like human teams do. Strong QA protects experience quality and uncovers where the workflow still needs refinement.',
      },
      {
        title: 'What To Review',
        body: 'Teams should look at qualification quality, escalation timing, response accuracy, and how well the workflow supports the intended business outcome.',
      },
      {
        title: 'Continuous Improvement',
        body: 'Quality assurance is how AI moves from interesting demo to dependable operating capability.',
      },
    ],
    image: '/ai-photos/post-call-analysis.png',
    imageAlt: 'UponAI quality assurance analytics',
  },
  {
    slug: 'privacy-policy-page',
    title: 'Privacy Policy',
    description: 'Privacy policy for UponAI.',
    eyebrow: 'Legal',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI legal page',
    aliasTo: '/privacy-policy',
  },
  {
    slug: 'terms-services-page',
    title: 'Terms & Condition',
    description: 'Terms and conditions for UponAI.',
    eyebrow: 'Legal',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI legal page',
    aliasTo: '/terms-of-services',
  },
  {
    slug: 'smsterms',
    title: 'SMS Terms & Condition',
    description: 'SMS terms and conditions for UponAI.',
    eyebrow: 'Legal',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI legal page',
    aliasTo: '/terms-of-services',
  },
  {
    slug: 'home',
    title: 'UponAI Home',
    description: "Powering Tomorrow's Conversations with AI voice and communication workflows.",
    eyebrow: 'Home',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI homepage',
    aliasTo: '/',
  },
  {
    slug: 'about-us',
    title: 'About UponAI',
    description: 'Learn how UponAI approaches AI voice, chat, and communications automation for modern businesses.',
    eyebrow: 'About Us',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI about page',
    aliasTo: '/about-us-page',
  },
  {
    slug: 'get-a-demo',
    title: 'Get a Demo',
    description: 'Book a demo to see how UponAI handles inbound calls, qualification, routing, and AI-driven engagement.',
    eyebrow: 'Get Started',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI demo page',
    aliasTo: '/get-a-demo-page',
  },
  {
    slug: 'contact-us',
    title: 'Contact Us',
    description: 'Contact UponAI to discuss AI voice, chat, automation, and communications workflow design.',
    eyebrow: 'Contact',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI contact page',
    aliasTo: '/contact-us-page',
  },
  {
    slug: 'customer-support',
    title: 'AI Voice For Customer Support',
    description: 'Use UponAI to automate customer support intake, answer common questions, and route cases more efficiently.',
    eyebrow: 'Use Case',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI support page',
    aliasTo: '/customer-support-page',
  },
  {
    slug: 'ucaas',
    title: 'UCaaS',
    description: 'Explore how unified communications and AI fit together inside a modern business communication stack.',
    eyebrow: 'Solution',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI UCaaS page',
    aliasTo: '/ucaas-page',
  },
  {
    slug: 'call-overflow-page',
    title: 'Call Overflow',
    description: 'Use UponAI to handle overflow scenarios when your live team cannot answer every inbound conversation in real time.',
    eyebrow: 'Solution',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI call overflow page',
    aliasTo: '/call-overflow',
  },
  {
    slug: 'support',
    title: 'Support',
    description: 'General support and assistance information for UponAI conversations, workflows, and implementation planning.',
    eyebrow: 'Support',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI support page',
    aliasTo: '/supports',
  },
  {
    slug: 'upon-ai-faqs',
    title: 'Frequently Asked Questions',
    description: 'Common questions about AI chatbots, AI voice systems, and how UponAI approaches business automation.',
    eyebrow: 'FAQ',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI FAQs page',
    aliasTo: '/faqs',
  },
  {
    slug: 'upon-ai-partners',
    title: 'Partners',
    description: 'Explore partner opportunities with UponAI around AI voice, automation, and communications workflow delivery.',
    eyebrow: 'Partners',
    highlights: [],
    sections: [],
    image: '/site-photos/team-office.jpg',
    imageAlt: 'UponAI partnerships page',
    aliasTo: '/partners',
  },
];

export function getUponAIPage(slug: string) {
  return uponaiPages.find((page) => page.slug === slug);
}
