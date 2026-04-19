'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import {
  uponaiIndustriesMenu,
  uponaiUseCasesMenu,
} from '@/lib/uponai-pages';

const chevron = (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  { label: 'Book Appointment', href: 'https://uponai.ai/group-booking-uponai', external: true },
  { label: 'SIP Integration & Call Transfer', href: '/sip-integrations-and-transfers-685191' },
  { label: 'Recordings', href: '/recordings-page' },
];

const resourcesLinks: DropdownLink[] = [
  { label: 'N8N', href: '/n8n-downloads' },
  { label: 'Blogs', href: 'https://www.uponai.com/blogs/', external: true },
  { label: 'About Us', href: '/about-us-page' },
  { label: 'Support', href: '/support' },
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

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button className="px-3 py-2 text-slate-300 hover:text-white text-sm rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1">
        {label}
        {chevron}
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 ${width} pt-2 z-50`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2">
            <div className="grid gap-4 p-2 md:grid-cols-2">
              {groups.map((group) => (
                <div key={group.heading ?? group.links.map((link) => link.label).join('-')}>
                  {group.heading ? (
                    <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
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
                        className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#08111f]/95 backdrop-blur">
      <div className="hidden md:block border-b border-slate-800/80 bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-slate-400 sm:px-6 lg:px-8">
          <a href="tel:8887876624" className="transition-colors hover:text-white">
            (888) 787-6624
          </a>
          <a href="mailto:info@uponai.com" className="transition-colors hover:text-white">
            info@uponai.com
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="UponAI"
              width={160}
              height={56}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
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
              width="w-[32rem]"
            />
            <Dropdown label="Features" groups={[{ links: featuresLinks }]} width="w-80" />
            <Dropdown label="Resources" groups={[{ links: resourcesLinks }]} width="w-[32rem]" />
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href="/get-a-demo-page" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              Get a Demo
            </Link>
          </div>

          <button className="lg:hidden p-2 text-slate-300 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
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
            <div key={heading} className="py-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{heading}</p>
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 pl-2 text-sm text-slate-300 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-1.5 pl-2 text-sm text-slate-300 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}

          <Link href="/contact-us-page" className="block py-2 text-slate-300 hover:text-white text-sm" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
          <Link href="/get-a-demo-page" className="block mt-3 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center" onClick={() => setMobileOpen(false)}>
            Get a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
