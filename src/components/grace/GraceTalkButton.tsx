'use client';

import { useVoiceWidget } from '@/components/widget/VoiceWidgetProvider';

type Props = {
  label?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

// Opens the shared Talk-to-Grace demo modal from anywhere on the page.
// The modal itself is rendered once by <LiveVoiceDemo> via the shared provider.
export default function GraceTalkButton({ label = 'Talk to Grace', variant = 'primary', className = '' }: Props) {
  const { openWidget } = useVoiceWidget();

  const base =
    'inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95';
  const styles =
    variant === 'primary'
      ? 'bg-[#1e78cc] text-white shadow-[0_0_28px_rgba(30, 120, 204,0.35)] hover:bg-[#0157a3] hover:shadow-[0_0_36px_rgba(30, 120, 204,0.5)]'
      : 'theme-secondary-button';

  return (
    <button type="button" onClick={() => openWidget()} className={`${base} ${styles} ${className}`}>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z" />
      </svg>
      {label}
    </button>
  );
}
