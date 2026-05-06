import Image from 'next/image';
import Link from 'next/link';
import { industries, services } from '@/lib/data';
import {
  uponaiFooterInfo,
  uponaiOfficeLocations,
  uponaiResourcesMenu,
} from '@/lib/uponai-pages';
import CookieSettingsButton from '@/components/ui/CookieSettingsButton';
import { getFeaturedCities } from '@/lib/voice-ai-industries';

export default function Footer() {
  const year = new Date().getFullYear();
  const featuredServices = services.filter((service) =>
    ['ai-voice-agents', 'ai-chatbots', 'hosted-fax', 'mobile-voip-sms', 'web-video-conferencing'].includes(service.slug),
  );
  const featuredIndustries = industries.filter((industry) =>
    [
      'healthcare',
      'home-services',
      'real-estate',
      'law-firms',
      'education',
      'financial-services',
      'auto-repair',
      'senior-living',
    ].includes(industry.slug),
  );
  const featuredCities = getFeaturedCities(12);

  return (
    <footer className="mt-24 border-t border-[var(--border-strong)] bg-[color:var(--section-alt)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div className="theme-card rounded-[2rem] p-7">
            <Link href="/" className="mb-6 inline-block">
              <div className="relative h-20 w-52 overflow-hidden md:w-60">
                <Image
                  src="/logo.png"
                  alt="UponAI"
                  fill
                  sizes="(min-width: 768px) 240px, 208px"
                  className="object-contain scale-[1.8]"
                />
              </div>
            </Link>
            <p className="theme-body max-w-md text-sm leading-relaxed">
              UponAI builds AI voice and conversational systems for businesses that need faster response times,
              cleaner call handling, and stronger customer engagement across every hour of the day.
            </p>
            <div className="mt-6 grid gap-3 xl:grid-cols-2">
              <a
                href="tel:+18887876624"
                className="theme-pill-green rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:text-[var(--text-strong)]"
              >
                (888) 787-6624
              </a>
              <a
                href="mailto:info@uponai.com"
                className="theme-pill-cyan min-w-0 break-all rounded-2xl px-4 py-3 text-sm font-semibold transition-colors hover:text-[var(--text-strong)]"
              >
                info@uponai.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">Useful Information</h3>
            <ul className="space-y-3">
              {uponaiFooterInfo.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-link-muted text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="theme-link-muted text-sm">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">Head Office</h3>
            <div className="theme-soft space-y-4 text-sm">
              <a
                href="https://www.google.com/maps?q=711+Moorefield+Park+Drive,+Suite+A,+North+Chesterfield,+Virginia,+23236"
                target="_blank"
                rel="noreferrer"
                className="block leading-relaxed transition-colors hover:text-[var(--text-strong)]"
              >
                711 Moorefield Park Drive, Suite A, North Chesterfield, Virginia, 23236
              </a>
              <p className="leading-relaxed">
                AI voice deployments, conversational design, routing, and support strategy.
              </p>
            </div>
          </div>

          <div>
            <h3 className="theme-heading mb-4 text-sm font-semibold uppercase tracking-[0.24em]">Other Offices</h3>
            <ul className="theme-soft grid grid-cols-2 gap-2 text-sm">
              {uponaiOfficeLocations.map((location) => (
                <li key={location} className="theme-card-soft break-inside-avoid rounded-2xl px-3 py-2">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="theme-card mt-10 rounded-[2rem] px-6 py-5">
          <div className="grid gap-8 lg:grid-cols-4">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                Resources
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {uponaiResourcesMenu.map((item) => (
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-link-muted"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} href={item.href} className="theme-link-muted">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                Services
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {featuredServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="theme-link-muted">
                    {service.shortName}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-green-text)]">
                Industries
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {featuredIndustries.map((industry) => (
                  <Link key={industry.slug} href={`/industries/${industry.slug}`} className="theme-link-muted">
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-cyan-text)]">
                Top Markets
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                {featuredCities.map((city) => (
                  <Link key={city.slug} href={`/location/${city.slug}`} className="theme-link-muted">
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="theme-subtle text-sm">Copyright © {year}. UponAI. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 text-sm">
            <Link href="/privacy-policy" className="theme-link-muted">
              Privacy Policy
            </Link>
            <Link href="/terms-of-services" className="theme-link-muted">
              Terms &amp; Condition
            </Link>
            <Link href="/contact-us-page" className="theme-link-muted">
              Contact Us
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
