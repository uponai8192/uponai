'use client';

import { useState } from 'react';
import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';

// Real UponAI platform voices (IDs UponAI-Chloe / UponAI-Leland / UponAI-Sloane).
const voices = [
  { name: 'Chloe', vibe: 'American · warm' },
  { name: 'Leland', vibe: 'American · confident' },
  { name: 'Sloane', vibe: 'American · crisp' },
];
const languages = ['English', 'Spanish', 'Multilingual'];
const tones = ['Warm', 'Sharp', 'Playful'];
const skillList = ['Books appointments', 'Transfers to a human', 'Follows up'];

function greeting(company: string, tone: string) {
  const co = company.trim() || 'Acme Dental';
  if (tone === 'Sharp') return `${co}, this is Grace. How can I help?`;
  if (tone === 'Playful') return `You've reached ${co} — Grace here. What can I get sorted for you?`;
  return `Hi there — thanks so much for calling ${co}! This is Grace. What can I do for you today?`;
}

export default function GraceBuilder() {
  const { openWidget } = useVoiceWidget();
  const [company, setCompany] = useState('');
  const [voice, setVoice] = useState('Chloe');
  const [language, setLanguage] = useState('Multilingual');
  const [tone, setTone] = useState('Warm');
  const [skills, setSkills] = useState<Record<string, boolean>>({
    'Books appointments': true,
    'Transfers to a human': true,
    'Follows up': true,
  });

  const co = company.trim() || 'Acme Dental';

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
      active
        ? 'border border-[#1e78cc]/50 bg-[#1e78cc]/15 text-[#4ade80]'
        : 'theme-card theme-body hover:border-[#1e78cc]/30'
    }`;

  return (
    <div className="theme-panel rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div>
          <label htmlFor="gb-company" className="mb-1.5 block text-xs theme-soft">Your company</label>
          <input
            id="gb-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Dental"
            maxLength={40}
            className="mb-5 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 text-sm theme-heading outline-none transition-colors focus:border-[#1e78cc]/50"
          />

          <p className="mb-2 text-xs theme-soft">Voice</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {voices.map((v) => (
              <button key={v.name} type="button" onClick={() => setVoice(v.name)} className={chip(voice === v.name)}>
                {v.name}
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs theme-soft">Language</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {languages.map((l) => (
              <button key={l} type="button" onClick={() => setLanguage(l)} className={chip(language === l)}>
                {l}
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs theme-soft">Personality</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {tones.map((t) => (
              <button key={t} type="button" onClick={() => setTone(t)} className={chip(tone === t)}>
                {t}
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs theme-soft">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skillList.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={skills[s]}
                onClick={() => setSkills((p) => ({ ...p, [s]: !p[s] }))}
                className={chip(skills[s])}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="theme-card flex flex-col rounded-[1.5rem] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1e78cc] to-[#63ade5] text-lg font-bold text-white">G</div>
            <div>
              <p className="theme-heading font-semibold">Grace</p>
              <p className="theme-subtle text-xs">{voice} · {language}</p>
            </div>
          </div>

          <p className="theme-subtle text-[10px] font-semibold uppercase tracking-[0.2em]">She&apos;d answer with</p>
          <p className="theme-body mt-1.5 min-h-[68px] text-sm leading-relaxed">{greeting(company, tone)}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {skillList.filter((s) => skills[s]).map((s) => (
              <span key={s} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] theme-soft">{s}</span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openWidget({ company: co })}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e78cc] px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(30, 120, 204,0.3)] transition-all hover:bg-[#0157a3] active:scale-[0.98]"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" />
            </svg>
            Hear Grace answer for {co} →
          </button>
          <p className="theme-subtle mt-2 text-center text-xs">Go on — try to stump her.</p>
        </div>
      </div>
    </div>
  );
}
