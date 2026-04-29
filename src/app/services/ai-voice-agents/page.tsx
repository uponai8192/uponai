import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Voice Agents for Business',
  description:
    'Replace your outdated IVR with a human-sounding AI voice agent that answers calls 24/7, qualifies leads, books appointments, and routes callers — powered by UponAI technology.',
  alternates: { canonical: 'https://uponai.com/services/ai-voice-agents' },
  openGraph: {
    title: 'AI Voice Agents for Business',
    description: 'Human-sounding AI that answers every call, 24/7. No hold queues. No missed leads.',
  },
};

const useCases = [
  {
    title: 'Lead Qualification',
    desc: 'Every inbound call is immediately qualified — budget, timeline, need — and routed to the right salesperson with a full summary before they even say hello.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Appointment Scheduling',
    desc: 'The AI checks your calendar and books appointments in real time — no back-and-forth, no missed calls, no manual scheduling.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Customer Support',
    desc: 'Handle FAQs, account inquiries, billing questions, and common support requests automatically — with a seamless handoff to a live agent when needed.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'After-Hours Coverage',
    desc: "Your AI agent never clocks out. Every call at 2am gets the same professional experience as a Monday morning call — capturing leads you&apos;d otherwise lose.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: 'IVR Replacement',
    desc: 'Retire your press-1 menu forever. Callers simply say what they need in plain English — the AI understands intent and routes them instantly.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Multi-Language Support',
    desc: 'Serve customers in their preferred language. Our AI handles English, Spanish, French, and more — with natural accent recognition built in.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
];

const stats = [
  { value: '100+', label: 'Businesses using UponAI' },
  { value: '24/7', label: 'Always-on coverage' },
  { value: '0', label: 'Hold queues' },
  { value: '< 1s', label: 'Average response time' },
];

const featuredCities = cities.slice(0, 30);

function ScreenshotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-violet-500/20 rounded-2xl blur-xl" />
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-500 font-mono">UponAI Platform</span>
        </div>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}

export default function AIVoiceAgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <nav className="mb-6 flex items-center gap-1 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/services/business-voip" className="hover:text-white">Services</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">AI Voice Agents</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/30 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                  <span className="text-violet-300 text-sm font-medium">Powered by UponAI Technology</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5">
                  <span className="text-blue-300 text-sm font-medium">UponAI Solution</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                AI Voice Agents That{' '}
                <span className="text-violet-400">Answer Every Call</span>
                {' '}— 24/7
              </h1>
              <p className="text-xl text-slate-300 mb-4 leading-relaxed">
                Retire your old IVR and hold queues forever. Our AI Voice Agents sound like real people, understand natural speech, and handle calls around the clock.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                UponAI and{' '}
                <a href="https://uponai.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">
                  UponAI
                </a>{' '}
                — founded by the same leadership team — have combined 20+ years of VoIP expertise with cutting-edge Conversational AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                  Get a Free Demo
                </Link>
                <a href="tel:+18887876624" className="border border-slate-600 text-slate-200 hover:border-violet-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg text-center">
                  Call (888) 787-6624
                </a>
              </div>
            </div>

            {/* Right: live platform screenshot */}
            <div>
              <ScreenshotFrame
                src="/ai-photos/test-call.png"
                alt="UponAI agent dashboard — live test call"
              />
              <p className="text-center text-slate-500 text-xs mt-3">Actual UponAI platform — test your agent with one click</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-violet-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature: Build your agent */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 1</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Build Your AI Agent in Minutes</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Give your agent a name, a persona, and a goal. Describe how it should greet callers, what it can help with, and how it should handle edge cases — all in plain English. No code required.
            </p>
            <ul className="space-y-3">
              {[
                'Define identity, tone, and scope in plain English',
                'Set call routing rules with a visual extension directory',
                'Choose begin message behavior — AI-initiated or user-first',
                'GPT-4o powered for natural, accurate conversations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ScreenshotFrame
            src="/ai-photos/agent-builder.jpeg"
            alt="UponAI agent builder — configuring the AI voice agent prompt"
          />
        </div>
      </section>

      {/* Feature: Smart call routing — reversed */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <ScreenshotFrame
              src="/ai-photos/extension-routing.png"
              alt="UponAI extension directory — call transfer routing configuration"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 2</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Intelligent Call Routing to Your Team</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Set up your extension directory so the AI knows exactly who to transfer callers to. Sales goes to extension 2000, Support to 2001, or directly to a named team member — the AI handles the routing automatically.
            </p>
            <ul className="space-y-3">
              {[
                'Named extension directory for each team member',
                'Transfer protocol triggers on keywords like "speak to someone" or "billing"',
                'Warm transfer with caller summary before handoff',
                'Escalate complex issues to live agents instantly',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature: Voice selection */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 3</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Choose a Human-Sounding Voice</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Pick from dozens of ultra-realistic AI voices powered by ElevenLabs and OpenAI. Male, female, different accents — each one sounds indistinguishable from a real person. Preview any voice before you deploy.
            </p>
            <ul className="space-y-3">
              {[
                '20+ voices from ElevenLabs and OpenAI',
                'Filter by gender, accent, and provider',
                'Preview any voice before going live',
                'Multilingual — English, Spanish, French & more',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ScreenshotFrame
            src="/ai-photos/voice-selection.png"
            alt="UponAI voice selection — choose from ElevenLabs and OpenAI voices"
          />
        </div>
      </section>

      {/* Feature: Knowledge base — reversed */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <ScreenshotFrame
              src="/ai-photos/knowledge-base-create.png"
              alt="UponAI — create knowledge base from documents, text, or URLs"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 4</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Feed It Your Business Knowledge</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Upload your FAQs, pricing sheets, product docs, or point it at your website. The AI reads and retains everything — so it answers questions about your specific business, not generic ones.
            </p>
            <ul className="space-y-3">
              {[
                'Upload PDFs, Word docs, and TXT files up to 10MB',
                'Paste raw text or scrape directly from a URL',
                'Multiple knowledge bases for different agent roles',
                'Instantly searchable — no retraining required',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature: Post-call analytics */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 5</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Extract Intelligence from Every Call</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              After each call, the AI automatically extracts structured data — lead status, customer sentiment, reason for call, callback requested — and pushes it to your CRM or dashboard. Every conversation becomes actionable data.
            </p>
            <ul className="space-y-3">
              {[
                'Define custom data fields: text, selection, or yes/no',
                'Auto-extract lead score, interest level, reason for call',
                'Push to CRM, Slack, webhooks, or email automatically',
                'Full transcripts with post-call summaries',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ScreenshotFrame
            src="/ai-photos/post-call-analysis.png"
            alt="UponAI post-call analysis — structured data extraction from calls"
          />
        </div>
      </section>

      {/* Feature: VoIP integration — reversed */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <ScreenshotFrame
              src="/ai-photos/add-phone-number.png"
              alt="UponAI — add a phone number to your AI voice agent"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Step 6</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Connect Your Phone Numbers Instantly</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              UponAI voice agents connect directly into your cloud phone workflow, so your phone numbers reach the right AI agent with zero friction. Assign any number — local, toll-free, or existing — to your agent in seconds.
            </p>
            <ul className="space-y-3">
              {[
                'Connect existing UponAI numbers with one click',
                'Assign toll-free or local numbers to specific agents',
                'Add multiple numbers — route by DID, department, or campaign',
                'Native SIP integration — no third-party adapter needed',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-violet-600/10 border border-violet-500/30 rounded-xl">
              <p className="text-violet-300 text-sm">
                <strong className="text-white">Already a UponAI customer?</strong> Your existing numbers can be assigned to an AI agent today — no porting, no downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIP / carrier integration detail */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">Enterprise-Grade</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Direct SIP Carrier Integration</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              For businesses with existing SIP carriers or PBX infrastructure, the UponAI platform connects natively — no middleman, no latency penalty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ScreenshotFrame
              src="/ai-photos/sip-carrier.png"
              alt="UponAI SIP carrier configuration — custom carrier setup"
            />
            <ScreenshotFrame
              src="/ai-photos/sip-registration.png"
              alt="UponAI SIP registration — auth credentials and realm"
            />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Whitelist SIP IPs', desc: 'Point your carrier to our SIP signaling IPs (18.224.99.87:5060) for instant connection.' },
              { title: 'Custom Carrier Templates', desc: 'Pre-built templates for major carriers — or configure any custom SIP provider from scratch.' },
              { title: 'Gateway Configuration', desc: 'Full control over IP, port, netmask, protocol (UDP/TCP/TLS), inbound/outbound rules.' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our AI Voice Agents Can Do</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Fully customized to your business workflows — not a one-size-fits-all bot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-violet-500/40 transition-colors">
                <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-400 mb-4">
                  {uc.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{uc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UponAI */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why UponAI?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Most AI tools are layered on top of someone else&apos;s phone stack. UponAI combines AI workflows and telecom expertise in one platform, so deployment is cleaner and handoffs are more reliable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Native Voice Workflow Design',
                desc: 'Your AI agents are built for real phone workflows, including transfers, routing, transcripts, and live-agent handoff logic.',
              },
              {
                title: '20+ Years of VoIP Expertise',
                desc: "Our founders have been building business phone systems since 2000. We know every edge case, every carrier quirk, and how to make AI work reliably at scale.",
              },
              {
                title: 'One Vendor, One Bill',
                desc: "Your VoIP service and AI agents come from the same provider. One support team, one invoice, and a single platform to manage everything.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-7">
                <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">AI Voice Agents Available Nationwide</h2>
          <p className="text-slate-400 mb-8 text-sm">
            UponAI deploys AI Voice Agents for businesses across the United States. Select your city below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/ai-voice-agents/${city.slug}`}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:border-violet-500/40 transition-colors text-center"
              >
                {city.name}, {city.stateAbbr}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-slate-500 text-sm">+ {cities.length - featuredCities.length} more cities nationwide</p>
        </div>
      </section>

      <CTASection
        heading="Ready to Deploy Your AI Voice Agent?"
        subheading="Get a live demo in 24 hours. See exactly how it sounds and works for your specific business."
      />
    </>
  );
}
