'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { uponaiBookingUrl } from '@/lib/booking';
import { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings';
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

// This is a client component, so the CMS-backed menus are passed down from the
// server layout rather than fetched here. The default keeps the nav rendering
// if it is ever used without them.
//
// The header has two states. Docked, at the top of the page, it is a quiet
// utility strip over a full-width bar. Once the visitor scrolls, the strip
// slides away and the bar undocks into a floating capsule, with the brand
// pulse dot migrating from the strip into the capsule as the live cue. While
// the mobile panel is open the header stays docked so the panel keeps its
// full-width anchor.
export default function Nav({ settings = defaultSiteSettings }: { settings?: SiteSettings }) {
  const industryLinks: DropdownLink[] = settings.industriesMenu;
  const useCaseLinks: DropdownLink[] = settings.useCasesMenu;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const floating = scrolled && !mobileOpen;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        floating ? 'border-b border-transparent' : 'theme-header border-b'
      }`}
    >
      {/* Brand-gradient hairline that fills as the page is read, with the
          brand pulse riding its tip like a comet head. Driven by the scroll
          position in CSS; invisible where that is unsupported. */}
      <span
        aria-hidden
        className="scroll-progress absolute left-0 top-0 z-10 h-[2.5px] w-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-cool)]"
      />
      <span
        aria-hidden
        className="scroll-comet absolute left-0 top-[-2.5px] z-10 h-2 w-2 rounded-full bg-[var(--brand-cool)] shadow-[0_0_12px_var(--brand-cool)]"
      />
      <div
        className={`theme-topbar hidden overflow-hidden border-b transition-all duration-300 md:block ${
          floating ? 'max-h-0 border-transparent opacity-0' : 'max-h-14 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="animate-brand-pulse inline-flex h-2 w-2 rounded-full bg-[var(--brand-cool)] shadow-[0_0_12px_var(--brand-cool)]"
            />
            <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--text-soft)] font-[family-name:var(--font-mono)]">
              AI Voice Workflow Platform
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:8887876624"
              className="text-xs font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text-strong)]"
            >
              (888) 787-6624
            </a>
            <span aria-hidden className="h-3.5 w-px bg-[var(--border-strong)]" />
            <a
              href="mailto:info@uponai.com"
              className="text-xs font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text-strong)]"
            >
              info@uponai.com
            </a>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4">
        <div
          className={`mx-auto transition-all duration-300 ${
            floating
              ? 'mt-3 max-w-5xl rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 shadow-[0_18px_50px_rgba(var(--shadow-rgb),0.22)] backdrop-blur-xl sm:px-5'
              : 'max-w-7xl rounded-none border border-transparent px-1 sm:px-2 lg:px-4'
          }`}
        >
          <div
            className={`flex items-center justify-between gap-3 transition-all duration-300 ${
              floating ? 'min-h-[54px]' : 'min-h-[64px] md:min-h-[72px]'
            }`}
          >
            <Link href="/" className="inline-flex flex-shrink-0 items-center gap-2.5">
              <span
                aria-hidden
                className={`animate-brand-pulse rounded-full bg-[var(--brand)] shadow-[0_0_10px_var(--brand)] transition-all duration-300 ${
                  floating ? 'h-2 w-2 opacity-100' : 'h-0 w-0 opacity-0'
                }`}
              />
              <div
                className={`relative overflow-hidden transition-all duration-300 ${
                  floating ? 'h-9 w-28' : 'h-11 w-34 sm:h-12 sm:w-38'
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="UponAI"
                  fill
                  sizes="152px"
                  className="object-contain scale-[1.65]"
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

            <div className="hidden flex-shrink-0 items-center gap-2.5 xl:flex">
              <ThemeToggle compact />
              <Link
                href="/contact-us-page"
                className={`theme-secondary-button rounded-full px-5 text-sm font-medium transition-all duration-300 ${
                  floating ? 'py-2' : 'py-2.5'
                }`}
              >
                Contact Us
              </Link>
              <a
                href={uponaiBookingUrl}
                target="_blank"
                rel="noreferrer"
                className={`theme-primary-button rounded-full px-5 text-sm font-bold transition-all duration-300 ${
                  floating ? 'py-2' : 'py-2.5'
                }`}
              >
                Get a Demo
              </a>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <ThemeToggle compact />
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="rounded-full border border-[var(--border)] p-2.5 text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
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
