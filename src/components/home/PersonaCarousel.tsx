import Link from 'next/link';

const personas = [
  { icon: '🩺', title: 'Healthcare Front Desk', body: 'Schedule, reschedule, and triage patient calls while protecting staff from phone overload.', href: '/voice-ai-for-healthcare-page' },
  { icon: '🏠', title: 'Home Services Dispatch', body: 'Capture service requests, qualify urgency, and route to the right crew without missed jobs.', href: '/voice-ai-for-home-services-page' },
  { icon: '⚖️', title: 'Legal Intake', body: 'Screen new matters, gather case details, and hand qualified leads straight to your team.', href: '/voice-ai-for-legal-services' },
  { icon: '🏘️', title: 'Real Estate Team', body: 'Answer listing inquiries instantly, book showings, and never let a lead go to voicemail.', href: '/voice-ai-real-estate' },
  { icon: '🦷', title: 'Dental Office', body: 'Fill the schedule, confirm visits, and cut no-shows with proactive appointment logic.', href: '/voice-ai-for-dental-offices' },
  { icon: '🍽️', title: 'Restaurant Line', body: 'Take reservations and answer the basics so the phone stops pulling staff off the floor.', href: '/for-restaurant-page' },
];

export default function PersonaCarousel() {
  return (
    <section id="what" className="pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-cool)] font-[family-name:var(--font-mono)]">
            Who We Build For
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">
            Voice workflows shaped around your front line
          </h2>
          <p className="theme-soft mt-3 text-lg">
            Pick the operating environment that matches yours. Every path is tuned to how those calls actually
            move - from first ring to logged outcome.
          </p>
        </div>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {personas.map((p, i) => (
          <Link
            key={p.title}
            href={p.href}
            className="theme-card flex min-h-[210px] w-[260px] flex-none snap-start flex-col justify-between rounded-[18px] p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--brand-cool)]"
          >
            <span className="theme-subtle text-[11px] font-[family-name:var(--font-mono)]">
              Path {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="mb-4 mt-2 grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-primary-bg)] text-[22px]">
                {p.icon}
              </div>
              <h3 className="theme-heading text-[19px] font-semibold">{p.title}</h3>
              <p className="theme-soft mt-2 text-[13.5px]">{p.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
