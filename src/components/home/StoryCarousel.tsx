'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import AgentAvatar from '@/components/voice/AgentAvatar';
import type { HomeCustomerStory } from '@/lib/home-content';
import { findVerticalAgent, verticalAgentKeys } from '@/lib/vertical-agents';

// Customer stories as a rotating "call replay" carousel. The active progress
// segment is the autoplay clock (see .story-timer in globals.css): the slide
// advances when its animation ends, so keyboard focus, a hidden tab, scrolling
// the carousel offscreen, or the pause button all just pause that animation.
// Mouse hover and clicks deliberately do not pause it: a click leaves focus
// on the button, which would otherwise stop the rotation for good.

const DURATION_MS = 7000;
const SWIPE_PX = 48;

const tintByKey: Record<string, string> = {
  healthcare: '20, 184, 166',
  'financial-services': '37, 99, 235',
  legal: '124, 58, 237',
  retail: '236, 72, 153',
  hospitality: '245, 158, 11',
  education: '34, 197, 94',
  government: '14, 165, 233',
};

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

// Deterministic so server and client markup match.
const bars = Array.from({ length: 11 }, (_, i) => ((i * 31) % 105) / 100);

function resolveAgent(story: HomeCustomerStory, index: number) {
  const key = story.agentKey ?? verticalAgentKeys[index % verticalAgentKeys.length];
  const agent = findVerticalAgent(key);
  return {
    key,
    name: agent?.name ?? 'Grace',
    label: agent?.contextLabel ?? 'UponAI agent',
    tint: tintByKey[key] ?? '1, 87, 163',
  };
}

export default function StoryCarousel({ stories }: { stories: HomeCustomerStory[] }) {
  const count = stories.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [rawIndex, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(root);
    const onVisibility = () => setTabHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (count === 0) return null;

  // A CMS revalidation can shrink the list while the page is open.
  const index = Math.min(rawIndex, count - 1);

  const autoplay = !reducedMotion && count > 1;
  const running = autoplay && !userPaused && !focused && !offscreen && !tabHidden;

  const go = (next: number) => setIndex(((next % count) + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // The outgoing slide turns inert, which would drop focus to <body> and lose
  // the keyboard user's place, so focus moves to the carousel first.
  const keepFocus = () => {
    if (document.activeElement?.closest('article')) rootRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      keepFocus();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      keepFocus();
      prev();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (delta <= -SWIPE_PX) next();
    else if (delta >= SWIPE_PX) prev();
  };

  const peek = (offset: number) => (count > Math.abs(offset) * 2 ? (index + offset + count) % count : null);
  const leftPeeks = [peek(-1), peek(-2)];
  const rightPeeks = [peek(1), peek(2)];

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer stories"
      onKeyDown={onKeyDown}
      // Only keyboard focus pauses, so a screen reader or keyboard user can
      // read a slide without it moving on.
      onFocus={(event) => setFocused(event.target.matches(':focus-visible'))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      style={{ '--story-duration': `${DURATION_MS}ms` } as CSSProperties}
    >
      <div className="relative">
        {/* Side peeks: the stories either side, fanned like cards waiting on hold. */}
        {[
          { side: 'left' as const, items: leftPeeks },
          { side: 'right' as const, items: rightPeeks },
        ].map(({ side, items }) => (
          <div
            key={side}
            aria-hidden
            className={`absolute top-1/2 z-0 hidden h-[300px] w-44 -translate-y-1/2 xl:block ${
              side === 'left' ? 'left-0' : 'right-0'
            }`}
          >
            {items.map((storyIndex, depth) => {
              if (storyIndex === null) return null;
              const story = stories[storyIndex];
              const agent = resolveAgent(story, storyIndex);
              const dir = side === 'left' ? -1 : 1;
              return (
                <button
                  key={`${side}-${depth}`}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(storyIndex)}
                  // Solid surface, so the card fanned behind never shows through.
                  className="story-peek theme-card absolute inset-x-0 top-0 flex h-[300px] flex-col overflow-hidden rounded-[22px] bg-[var(--surface-solid)] p-3 text-left"
                  style={{
                    zIndex: 2 - depth,
                    opacity: depth === 0 ? 1 : 0.5,
                    transform: `translateX(${dir * (16 + depth * 44)}px) rotate(${dir * (4 + depth * 4)}deg) scale(${
                      1 - depth * 0.08
                    })`,
                  }}
                >
                  <span
                    className="relative grid flex-1 place-items-center overflow-hidden rounded-[16px]"
                    style={{
                      background: `radial-gradient(160px 160px at 50% 35%, rgba(${agent.tint}, 0.28), transparent 75%), var(--surface-muted)`,
                    }}
                  >
                    <AgentAvatar agentKey={agent.key} name={agent.name} size={96} className="h-24 w-24" />
                  </span>
                  <span className="mt-3 px-1 text-[13px] font-semibold leading-tight text-[var(--text-strong)]">
                    {story.company ?? story.role}
                  </span>
                  <span className="mt-0.5 px-1 pb-1 text-[11px] text-[var(--text-subtle)]">{agent.label}</span>
                </button>
              );
            })}
          </div>
        ))}

        {/* Stage: every slide in one grid cell, so the height never jumps. */}
        <div
          className="relative z-10 mx-auto grid max-w-5xl touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {stories.map((story, i) => {
            const isActive = i === index;
            const state = isActive ? 'active' : (i - index + count) % count <= count / 2 ? 'after' : 'before';
            const agent = resolveAgent(story, i);
            return (
              <article
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isActive}
                inert={!isActive}
                data-state={state}
                className="story-slide theme-panel col-start-1 row-start-1 rounded-[28px] p-2.5 md:p-3"
              >
                <div className="grid gap-2.5 md:grid-cols-2 md:gap-3">
                  {/* Result */}
                  <div className="flex flex-col p-4 sm:p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="theme-pill-primary rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] font-[family-name:var(--font-mono)]">
                        {agent.label}
                      </span>
                      {story.company ? (
                        <span className="text-[13px] text-[var(--text-subtle)]">{story.company}</span>
                      ) : null}
                    </div>

                    {story.metric ? (
                      <div className="mt-7 md:mt-9">
                        <p className="story-metric bg-gradient-to-br from-[var(--brand)] to-[var(--brand-cool)] bg-clip-text pb-1 text-[clamp(3.5rem,9vw,6.25rem)] font-bold leading-[0.9] tracking-[-0.04em] text-transparent font-[family-name:var(--font-display)]">
                          {story.metric}
                        </p>
                        {story.metricLabel ? (
                          <p className="theme-heading mt-2 text-[15px] font-semibold">{story.metricLabel}</p>
                        ) : null}
                      </div>
                    ) : null}

                    <blockquote className="theme-heading mt-7 text-lg leading-snug md:mt-10 md:text-[1.4rem]">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2 md:mt-auto md:pt-10">
                      <div className="flex items-center gap-3">
                        {story.avatarUrl ? (
                          <Image
                            src={story.avatarUrl}
                            alt={story.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 flex-none rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[var(--surface-muted)] text-sm font-bold text-[var(--text-soft)] font-[family-name:var(--font-display)]"
                          >
                            {story.name.replace(/[^A-Za-z]/g, '').charAt(0) || '·'}
                          </span>
                        )}
                        <span className="leading-tight">
                          <b className="theme-heading block text-sm">{story.name}</b>
                          <small className="text-xs text-[var(--text-subtle)]">{story.role}</small>
                        </span>
                      </div>
                      <Link
                        href={story.href ?? '/contact-us-page'}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--text-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--surface-solid)] transition-transform hover:-translate-y-0.5"
                      >
                        Read case study <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Call replay */}
                  <div
                    className="relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-6"
                    style={{
                      backgroundImage: `radial-gradient(420px 300px at 85% 0%, rgba(${agent.tint}, 0.2), transparent 70%), radial-gradient(360px 260px at 0% 100%, var(--wash-2), transparent 70%)`,
                    }}
                  >
                    <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em] font-[family-name:var(--font-mono)]">
                      <span className="inline-flex items-center gap-2 text-[var(--text-soft)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-cool)]" />
                        Call replay
                      </span>
                      {story.callLength ? (
                        <span className="text-[var(--text-subtle)]">{story.callLength}</span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <span className="relative grid h-16 w-16 flex-none place-items-center">
                        {isActive ? (
                          <span
                            aria-hidden
                            className="animate-agent-halo absolute inset-0 rounded-full border border-[var(--brand)]"
                          />
                        ) : null}
                        <span className="relative h-14 w-14 overflow-hidden rounded-full shadow-[0_10px_24px_rgba(var(--shadow-rgb),0.25)]">
                          <AgentAvatar agentKey={agent.key} name={agent.name} size={56} className="h-14 w-14" />
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <b className="theme-heading block text-base">{agent.name}</b>
                        <small className="text-xs text-[var(--text-subtle)]">UponAI voice agent</small>
                      </span>
                      <span aria-hidden className="flex h-6 items-end gap-[3px]">
                        {bars.map((delay, b) => (
                          <span
                            key={b}
                            className={`w-[3px] origin-bottom rounded-full bg-gradient-to-b from-[var(--brand-cool)] to-[var(--brand)] ${
                              isActive ? 'animate-wave-bar' : 'h-1/3'
                            }`}
                            style={{ animationDelay: `${delay}s` }}
                          />
                        ))}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-1 flex-col gap-2.5">
                      {(story.transcript ?? []).map((line, l) => (
                        <p
                          key={l}
                          className={`story-bubble max-w-[88%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-5 ${
                            line.speaker === 'agent'
                              ? 'self-end rounded-br-md bg-gradient-to-br from-[var(--brand)] to-[var(--brand-strong)] text-[#ffffff]'
                              : 'theme-card self-start rounded-bl-md text-[var(--text-body)]'
                          }`}
                          style={{ '--d': `${250 + l * 650}ms` } as CSSProperties}
                        >
                          <span className="sr-only">{line.speaker === 'agent' ? `${agent.name}: ` : 'Caller: '}</span>
                          {line.text}
                        </p>
                      ))}
                    </div>

                    {story.outcome ? (
                      <p
                        className="story-bubble theme-pill-accent mt-5 inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1.5 text-xs font-semibold"
                        style={{ '--d': `${250 + (story.transcript?.length ?? 0) * 650}ms` } as CSSProperties}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
                        </svg>
                        {story.outcome}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {count > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous story"
            className="theme-secondary-button grid h-10 w-10 place-items-center rounded-full"
          >
            <span aria-hidden>←</span>
          </button>

          <div className="flex items-center gap-2 px-1">
            {stories.map((story, i) => {
              const isActive = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Story ${i + 1}: ${story.company ?? story.name}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group grid h-6 place-items-center"
                >
                  <span
                    className={`block h-1.5 overflow-hidden rounded-full bg-[var(--border-strong)] transition-[width] duration-500 ${
                      isActive ? 'w-14' : 'w-6 group-hover:bg-[var(--text-subtle)]'
                    }`}
                  >
                    {isActive ? (
                      <span
                        key={index}
                        data-paused={!running}
                        onAnimationEnd={autoplay ? next : undefined}
                        className="story-timer block h-full w-full rounded-full bg-[var(--brand)]"
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next story"
            className="theme-secondary-button grid h-10 w-10 place-items-center rounded-full"
          >
            <span aria-hidden>→</span>
          </button>

          {autoplay ? (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? 'Play story rotation' : 'Pause story rotation'}
              className="theme-secondary-button ml-1 grid h-10 w-10 place-items-center rounded-full"
            >
              {userPaused ? (
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M4 2.5v11a.5.5 0 0 0 .77.42l8.5-5.5a.5.5 0 0 0 0-.84l-8.5-5.5A.5.5 0 0 0 4 2.5z" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
                </svg>
              )}
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Stays polite; the text is only filled while rotation is stopped, so
          autoplay does not announce every slide. */}
      <p className="sr-only" aria-live="polite">
        {running ? '' : `Story ${index + 1} of ${count}: ${stories[index].company ?? stories[index].name}`}
      </p>
    </div>
  );
}
