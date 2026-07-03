'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  { n: '01', label: 'Prompt & guardrails' },
  { n: '02', label: 'Brain · voice · language' },
  { n: '03', label: 'Tools & functions' },
  { n: '04', label: 'Knowledge base' },
  { n: '05', label: 'Telephony & CRM' },
  { n: '06', label: 'Test, deploy, improve' },
];

export default function GraceBuildThread() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          ob.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // Opaque fill so the connecting line passes behind the circle (not through the number).
  const dotClass = (active: boolean) =>
    `relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-xs font-bold transition-all duration-500 ${
      active
        ? 'border border-[#1e78cc] text-[#4ade80] shadow-[0_0_16px_rgba(30, 120, 204,0.35)]'
        : 'theme-subtle border border-[var(--border-strong)]'
    }`;

  return (
    <div ref={ref}>
      {/* Desktop — horizontal thread */}
      <div className="relative hidden md:block">
        <div className="absolute h-[2px] bg-[var(--border-strong)]" style={{ top: 19, left: '8.33%', right: '8.33%' }} />
        <div
          className="absolute h-[2px] bg-[#1e78cc]"
          style={{ top: 19, left: '8.33%', width: inView ? '83.34%' : 0, transition: 'width 1.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s', boxShadow: '0 0 12px rgba(30, 120, 204,0.5)' }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="flex w-[16%] flex-col items-center text-center"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s ease', transitionDelay: `${0.2 + i * 0.24}s` }}
            >
              <div className={dotClass(inView)} style={{ transitionDelay: `${0.2 + i * 0.24}s` }}>{step.n}</div>
              <p className="mt-3 text-xs leading-snug theme-body">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical thread */}
      <div className="relative md:hidden">
        <div className="absolute w-[2px] bg-[var(--border-strong)]" style={{ left: 19, top: 20, bottom: 20 }} />
        <div
          className="absolute w-[2px] bg-[#1e78cc]"
          style={{ left: 19, top: 20, height: inView ? 'calc(100% - 40px)' : 0, transition: 'height 1.9s cubic-bezier(0.25,0.1,0.25,1) 0.1s' }}
        />
        <div className="relative flex flex-col gap-5">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="flex items-center gap-4"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(8px)', transition: 'all 0.5s ease', transitionDelay: `${0.2 + i * 0.2}s` }}
            >
              <div className={dotClass(inView)} style={{ transitionDelay: `${0.2 + i * 0.2}s` }}>{step.n}</div>
              <p className="text-sm theme-body">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
