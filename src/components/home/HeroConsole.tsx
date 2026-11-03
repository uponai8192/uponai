'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AgentEditor, AgentsPage, CreateAgentModal, Dashboard, NewAgentForm } from './HeroConsoleScenes';
import './hero-console.css';

// The UponAI Admin, drawn in the page and played as a short scripted tour:
// the operations dashboard, then a cursor creates an agent from the agents
// page, names it in the create form and writes its prompt in the editor, and
// publishes it. Then it starts over. The scenes live in HeroConsoleScenes.
//
// It is laid out on a fixed canvas and scaled to the frame (hero-console.css),
// because under the hero choreography the frame is laid out at full-screen
// size and scaled down to rest. Scaling one fixed canvas keeps the text crisp
// at every step and the composition the same at every width.
//
// The tour only advances while the console is on screen, and reduced motion
// gets the dashboard as a still.

type Scene = 'dashboard' | 'agents' | 'modal' | 'form' | 'editor';

// Each step holds for `hold` ms with the cursor parked on `cursor` (a
// data-hc-target in the scene), and clicks it just before the next step.
const STEPS: { scene: Scene; path: string; hold: number; cursor?: string; click?: boolean }[] = [
  { scene: 'dashboard', path: 'dashboard', hold: 4600 },
  { scene: 'agents', path: 'agents', hold: 1500, cursor: 'create', click: true },
  { scene: 'modal', path: 'agents', hold: 1300, cursor: 'single', click: true },
  { scene: 'modal', path: 'agents', hold: 1300, cursor: 'modal-create', click: true },
  { scene: 'form', path: 'agents/new', hold: 2200, cursor: 'name' },
  { scene: 'form', path: 'agents/new', hold: 1100, cursor: 'form-create', click: true },
  { scene: 'editor', path: 'agents/agent_4f1c09e7b2/edit', hold: 3400, cursor: 'prompt' },
  { scene: 'editor', path: 'agents/agent_4f1c09e7b2/edit', hold: 1000, cursor: 'publish', click: true },
  { scene: 'editor', path: 'agents/agent_4f1c09e7b2/edit', hold: 3000, cursor: 'publish' },
];

const NAV = ['Dashboard', 'Administration', 'Customer Analytics', 'Live Monitoring', 'Call History', 'VoIP Administration', 'Agents', 'Agent Functions'];

function useTour() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const el = ref.current;
    if (!el) return () => mq.removeEventListener('change', sync);
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      mq.removeEventListener('change', sync);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced || !running || paused) return;
    const t = setTimeout(() => {
      if (step >= STEPS.length - 1) {
        setCycle((c) => c + 1);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, STEPS[step].hold);
    return () => clearTimeout(t);
  }, [step, running, paused, reduced]);

  // One flag holds the script and the CSS animations alike, so a step never
  // resumes with its click already spent.
  const held = !running || paused;
  return { ref, step: reduced ? 0 : step, cycle, reduced, held, paused, togglePaused: () => setPaused((p) => !p) };
}

export default function HeroConsole() {
  const { ref, step, cycle, reduced, held, paused, togglePaused } = useTour();
  const canvasRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const current = STEPS[step];
  const { scene } = current;

  // The cursor glides to the centre of this step's target. Positions come
  // from the layout offsets, which are canvas pixels already and ignore every
  // transform: the canvas scale, the dolly, the tilt and the entrance rises.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    const target = current.cursor && canvas.querySelector<HTMLElement>(`[data-hc-target="${current.cursor}"]`);
    if (!target) {
      cursor.style.opacity = '0';
      return;
    }
    let x = Math.min(target.offsetWidth / 2, 120);
    let y = target.offsetHeight / 2;
    for (let el: HTMLElement | null = target; el && el !== canvas; el = el.offsetParent as HTMLElement | null) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }
    cursor.style.opacity = '1';
    cursor.style.translate = `${x}px ${y}px`;
  }, [step, cycle, current.cursor]);

  return (
    <>
    <div
      ref={ref}
      role="img"
      aria-label="The UponAI Admin: the operations dashboard, then a new voice agent created from a template, named, given its prompt and published"
      className="hc-fit absolute inset-0"
      data-held={held || undefined}
    >
      <div ref={canvasRef} aria-hidden className="hc relative flex flex-col bg-[var(--background)]">
        {/* Window chrome */}
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface-inset)] px-3">
          <div className="flex gap-1.5">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="mx-auto flex h-6 w-full max-w-[460px] items-center justify-center gap-1.5 truncate rounded-md bg-[var(--surface-solid)] px-3 text-[10.5px] text-[var(--text-soft)]">
            <span className="text-[var(--text-subtle)]">admin-panel.upon-ai.com/admin/</span>
            <span key={current.path} className="hc-in truncate text-[var(--text-strong)]">
              {current.path}
            </span>
          </div>
          <span className="w-[42px]" />
        </div>

        {/* Admin nav */}
        <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[var(--border)] bg-[var(--surface-solid)] px-3">
          <span className="mr-2 flex items-center gap-1.5 text-[13px] font-bold text-[var(--brand)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            UponAI Admin
          </span>
          {NAV.map((item) => {
            const active = item === (scene === 'dashboard' ? 'Dashboard' : 'Agents');
            return (
              <span
                key={item}
                className={`whitespace-nowrap rounded-md px-2 py-1 text-[10.5px] font-medium transition-colors duration-300 ${
                  active ? 'bg-[var(--brand-primary-bg)] text-[var(--brand)]' : 'hidden text-[var(--text-body)] md:inline'
                }`}
              >
                {item}
              </span>
            );
          })}
          <span className="ml-auto flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--brand)] text-[9px] font-bold text-[#fff]">JM</span>
            <span className="hidden leading-tight md:block">
              <span className="block text-[10px] font-semibold">Jordan Miles</span>
              <span className="block text-[8px] font-semibold tracking-[0.06em] text-[var(--brand)]">ADMINISTRATOR</span>
            </span>
          </span>
        </div>

        {/* The page */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div key={`${cycle}-${scene === 'modal' ? 'agents' : scene}`} className="hc-scene absolute inset-0">
            {scene === 'dashboard' && <Dashboard reduced={reduced} />}
            {(scene === 'agents' || scene === 'modal') && <AgentsPage />}
            {scene === 'form' && <NewAgentForm />}
            {scene === 'editor' && <AgentEditor published={step >= 8} />}
          </div>
          {scene === 'modal' && <CreateAgentModal key={`modal-${cycle}`} picked={step >= 3} />}
        </div>

        {/* Scripted cursor, with a click ring just before the step ends */}
        <div ref={cursorRef} className="hc-cursor pointer-events-none absolute left-0 top-0 z-10 opacity-0">
          <svg viewBox="0 0 20 20" className="h-5 w-5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
            <path d="M3 2l12.5 7.2-5.6 1.4-2.6 5.4z" fill="#fff" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          {current.click && (
            <span
              key={`${cycle}-${step}`}
              className="hc-click absolute -left-2 -top-2 h-6 w-6 rounded-full border-2 border-[var(--brand)]"
              style={{ animationDelay: `${Math.max(current.hold - 420, 760)}ms` }}
            />
          )}
        </div>
      </div>
    </div>
    {/* The tour loops, so it gets a pause (WCAG 2.2.2). It sits outside the
        image so it stays a real, focusable control. */}
    {!reduced && (
      <button
        type="button"
        onClick={togglePaused}
        aria-label={paused ? 'Play the admin tour' : 'Pause the admin tour'}
        className="theme-menu absolute bottom-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full text-[var(--brand)] opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
        </svg>
      </button>
    )}
    </>
  );
}
