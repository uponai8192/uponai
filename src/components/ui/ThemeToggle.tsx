'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uponai-theme';
const THEME_EVENT = 'uponai-theme-change';

type Theme = 'dark' | 'light';

const sunIcon = (
  <svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
    <path
      strokeLinecap="round"
      strokeWidth="1.8"
      d="M12 2.5v2.5M12 19v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2.5 12H5M19 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
    />
  </svg>
);

const moonIcon = (
  <svg aria-hidden="true" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.742 15.347A8.77 8.77 0 0 1 13.5 19c-4.832 0-8.75-3.918-8.75-8.75A8.77 8.77 0 0 1 8.403 3.01a.75.75 0 0 1 .884 1.084A7.25 7.25 0 0 0 18.906 13.713a.75.75 0 0 1 1.084.884Z" />
  </svg>
);

function syncTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

export default function ThemeToggle({
  mobile = false,
  compact = false,
}: {
  mobile?: boolean;
  /** Icon-only round button for tight spots like the floating nav capsule. */
  compact?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const updateTheme = () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      setTheme(nextTheme);
    };

    updateTheme();
    window.addEventListener(THEME_EVENT, updateTheme as EventListener);

    return () => {
      window.removeEventListener(THEME_EVENT, updateTheme as EventListener);
    };
  }, []);

  const isLight = theme === 'light';
  const nextTheme = isLight ? 'dark' : 'light';

  if (compact) {
    return (
      <button
        type="button"
        aria-label={`Switch to ${nextTheme} mode`}
        onClick={() => {
          setTheme(nextTheme);
          syncTheme(nextTheme);
        }}
        className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-strong)]"
      >
        {isLight ? moonIcon : sunIcon}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => {
        setTheme(nextTheme);
        syncTheme(nextTheme);
      }}
      className={`group inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-2 text-[var(--text-body)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] ${
        mobile ? 'w-full justify-between' : ''
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="relative inline-flex h-8 w-14 items-center rounded-full border border-[var(--border)] bg-[var(--surface-inset)] p-1">
          <span
            className={`absolute h-6 w-6 rounded-full bg-[var(--surface)] shadow-[0_8px_20px_rgba(var(--shadow-rgb),0.16)] transition-transform duration-300 ${
              isLight ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
          <span className="relative z-10 flex w-full items-center justify-between px-1 text-[10px]">
            <span className={isLight ? 'text-[var(--brand-accent-text)]' : 'text-[var(--text-subtle)]'}>{sunIcon}</span>
            <span className={isLight ? 'text-[var(--text-subtle)]' : 'text-[var(--brand-primary-text)]'}>{moonIcon}</span>
          </span>
        </span>
        <span>
          <span className="block text-[11px] uppercase tracking-[0.24em] text-[var(--text-subtle)]">Theme</span>
          <span className="block text-sm font-semibold text-[var(--text-strong)]">{isLight ? 'Light' : 'Dark'}</span>
        </span>
      </span>
      {!mobile ? (
        <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-subtle)]">{nextTheme}</span>
      ) : null}
    </button>
  );
}
