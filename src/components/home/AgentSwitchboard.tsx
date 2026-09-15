'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import AgentAvatar from '@/components/voice/AgentAvatar';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';
import { defaultHomeSocialProof, type HomeSocialProofContent } from '@/lib/home-content';
import { getVerticalAgents } from '@/lib/vertical-agents';

// The agent switchboard: one pinned stage that hands over from agent to agent
// as the visitor scrolls. The section is several screens tall; its inner
// stage is sticky, and scroll progress through the section picks the agent.
// Scrolling itself is never intercepted.

type StageDetails = {
  /** Page that already covers this vertical. */
  href: string;
  /** Short industry name for the dial. */
  industry: string;
  /** RGB triplet for the per-industry wash. */
  tint: string;
  /** Illustrative exchange, scoped to what the demo agent actually covers. */
  caller: string;
  reply: string;
};

// Decorative data, kept with the design rather than in the CMS copy.
const stageByKey: Record<string, StageDetails> = {
  healthcare: {
    href: '/voice-ai-for-healthcare-page',
    industry: 'Healthcare',
    tint: '20, 184, 166',
    caller: 'I have had a fever for three days and now a rash. Should I come in?',
    reply: 'Let us check a few things first. Any trouble breathing, or is the rash spreading quickly?',
  },
  'financial-services': {
    href: '/industries/financial-services',
    industry: 'Financial Services',
    tint: '37, 99, 235',
    caller: 'Can you walk me through the risk on my current portfolio?',
    reply: 'Sure. Your largest exposure is tech at 38%. Want the downside scenarios first?',
  },
  legal: {
    href: '/voice-ai-for-legal-services',
    industry: 'Legal',
    tint: '124, 58, 237',
    caller: 'Does this contract let them end it without notice?',
    reply: 'Clause 14.2 needs 30 days notice, and only for a material breach. I will flag it for review.',
  },
  retail: {
    href: '/industries/retail',
    industry: 'Retail & E-Commerce',
    tint: '236, 72, 153',
    caller: 'I need running shoes for flat feet, under a hundred dollars.',
    reply: 'Got it. Three stability models fit that budget. Do you run mostly on road or trail?',
  },
  hospitality: {
    href: '/industries/hotels-hospitality',
    industry: 'Hospitality & Travel',
    tint: '245, 158, 11',
    caller: 'We want ten days in Portugal in May, somewhere not too touristy.',
    reply: 'Lovely. How about Porto, then the Douro Valley, then the quieter Alentejo coast?',
  },
  education: {
    href: '/industries/education',
    industry: 'Education',
    tint: '34, 197, 94',
    caller: 'I keep getting stuck on quadratic equations.',
    reply: 'Let us work one together. How would you factor x² + 5x + 6?',
  },
  government: {
    href: '/industries/government',
    industry: 'Government',
    tint: '14, 165, 233',
    caller: 'I applied for a building permit last month. Is there an update?',
    reply: 'I can check that. It is under review and should be decided within 10 working days.',
  },
};

const fallbackStage: StageDetails = {
  href: '/industries',
  industry: 'Industry',
  tint: '1, 87, 163',
  caller: 'Can you help me with my account?',
  reply: 'Of course. Let me pull that up for you.',
};

const agents = getVerticalAgents();
const COUNT = agents.length;

const micPath =
  'M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z';

// Deterministic so server and client markup match.
const bars = Array.from({ length: 15 }, (_, i) => ((i * 31) % 105) / 100);

const pad = (value: number) => value.toString().padStart(2, '0');

export default function AgentSwitchboard({
  content = defaultHomeSocialProof,
}: {
  content?: HomeSocialProofContent;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const { callState, leadCaptured, openWidget, startCallDirect, endCall } = useVoiceWidget();

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let frame = 0;
    let listening = false;

    // Progress runs from the moment the stage pins to the moment it unpins.
    const measure = () => {
      frame = 0;
      const pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - sticky.offsetHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, (pinTop - rect.top) / travel)) : 0;
      if (railRef.current) railRef.current.style.transform = `scaleY(${progress})`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setActive(Math.min(COUNT - 1, Math.floor(progress * COUNT)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    // Only listen to scroll while the section is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        listening = true;
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
      } else if (!entry.isIntersecting && listening) {
        listening = false;
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
      // Settle on the first or last agent when entering or leaving fast.
      schedule();
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll to the middle of an agent's step, so the dial doubles as navigation.
  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    const pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const rect = section.getBoundingClientRect();
    const travel = rect.height - sticky.offsetHeight;
    const target = window.scrollY + rect.top - pinTop + ((index + 0.5) / COUNT) * travel;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  };

  const agent = agents[active];
  const stage = stageByKey[agent.key] ?? fallbackStage;
  const connecting = callState === 'loading';
  // The featured agent keeps changing while a call is live, so the button ends
  // the current call instead of opening a second one alongside it.
  const onCall = callState === 'active';

  const startTalking = () =>
    leadCaptured ? startCallDirect(agent.key) : openWidget({ vertical: agent.key });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="switchboard-heading"
      className="relative px-4"
      // One screen to pin and roughly three quarters of a screen per agent.
      style={{ height: `calc(100svh + ${COUNT} * 72svh)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-[4.75rem] flex h-[calc(100svh-4.75rem)] items-center py-4 md:py-8"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 lg:gap-16">
          {/* Dial */}
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
              One agent per industry
            </span>
            <h2
              id="switchboard-heading"
              className="theme-heading mt-3 text-2xl font-bold leading-[1.1] md:mt-4 md:text-[2.5rem] [@media(max-height:600px)]:text-xl"
            >
              {content.lead}
              {content.leadHighlight?.trim() ? (
                <>
                  {' '}
                  <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text text-transparent">
                    {content.leadHighlight}
                  </span>
                </>
              ) : null}
            </h2>

            {/* Desktop: vertical rail */}
            <ol className="relative mt-9 hidden md:block">
              <span
                aria-hidden
                className="absolute bottom-[26px] left-[25px] top-[26px] w-px bg-[var(--border-strong)]"
              />
              <span
                ref={railRef}
                aria-hidden
                className="absolute bottom-[26px] left-[25px] top-[26px] w-[2px] origin-top -translate-x-[0.5px] bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)]"
                style={{ transform: 'scaleY(0)' }}
              />
              {agents.map((item, i) => {
                const isActive = i === active;
                const details = stageByKey[item.key] ?? fallbackStage;
                return (
                  <li key={item.key} className="relative">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group flex w-full items-center gap-4 rounded-2xl py-[5px] text-left"
                    >
                      {/* The avatar disc stays opaque and centred on the rail, so the
                          line runs behind it rather than through it; only the
                          portrait and the text dim. */}
                      <span
                        className={`sw-row relative grid h-[52px] w-[52px] flex-none place-items-center overflow-hidden rounded-full border-2 bg-[var(--surface-solid)] ${
                          isActive ? 'scale-110 border-[var(--brand)]' : 'border-[var(--border-strong)]'
                        }`}
                      >
                        <AgentAvatar
                          agentKey={item.key}
                          name={item.name}
                          size={48}
                          className={`h-12 w-12 transition-[opacity,filter] duration-300 ${
                            isActive ? '' : 'opacity-50 grayscale group-hover:opacity-90 group-hover:grayscale-0'
                          }`}
                        />
                      </span>
                      <span
                        className={`sw-row flex min-w-0 flex-col leading-tight ${
                          isActive ? 'translate-x-1 opacity-100' : 'opacity-55 group-hover:opacity-90'
                        }`}
                      >
                        <span
                          className={`text-[15px] font-semibold transition-colors ${
                            isActive ? 'text-[var(--text-strong)]' : 'text-[var(--text-body)]'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="mt-0.5 text-xs text-[var(--text-subtle)]">{details.industry}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Mobile: horizontal avatar row */}
            <div className="mt-5 md:hidden">
              <ol className="flex justify-between">
                {agents.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-label={`${item.name}, ${(stageByKey[item.key] ?? fallbackStage).industry}`}
                        aria-current={isActive ? 'step' : undefined}
                        className={`sw-row block overflow-hidden rounded-full border-2 ${
                          isActive ? 'scale-110 border-[var(--brand)] opacity-100' : 'border-transparent opacity-50'
                        }`}
                      >
                        <AgentAvatar agentKey={item.key} name={item.name} size={36} className="h-9 w-9" />
                      </button>
                    </li>
                  );
                })}
              </ol>
              <span className="mt-3 block h-[2px] overflow-hidden rounded-full bg-[var(--border)]">
                <span
                  ref={barRef}
                  className="block h-full origin-left bg-gradient-to-r from-[var(--brand-cool)] to-[var(--brand)]"
                  style={{ transform: 'scaleX(0)' }}
                />
              </span>
            </div>
          </div>

          {/* Stage */}
          <div className="theme-panel relative overflow-hidden rounded-[28px] p-5 sm:p-7 md:p-9">
            {agents.map((item, i) => (
              <div
                key={item.key}
                aria-hidden
                data-active={i === active}
                className="sw-fade pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(520px 320px at 12% 0%, rgba(${
                    (stageByKey[item.key] ?? fallbackStage).tint
                  }, 0.16), transparent 70%), radial-gradient(420px 300px at 100% 100%, rgba(${
                    (stageByKey[item.key] ?? fallbackStage).tint
                  }, 0.10), transparent 70%)`,
                }}
              />
            ))}

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="theme-pill-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] font-[family-name:var(--font-mono)]">
                  <span className="animate-brand-pulse inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                  Live demo
                </span>
                <span className="theme-subtle text-[11px] tracking-[0.18em] font-[family-name:var(--font-mono)]">
                  {pad(active + 1)} / {pad(COUNT)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 md:mt-7 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative grid h-24 w-24 place-items-center sm:h-32 sm:w-32 lg:h-44 lg:w-44">
                    <span
                      aria-hidden
                      className="animate-agent-halo absolute inset-0 rounded-full border border-[var(--brand)]"
                    />
                    <span
                      aria-hidden
                      className="animate-agent-halo absolute inset-0 rounded-full border border-[var(--brand)]"
                      style={{ animationDelay: '1.4s' }}
                    />
                    <span className="relative h-[88px] w-[88px] overflow-hidden rounded-full bg-[var(--surface-solid)] shadow-[0_16px_36px_rgba(var(--shadow-rgb),0.28)] sm:h-[118px] sm:w-[118px] lg:h-40 lg:w-40">
                      {agents.map((item, i) => (
                        <span
                          key={item.key}
                          data-active={i === active}
                          aria-hidden={i !== active}
                          className="sw-fade absolute inset-0"
                        >
                          <AgentAvatar agentKey={item.key} name={item.name} size={160} className="h-full w-full" />
                        </span>
                      ))}
                    </span>
                    <span
                      aria-hidden
                      className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-[3px] border-[var(--surface-solid)] bg-[var(--brand-cool)] lg:bottom-4 lg:right-4"
                    />
                  </div>
                  <div aria-hidden className="mt-3 hidden h-6 w-32 items-end justify-center gap-[3px] sm:flex">
                    {bars.map((delay, i) => (
                      <span
                        key={i}
                        className="animate-wave-bar w-[3px] flex-none origin-bottom rounded-full bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] opacity-80"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>

                <div key={agent.key} className="min-w-0">
                  <p
                    className="sw-enter theme-subtle text-[10.5px] uppercase tracking-[0.18em] font-[family-name:var(--font-mono)]"
                    style={{ '--d': '0ms' } as CSSProperties}
                  >
                    {agent.contextLabel}
                  </p>
                  <h3
                    className="sw-enter theme-heading mt-1.5 text-4xl font-bold leading-none sm:text-5xl lg:text-6xl"
                    style={{ '--d': '60ms' } as CSSProperties}
                  >
                    {agent.name}
                  </h3>
                  <p
                    className="sw-enter theme-soft mt-3 hidden text-sm leading-6 sm:block md:text-[15px] [@media(max-height:600px)]:hidden"
                    style={{ '--d': '120ms' } as CSSProperties}
                  >
                    {agent.blurb}
                  </p>
                  <div
                    className="sw-enter mt-4 hidden flex-wrap gap-2 sm:flex [@media(max-height:600px)]:hidden"
                    style={{ '--d': '180ms' } as CSSProperties}
                  >
                    {agent.chips.map((chip) => (
                      <span
                        key={chip}
                        className="theme-card-soft theme-body rounded-full border border-[var(--border)] px-3 py-1.5 text-[11.5px]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dropped on short screens (landscape phones) so the pinned stage
                  still fits with the Talk button in view. */}
              <div
                key={`talk-${agent.key}`}
                className="mt-5 grid gap-2.5 md:mt-7 [@media(max-height:720px)]:hidden"
                aria-hidden
              >
                <p
                  className="sw-enter theme-card-soft theme-body max-w-[85%] justify-self-start rounded-2xl rounded-bl-md border border-[var(--border)] px-4 py-2.5 text-[13.5px] leading-5"
                  style={{ '--d': '240ms' } as CSSProperties}
                >
                  {stage.caller}
                </p>
                <p
                  className="sw-enter max-w-[85%] justify-self-end rounded-2xl rounded-br-md bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] px-4 py-2.5 text-[13.5px] leading-5 text-[#ffffff]"
                  style={{ '--d': '520ms' } as CSSProperties}
                >
                  {stage.reply}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-7">
                {onCall ? (
                  <button
                    type="button"
                    onClick={endCall}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 px-5 py-3 text-[15px] font-bold text-[#dc2626] transition-colors hover:bg-[#ef4444]/16"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <rect x="5" y="5" width="14" height="14" rx="2" />
                    </svg>
                    End call
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startTalking}
                    disabled={connecting}
                    className="theme-primary-button inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-[15px] font-bold disabled:opacity-60"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={micPath} />
                    </svg>
                    {connecting ? 'Connecting…' : `Talk to ${agent.name}`}
                  </button>
                )}
                <Link
                  href={stage.href}
                  className="theme-link-muted text-sm font-semibold hover:text-[var(--brand)]"
                >
                  Explore {stage.industry} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Now showing {agent.name}, {stage.industry}
      </p>
    </section>
  );
}
