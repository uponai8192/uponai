'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  uponaiIndustriesMenu,
  uponaiUseCasesMenu,
} from '@/lib/uponai-pages';
import { uponaiBookingUrl } from '@/lib/booking';
import ThemeToggle from '@/components/ui/ThemeToggle';

const chevron = (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

type DropdownLink = { label: string; href: string; external?: boolean };
type DropdownGroup = { heading?: string; links: DropdownLink[] };

const whatWeDoLinks: DropdownLink[] = [
  { label: 'AI Powered Voice Systems', href: '/services/ivr-system' },
  { label: 'AI Powered Chatbots', href: '/services/ai-chatbots' },
  { label: 'Contact Us', href: '/contact-us-page' },
];

const featuresLinks: DropdownLink[] = [
  { label: 'Book Appointment', href: uponaiBookingUrl, external: true },
  { label: 'SIP Integration & Call Transfer', href: '/sip-integrations-and-transfers-685191' },
  { label: 'Recordings', href: '/recordings-page' },
];

const resourcesLinks: DropdownLink[] = [
  { label: 'N8N', href: '/n8n-downloads' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About Us', href: '/about-us-page' },
  { label: 'Trust Center', href: '/trust-center' },
  { label: 'Support', href: 'mailto:support@uponai.com', external: true },
  { label: 'Documentation', href: 'https://documentation.uponai.com/', external: true },
  { label: 'Admin Panel', href: 'https://admin-panel.upon-ai.com/auth/login', external: true },
  { label: 'Stats', href: 'https://stats.uptimerobot.com/vHlC7Zpxfg', external: true },
  { label: 'Partnerships', href: '/upon-ai-partners' },
  { label: 'FAQs', href: '/upon-ai-faqs' },
];

const industryLinks: DropdownLink[] = uponaiIndustriesMenu.map((item) => ({ ...item }));
const useCaseLinks: DropdownLink[] = uponaiUseCasesMenu.map((item) => ({ ...item }));

function Dropdown({
  label,
  groups,
  width = 'w-56',
}: {
  label: string;
  groups: DropdownGroup[];
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-body)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-strong)]"
        onClick={() => {
          cancelClose();
          setOpen((current) => !current);
        }}
      >
        {label}
        {chevron}
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 ${width} pt-3`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="theme-menu rounded-[1.5rem] p-3">
            <div className="grid gap-4 p-1 md:grid-cols-2">
              {groups.map((group) => (
                <div key={group.heading ?? group.links.map((link) => link.label).join('-')}>
                  {group.heading ? (
                    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary-text)]">
                      {group.heading}
                    </p>
                  ) : null}
                  {group.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-3 py-3 text-sm text-[var(--text-body)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-strong)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-3 py-3 text-sm text-[var(--text-body)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-strong)]"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="theme-header fixed left-0 right-0 top-0 z-50 border-b">
      <div className="theme-topbar hidden border-b md:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#63ade5] shadow-[0_0_18px_rgba(99, 173, 229,0.85)]" />
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-soft)]">
              AI Voice Workflow Platform
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <ThemeToggle />
            <a
              href="tel:8887876624"
              className="theme-pill-primary rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:border-[#1e78cc]/40 hover:text-[var(--text-strong)]"
            >
              (888) 787-6624
            </a>
            <a
              href="mailto:info@uponai.com"
              className="theme-pill-accent rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:border-[#63ade5]/40 hover:text-[var(--text-strong)]"
            >
              info@uponai.com
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4 md:min-h-[88px]">
          <Link href="/" className="inline-flex flex-shrink-0 items-center gap-2">
            <span aria-hidden className="animate-brand-pulse inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand)] shadow-[0_0_10px_var(--brand)]" />
            <div className="relative h-12 w-36 overflow-hidden sm:h-14 sm:w-40 md:h-20 md:w-56">
              <Image
                src="/logo.png"
                alt="UponAI"
                fill
                sizes="(min-width: 768px) 224px, 176px"
                className="object-contain scale-[1.65] sm:scale-[1.72] md:scale-[1.9]"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            <Dropdown label="What We Do" groups={[{ links: whatWeDoLinks }]} width="w-72" />
            <Dropdown
              label="Solutions"
              groups={[
                { heading: 'Industries', links: industryLinks },
                {
                  heading: 'Use Cases',
                  links: [
                    { label: 'UCaaS Providers', href: '/ucaas' },
                    { label: 'Call Overflow', href: '/call-overflow-page' },
                    ...useCaseLinks,
                  ],
                },
              ]}
              width="w-[34rem]"
            />
            <Dropdown label="Features" groups={[{ links: featuresLinks }]} width="w-80" />
            <Dropdown label="Resources" groups={[{ links: resourcesLinks }]} width="w-[34rem]" />
          </nav>

          <div className="hidden flex-shrink-0 items-center gap-3 xl:flex">
            <Link
              href="/contact-us-page"
              className="theme-secondary-button rounded-full px-5 py-3 text-sm font-medium"
            >
              Contact Us
            </Link>
            <a
              href={uponaiBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-primary-button rounded-full px-5 py-3 text-sm font-bold"
            >
              Get a Demo
            </a>
          </div>

          <button
            className="rounded-2xl border border-[var(--border)] p-2.5 text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)] xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-strong)] bg-[var(--surface)] px-4 py-4 xl:hidden">
          <div className="max-h-[calc(100svh-5.5rem)] space-y-4 overflow-y-auto pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle mobile />
              <a
                href="tel:8887876624"
                className="theme-pill-primary rounded-full px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[#1e78cc]/40 hover:text-[var(--text-strong)]"
              >
                (888) 787-6624
              </a>
              <a
                href="mailto:info@uponai.com"
                className="theme-pill-accent rounded-full px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[#63ade5]/40 hover:text-[var(--text-strong)]"
              >
                info@uponai.com
              </a>
            </div>

            {[
              { heading: 'What We Do', links: whatWeDoLinks },
              {
                heading: 'Solutions',
                links: [
                  ...industryLinks,
                  { label: 'UCaaS Providers', href: '/ucaas' },
                  { label: 'Call Overflow', href: '/call-overflow-page' },
                  ...useCaseLinks,
                ],
              },
              { heading: 'Features', links: featuresLinks },
              { heading: 'Resources', links: resourcesLinks },
            ].map(({ heading, links }) => (
              <div key={heading} className="theme-card rounded-3xl p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.26em] text-[var(--brand-primary-text)]">{heading}</p>
                {links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl px-3 py-2 text-sm text-[var(--text-body)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-strong)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block rounded-2xl px-3 py-2 text-sm text-[var(--text-body)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-strong)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            ))}

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact-us-page"
                className="theme-secondary-button rounded-full px-4 py-3 text-center text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-primary-button rounded-full px-4 py-3 text-center text-sm font-bold"
                onClick={() => setMobileOpen(false)}
              >
                Get a Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
