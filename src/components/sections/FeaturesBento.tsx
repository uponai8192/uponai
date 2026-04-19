'use client';

// Rich bento-grid features display — replaces the boring checkmark list.
// First card spans 2 columns and gets a featured blue gradient.
// Icons and accent colors rotate to break visual monotony.

const ICONS = [
  // phone
  <svg key="phone" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>,
  // shield-check
  <svg key="shield" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // clock
  <svg key="clock" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // chart
  <svg key="chart" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  // lightning
  <svg key="lightning" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  // mobile
  <svg key="mobile" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  // chat
  <svg key="chat" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // globe
  <svg key="globe" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // users
  <svg key="users" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // lock
  <svg key="lock" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>,
  // wifi
  <svg key="wifi" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>,
  // server
  <svg key="server" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>,
];

// Accent palettes — each card gets one of these rotating
const ACCENTS = [
  { icon: 'text-blue-400',   iconBg: 'bg-blue-500/15',   border: 'border-blue-500/20',   glow: 'group-hover:border-blue-500/50',  gradient: 'from-blue-600/10 to-transparent' },
  { icon: 'text-violet-400', iconBg: 'bg-violet-500/15', border: 'border-violet-500/20', glow: 'group-hover:border-violet-500/50',gradient: 'from-violet-600/10 to-transparent' },
  { icon: 'text-emerald-400',iconBg: 'bg-emerald-500/15',border: 'border-emerald-500/20',glow: 'group-hover:border-emerald-500/50',gradient: 'from-emerald-600/10 to-transparent'},
  { icon: 'text-cyan-400',   iconBg: 'bg-cyan-500/15',   border: 'border-cyan-500/20',   glow: 'group-hover:border-cyan-500/50',  gradient: 'from-cyan-600/10 to-transparent' },
  { icon: 'text-amber-400',  iconBg: 'bg-amber-500/15',  border: 'border-amber-500/20',  glow: 'group-hover:border-amber-500/50', gradient: 'from-amber-600/10 to-transparent' },
  { icon: 'text-rose-400',   iconBg: 'bg-rose-500/15',   border: 'border-rose-500/20',   glow: 'group-hover:border-rose-500/50',  gradient: 'from-rose-600/10 to-transparent' },
];

interface Props {
  features: string[];
  title?: string;
  subtitle?: string;
  accentColor?: 'blue' | 'violet' | 'emerald' | 'cyan' | 'amber';
}

export default function FeaturesBento({ features, title, subtitle, accentColor = 'blue' }: Props) {
  const accentIdx = { blue: 0, violet: 1, emerald: 2, cyan: 3, amber: 4 }[accentColor] ?? 0;

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-10">
          {title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>}
          {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {features.map((feature, i) => {
          const acc = ACCENTS[(i + accentIdx) % ACCENTS.length];
          const icon = ICONS[i % ICONS.length];
          const isFeatured = i === 0;
          const isWide = i === 0 || (features.length % 3 === 2 && i === features.length - 1);

          return (
            <div
              key={feature}
              className={`
                group relative rounded-2xl border bg-slate-800/40 overflow-hidden
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30
                ${acc.border} ${acc.glow}
                ${isFeatured ? 'lg:col-span-2 p-8' : 'p-6'}
                ${isWide && !isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''}
              `}
            >
              {/* Gradient wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${acc.gradient} pointer-events-none`} />

              {/* Featured top bar */}
              {isFeatured && (
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${acc.gradient.replace('from-', 'from-').replace('to-transparent', 'to-blue-400/60')}`} />
              )}

              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${acc.iconBg} ${acc.icon} mb-4 ${isFeatured ? 'w-14 h-14' : ''}`}>
                  {icon}
                </div>

                {/* Feature text */}
                <p className={`font-semibold text-white leading-snug ${isFeatured ? 'text-xl' : 'text-base'}`}>
                  {feature}
                </p>

                {/* Featured card gets a checkmark badge */}
                {isFeatured && (
                  <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium ${acc.icon} opacity-80`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Included in every plan
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
