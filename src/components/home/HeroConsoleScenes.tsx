'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

// The screens of the UponAI Admin walkthrough in HeroConsole, redrawn from
// the product's own dashboard, agents, create and editor pages. The data is
// invented: the real admin shows customer workspaces and spend, which do not
// belong on a public page. Elements the scripted cursor visits carry a
// data-hc-target id that HeroConsole looks up.

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

/* ---------- Dashboard ---------- */

const VOLUME = [510, 445, 490, 405, 150, 70, 545, 565, 780, 480, 400, 60, 190, 370];
const DAYS = ['Sep 22', 'Sep 24', 'Sep 26', 'Sep 28', 'Sep 30', 'Oct 2', 'Oct 4'];

// A smooth line through the points: each segment is a cubic whose handles sit
// a third of the way along, level with its end points.
function volumePath(w: number, h: number) {
  const pts = VOLUME.map((v, i) => [(i / (VOLUME.length - 1)) * w, h - (v / 800) * h]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const dx = (x1 - x0) / 3;
    d += ` C${x0 + dx},${y0} ${x1 - dx},${y1} ${x1},${y1}`;
  }
  return { d, pts };
}

export function Dashboard({ reduced }: { reduced: boolean }) {
  const { d, pts } = volumePath(560, 150);
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <section
        className="hc-in flex items-center justify-between rounded-xl border border-[var(--border)] bg-[linear-gradient(110deg,var(--surface-solid),var(--brand-accent-bg))] px-5 py-4"
        style={delay(0)}
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">Welcome back</div>
          <div className="mt-1 text-[20px] font-bold tracking-tight">Hello Jordan, here&apos;s your AI operations pulse</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[var(--text-soft)]">
            <Glyph name="bolt" /> Live metrics refreshed each visit
          </div>
        </div>
        <div className="hidden gap-2 md:flex">
          {[
            ['Active workspaces', 18],
            ['Calls (7d)', 3412],
            ['Agents connected', 214],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[var(--border)] bg-[var(--surface-solid)] px-3 py-2">
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)]">{label}</div>
              <div className="mt-0.5 text-[17px] font-bold tabular-nums">
                <CountUp to={value as number} reduced={reduced} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-[14px] font-semibold">Platform Pulse</div>
          <div className="text-[10.5px] text-[var(--text-soft)]">A snapshot of everything running across UponAI.</div>
        </div>
        <span className="hidden text-[10.5px] font-medium text-[var(--text-soft)] md:inline">View Audit Logs</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'Total workspaces', value: 126, foot: 'Active 24 · Billing current', hue: 250 },
          { label: 'AI agents', value: 941, foot: 'Active in 30d 312', hue: 160 },
          { label: 'Users', value: 268, foot: 'Admins 14 · End users 41', hue: 200 },
          { label: 'Calls today', value: 412, foot: 'Avg handle 41s', hue: 80 },
        ].map((card, i) => (
          <div
            key={card.label}
            className={`hc-in rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-3 ${i > 1 ? 'hidden md:block' : ''}`}
            style={delay(0.08 + i * 0.06)}
          >
            <div className="flex items-start justify-between">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)]">{card.label}</span>
              <span
                className="grid h-6 w-6 place-items-center rounded-md"
                style={{ background: `oklch(72% 0.12 ${card.hue} / 0.18)`, color: `oklch(58% 0.13 ${card.hue})` }}
              >
                <Glyph name="spark" />
              </span>
            </div>
            <div className="text-[22px] font-bold leading-tight tabular-nums">
              <CountUp to={card.value} reduced={reduced} />
            </div>
            <div className="text-[10px] text-[var(--text-soft)]">{card.foot}</div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[1.75fr_1fr]">
        <div className="hc-in flex min-h-0 flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-4" style={delay(0.3)}>
          <div className="text-[14px] font-semibold">Call Volume (14 days)</div>
          <div className="text-[10.5px] text-[var(--text-soft)]">Track the cadence of outreach and inbound calls platform-wide.</div>
          <svg viewBox="-6 -8 572 182" className="mt-2 min-h-[90px] w-full flex-1" preserveAspectRatio="none">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" x2="560" y1={i * 37.5} y2={i * 37.5} stroke="var(--border)" strokeWidth="1" />
            ))}
            <path d={`${d} L560,150 L0,150 Z`} className="hc-area" fill="var(--brand-accent-bg)" />
            <path d={d} pathLength={1} className="hc-draw" fill="none" stroke="var(--brand)" strokeWidth="2.2" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.2" className="hc-dot" style={delay(0.55 + i * 0.07)} fill="var(--brand)" />
            ))}
            {DAYS.map((day, i) => (
              <text key={day} x={(i / (DAYS.length - 1)) * 560} y="170" textAnchor="middle" fontSize="9" fill="var(--text-subtle)">
                {day}
              </text>
            ))}
          </svg>
        </div>
        <div className="hc-in hidden flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-4 md:flex" style={delay(0.38)}>
          <div className="text-[14px] font-semibold">Call Outcomes (30 days)</div>
          <div className="text-[10.5px] text-[var(--text-soft)]">Disposition mix to surface campaign performance.</div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] text-[var(--text-soft)]">
            {[
              ['Completed', 'var(--brand)'],
              ['Failed', 'var(--hc-ok)'],
              ['Not connected', 'var(--hc-warn)'],
              ['In progress', 'oklch(62% 0.16 300)'],
            ].map(([label, color]) => (
              <span key={label} className="flex items-center gap-1">
                <span className="h-2 w-3 rounded-sm" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
          <div className="grid flex-1 place-items-center">
            <svg viewBox="0 0 100 100" className="h-[120px] w-[120px] -rotate-90">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--surface-inset)" strokeWidth="14" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--brand)" strokeWidth="14" pathLength={100} strokeDasharray="91 100" className="hc-ring" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--hc-ok)" strokeWidth="14" pathLength={100} strokeDasharray="4 100" strokeDashoffset="-91" className="hc-ring" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--hc-warn)" strokeWidth="14" pathLength={100} strokeDasharray="5 100" strokeDashoffset="-95" className="hc-ring" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Agents and the create modal ---------- */

const WORKSPACES = [
  'Acme Dental Group',
  'Brightside Dental',
  'Cedar Legal',
  'Delta Home Services',
  'Evergreen Clinic',
  'Foxhill Auto',
  'Granite Insurance',
  'Harbor Telecom',
  'Ironwood Plumbing',
  'Juniper Spa',
  'Keystone Realty',
];

export function AgentsPage() {
  return (
    <div className="flex h-full gap-3 p-4">
      <aside className="hidden w-[200px] shrink-0 flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-3 md:flex">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.08em]">Workspaces</div>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--border)] px-2 py-1.5 text-[10.5px] text-[var(--text-subtle)]">
          <Glyph name="search" /> Search workspaces…
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11.5px] font-medium">
          <Glyph name="grid" /> All Agents
        </div>
        <div className="mt-1 flex flex-col overflow-hidden">
          {WORKSPACES.map((ws) => (
            <div key={ws} className="flex items-center gap-2 py-[7px] text-[11px] font-medium text-[var(--text-body)]">
              <span className="text-[var(--text-subtle)]">›</span>
              <Glyph name="building" />
              <span className="truncate">{ws}</span>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <span className="flex-1 text-[13px] font-semibold">Select a workspace to view agents</span>
          <span className="hidden items-center gap-2 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[10.5px] text-[var(--text-subtle)] md:flex">
            <Glyph name="search" /> Search agents by name or ID…
          </span>
          <span className="hidden rounded-lg bg-[var(--hc-ok)] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#fff] md:inline">Import</span>
          <span data-hc-target="create" className="rounded-lg bg-[var(--brand)] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#fff]">
            + Create an Agent
          </span>
        </div>
        <div className="grid flex-1 place-items-center text-[11.5px] text-[var(--text-subtle)]">Pick a workspace on the left, or create a new agent.</div>
      </div>
    </div>
  );
}

const TYPES = [
  { name: 'Single Prompt', blurb: 'Easy to start. Simple, free-form conversations.', hue: 160 },
  { name: 'Multiprompt', blurb: 'Chain multiple prompt states for structured conversations.', hue: 70 },
  { name: 'Conversation Flow', blurb: 'Production-ready, deterministic conversations.', hue: 300 },
];

const TEMPLATES = [
  { name: 'Build from scratch', blurb: 'Start with a blank agent', tags: [] },
  { name: 'Customer Support', blurb: 'Answers questions and opens tickets', tags: ['System', 'EN'] },
  { name: 'Outbound Sales', blurb: 'Qualifies leads and books demos', tags: ['System', 'EN'] },
  { name: 'After Hours Emergency Transfer', blurb: 'Takes a message, transfers emergencies', tags: ['Custom', 'EN'] },
  { name: 'Medical / Dr. Office', blurb: 'Books visits and answers insurance questions', tags: ['Custom', 'MULTI'] },
  { name: 'Car Dealership', blurb: 'Service bookings and sales enquiries', tags: ['Custom', 'MULTI'] },
];

export function CreateAgentModal({ picked }: { picked: boolean }) {
  return (
    <div className="hc-overlay absolute inset-0 grid place-items-center bg-[rgba(2,8,20,0.45)] p-4">
      <div className="hc-pop flex max-h-full w-full max-w-[720px] flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="text-[13px] font-semibold">Create agent</span>
          <span className="text-[var(--text-subtle)]">✕</span>
        </div>
        {/* Clips rather than pushing the footer out, so Create agent always shows. */}
        <div className="min-h-0 overflow-hidden px-4 pt-3">
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">Type</div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
            {TYPES.map((t, i) => (
              <div
                key={t.name}
                data-hc-target={i === 0 ? 'single' : undefined}
                className={`rounded-lg border p-2.5 transition-colors duration-300 ${
                  i === 0 ? 'border-[var(--brand)] bg-[var(--brand-primary-bg)]' : 'border-[var(--border)]'
                } ${i > 0 ? 'hidden md:block' : ''}`}
              >
                <span
                  className="grid h-5 w-5 place-items-center rounded-md"
                  style={{ background: `oklch(72% 0.12 ${t.hue} / 0.22)`, color: `oklch(58% 0.14 ${t.hue})` }}
                >
                  <Glyph name="bolt" />
                </span>
                <div className="mt-1.5 text-[11.5px] font-semibold">{t.name}</div>
                <div className="text-[9.5px] leading-snug text-[var(--text-soft)]">{t.blurb}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">Templates</div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-lg border p-2.5 transition-colors duration-300 ${
                  i === 0
                    ? picked
                      ? 'border-[var(--brand)] bg-[var(--brand-primary-bg)]'
                      : 'border-dashed border-[var(--border-strong)]'
                    : 'border-[var(--border)]'
                } ${i > 1 ? 'hidden md:block' : ''}`}
              >
                <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--surface-inset)] text-[var(--text-soft)]">
                  <Glyph name={i === 0 ? 'plus' : 'doc'} />
                </span>
                <div className="mt-1.5 truncate text-[11px] font-semibold">{t.name}</div>
                <div className="truncate text-[9.5px] text-[var(--text-soft)]">{t.blurb}</div>
                {t.tags.length > 0 && (
                  <div className="mt-1.5 flex gap-1">
                    {t.tags.map((tag) => (
                      <span key={tag} className="rounded bg-[var(--surface-inset)] px-1.5 py-px text-[8.5px] font-semibold text-[var(--text-soft)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-end gap-2 border-t border-[var(--border)] px-4 py-3">
          <span className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-[11px] font-medium">Cancel</span>
          <span data-hc-target="modal-create" className="rounded-lg bg-[var(--brand)] px-3 py-1.5 text-[11px] font-semibold text-[#fff]">
            Create agent
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Create A New Agent ---------- */

export function NewAgentForm() {
  return (
    <div className="flex h-full justify-center p-4">
      <div className="flex w-full max-w-[880px] flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-4">
        <div className="text-[10px] text-[var(--brand)]">
          Agents <span className="text-[var(--text-subtle)]">/ Create New Agent</span>
        </div>
        <div className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">Agent creation</div>
        <div className="text-[20px] font-bold tracking-tight">Create A New Agent</div>
        <div className="mt-0.5 text-[10.5px] text-[var(--text-soft)]">
          Build a new agent for <b className="text-[var(--text-strong)]">Brightside Dental</b> using the voice, language and LLM options in your builder scope.
        </div>
        <div className="mt-2 hidden gap-2 md:flex">
          {[
            ['Workspace', 'Brightside'],
            ['Voices', '300'],
            ['LLMs', '21'],
            ['Languages', '65'],
          ].map(([label, value]) => (
            <div key={label} className="w-[96px] rounded-lg bg-[var(--surface-inset)] px-2.5 py-1.5">
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)]">{label}</div>
              <div className="text-[14px] font-bold">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-[var(--border)] p-3">
            <div className="text-[12px] font-semibold">Core Settings</div>
            <div className="text-[9.5px] text-[var(--text-soft)]">Set the basics first, then choose the voice and prompt behavior.</div>
            <Field label="Prompt mode" value="Single Prompt" />
            <Field label="Agent name" target="name" active>
              <Typed text="Grace" ms={900} caret />
            </Field>
            <div className="hidden md:block">
              <Field label="Agent channel" value="Voice Agent" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="LLM model" value="claude-4.5-haiku" />
              <Field label="Language" value="English (US)" />
            </div>
          </div>
          <div className="hidden rounded-lg border border-[var(--border)] p-3 md:block">
            <div className="text-[12px] font-semibold">Voice Selection</div>
            <div className="text-[9.5px] text-[var(--text-soft)]">Pick the starting voice for this workspace.</div>
            <div className="mt-2 rounded-lg border border-[var(--border)] p-2.5">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/agents/healthcare.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-[11.5px] font-semibold">Cleo</div>
                  <div className="text-[9.5px] text-[var(--text-subtle)]">cartesia-Cleo</div>
                </div>
                <span className="rounded-md bg-[var(--brand)] px-2 py-1 text-[9.5px] font-semibold text-[#fff]">Change Voice</span>
              </div>
              <div className="mt-2 flex gap-1">
                {['cartesia', 'American', 'female'].map((tag) => (
                  <span key={tag} className="rounded-full bg-[var(--surface-inset)] px-2 py-0.5 text-[9px] text-[var(--text-soft)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="hidden text-[9.5px] text-[var(--text-subtle)] md:inline">Create the agent now and continue in the full editor.</span>
          <div className="flex gap-2">
            <span className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-[11px] font-medium">Cancel</span>
            <span data-hc-target="form-create" className="rounded-lg bg-[var(--brand)] px-3 py-1.5 text-[11px] font-semibold text-[#fff]">
              Create &amp; Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  target,
  active,
  children,
}: {
  label: string;
  value?: string;
  target?: string;
  active?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="mt-2">
      <div className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">{label}</div>
      <div
        data-hc-target={target}
        className={`mt-1 rounded-md border px-2.5 py-1.5 text-[11px] transition-shadow duration-300 ${
          active ? 'border-[var(--brand)] shadow-[0_0_0_3px_var(--brand-primary-bg)]' : 'border-[var(--border)]'
        }`}
      >
        {children ?? value}
      </div>
    </div>
  );
}

/* ---------- Agent editor ---------- */

const PROMPT =
  'You are Grace, the front desk for Brightside Dental. Book and reschedule visits, answer insurance questions, and keep replies short and warm. Transfer dental emergencies to the on-call dentist.';

const SECTIONS = ['Functions', 'Knowledge Base', 'Speech Settings', 'Call Settings', 'Post-Call Analysis', 'Webhook Settings', 'SMS Notifications', 'MCPs'];

export function AgentEditor({ published }: { published: boolean }) {
  return (
    <div className="relative flex h-full gap-3 p-4">
      <div className="hidden w-[38px] shrink-0 flex-col items-center gap-3 pt-1 text-[8px] text-[var(--text-soft)] md:flex">
        <span className="flex flex-col items-center gap-0.5 rounded-md bg-[var(--brand-primary-bg)] px-1 py-1 text-[var(--brand)]">
          <Glyph name="bot" />
          Agent
        </span>
        <span className="flex flex-col items-center gap-0.5">
          <Glyph name="flow" />
          Workflow
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="text-[10px] text-[var(--brand)]">
          Dashboard / Agents / <span className="text-[var(--text-soft)]">Grace</span>
          <span className="ml-2 text-[var(--text-subtle)]">Workspace · Brightside Dental</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold">Grace</span>
              <span className="text-[10.5px] text-[var(--brand)]">Edit</span>
            </div>
            <div className="mt-1 flex gap-2 font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-soft)]">
              <span className="rounded bg-[var(--surface-inset)] px-1.5 py-0.5">AGENT ID agent_4f1c09e7b2…</span>
              <span className="hidden rounded bg-[var(--surface-inset)] px-1.5 py-0.5 md:inline">LLM ID llm_9a3e51d0c8…</span>
            </div>
          </div>
          <span key={String(published)} className="hc-in text-[10.5px] font-medium tabular-nums text-[var(--text-soft)]" style={delay(0)}>
            {published ? 'V1' : 'V0'}
          </span>
          <span
            data-hc-target="publish"
            className={`rounded-md px-2.5 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${
              published ? 'bg-[var(--hc-ok-soft)] text-[var(--hc-ok)]' : 'text-[var(--brand)]'
            }`}
          >
            {published ? '✓ Published' : 'Publish'}
          </span>
          <span className="hidden text-[10.5px] font-medium md:inline">Test actions</span>
        </div>
        <div className="hidden gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-2.5 md:flex">
          {[
            ['Model', 'claude-4.5-haiku', 'ANTHROPIC'],
            ['Voice', 'Cleo', ''],
            ['Language', 'English (US)', ''],
            ['Max duration', '10 min', ''],
            ['Guidelines', 'Agent Handbook', ''],
          ].map(([label, value, sub]) => (
            <div key={label}>
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)]">{label}</div>
              <div className="mt-1 flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2 py-1 text-[10.5px] font-medium">
                {label === 'Voice' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/agents/healthcare.webp" alt="" width={16} height={16} className="h-4 w-4 rounded-full object-cover" />
                )}
                {value}
                {sub && <span className="text-[8px] font-semibold text-[var(--text-subtle)]">{sub}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[13px] font-semibold">General Prompt</div>
              <div className="text-[10px] text-[var(--text-soft)]">Describe how the agent should behave, what knowledge it can reference, and guardrails.</div>
            </div>
            <span className="rounded-md bg-[var(--brand-primary-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--brand)]">Save changes</span>
          </div>
          <div
            data-hc-target="prompt"
            className="mt-2 flex-1 rounded-lg border border-[var(--brand)] p-3 text-[11.5px] leading-relaxed shadow-[0_0_0_3px_var(--brand-primary-bg)]"
          >
            <Typed text={PROMPT} ms={2400} done={published} caret={!published} />
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium">
            <span className="text-[var(--hc-warn)]">
              <Glyph name="spark" />
            </span>
            Generate with AI
          </div>
        </div>
      </div>
      <aside className="hidden w-[200px] shrink-0 flex-col gap-1.5 pt-[26px] md:flex">
        {SECTIONS.map((s) => (
          <div key={s} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-solid)] px-2.5 py-2 text-[10.5px] font-medium">
            {s}
            <span className="text-[var(--text-subtle)]">⌄</span>
          </div>
        ))}
      </aside>
      {published && (
        <div className="hc-in absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-solid)] px-3 py-2 text-[11px] font-medium shadow-xl" style={delay(0.15)}>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--hc-ok-soft)] text-[var(--hc-ok)]">✓</span>
          Grace is live on (512) 555-0148
        </div>
      )}
    </div>
  );
}

/* ---------- Shared ---------- */

function CountUp({ to, reduced }: { to: number; reduced: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    let raf = requestAnimationFrame(function step(now) {
      const t = Math.min(1, (now - start) / 1100);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [to, reduced]);
  return <>{(reduced ? to : value).toLocaleString('en-US')}</>;
}

// Types the text out over `ms`, then stops its timer. `done` shows it whole.
function Typed({ text, ms, done, caret }: { text: string; ms: number; done?: boolean; caret?: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (done) return;
    let typed = 0;
    const t = setInterval(() => {
      typed += 1;
      setN(typed);
      if (typed >= text.length) clearInterval(t);
    }, ms / text.length);
    return () => clearInterval(t);
  }, [text, ms, done]);
  return (
    <>
      {done ? text : text.slice(0, n)}
      {caret && <span className="hc-caret ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-[var(--text-strong)]" />}
    </>
  );
}

const GLYPHS = {
  bolt: 'M11 2.5L4.5 11H10l-1 6.5L15.5 9H10z',
  spark: 'M10 2.5l1.6 4.4 4.4 1.6-4.4 1.6L10 14.5l-1.6-4.4L4 8.5l4.4-1.6z',
  search: 'M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM13.5 13.5L17 17',
  grid: 'M3.5 3.5h5v5h-5zM11.5 3.5h5v5h-5zM3.5 11.5h5v5h-5zM11.5 11.5h5v5h-5z',
  building: 'M4.5 17V3.5h8V17M12.5 8h3V17M7 6.5h3M7 9.5h3M7 12.5h3M3 17h14',
  plus: 'M10 4v12M4 10h12',
  doc: 'M5.5 2.5h6l3.5 3.5v11.5h-9.5zM11 2.5V6.5h4',
  bot: 'M5 7.5h10v8H5zM10 4v3.5M7.5 11h.01M12.5 11h.01M3 11v2M17 11v2',
  flow: 'M4 4h4v4H4zM12 12h4v4h-4zM6 8v3a1 1 0 0 0 1 1h5',
};

function Glyph({ name }: { name: keyof typeof GLYPHS }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
      <path d={GLYPHS[name]} />
    </svg>
  );
}
