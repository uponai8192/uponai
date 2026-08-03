import Image from 'next/image';

// Portrait avatars for the vertical demo agents.
//
// Source renders are 2048px squares; the files served here are cropped to the
// head and shoulders and resized to 320px WebP (about 10KB each). Next image
// optimisation is turned off for this project, so these are pre-optimised
// rather than resized at request time.
//
// Verticals without their own agent fall back to a monogram, since Grace (the
// general website agent) has no portrait.

const portraits: Record<string, string> = {
  healthcare: '/agents/healthcare.webp',
  'financial-services': '/agents/financial-services.webp',
  legal: '/agents/legal.webp',
  retail: '/agents/retail.webp',
  hospitality: '/agents/hospitality.webp',
  education: '/agents/education.webp',
  government: '/agents/government.webp',
};

export default function AgentAvatar({
  agentKey,
  name,
  size = 96,
  className = '',
  priority = false,
}: {
  agentKey: string;
  name: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = portraits[agentKey];

  if (!src) {
    return (
      <span
        className={`grid place-items-center rounded-full font-extrabold text-[#ffffff] ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.36),
          background: 'linear-gradient(150deg, var(--brand), var(--brand-2))',
        }}
        aria-label={`${name}, UponAI voice agent`}
        role="img"
      >
        <span className="font-[family-name:var(--font-display)] leading-none">{name.charAt(0)}</span>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name}, UponAI voice agent`}
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
