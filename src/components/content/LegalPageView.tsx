import Link from 'next/link';
import PortableText from '@/components/content/PortableText';
import type { LegalPage } from '@/lib/cms/legal';

// Renders a CMS-managed legal page. Layout mirrors the hand-written privacy
// and terms pages it replaces: breadcrumb, title, effective date, jump links,
// then numbered sections with anchor ids.
export default function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <>
      <section className="py-16 px-4 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-5 flex items-center gap-1 text-sm theme-soft">
            <Link href="/" className="theme-link-muted">
              Home
            </Link>
            <span className="theme-subtle">/</span>
            <span className="theme-heading">{page.title}</span>
          </nav>

          <h1 className="theme-heading text-4xl font-bold mb-3">{page.title}</h1>
          {page.effectiveDate ? (
            <p className="theme-subtle text-sm mb-4">{page.effectiveDate}</p>
          ) : null}
          {page.intro ? <p className="theme-body leading-relaxed">{page.intro}</p> : null}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {page.sections.length > 1 ? (
            <nav className="theme-card mb-10 rounded-[1.5rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary-text)] mb-3">
                On this page
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="theme-link-muted text-sm">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {page.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
              <h2 className="theme-heading text-xl font-bold mb-4 pb-3 border-b border-[var(--border)]">
                {section.title}
              </h2>
              <div className="space-y-4 theme-body leading-relaxed text-sm">
                <PortableText blocks={section.body} />
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
