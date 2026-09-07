import Image from 'next/image';
import Link from 'next/link';
import { defaultHomeCustomerStories, type HomeCustomerStoriesContent } from '@/lib/home-content';

// Shown when a story has no uploaded photo.
const avatarSymbols = ['◆', '●', '▲'];

export default function CustomerStories({
  content = defaultHomeCustomerStories,
}: {
  content?: HomeCustomerStoriesContent;
}) {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="sd-cine mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-4xl">{content.heading}</h2>
        </div>

        <div className="sd-stagger grid gap-5 md:grid-cols-3">
          {content.stories.map((story, i) => (
            <div key={i} className="theme-card flex flex-col rounded-[18px] p-6">
              <div className="mb-2.5 text-[44px] leading-[0.6] text-[var(--brand)] opacity-25 font-[family-name:var(--font-display)]">
                &ldquo;
              </div>
              <p className="theme-body flex-1 text-[14.5px]">{story.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-[18px]">
                {story.avatarUrl ? (
                  <Image
                    src={story.avatarUrl}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 flex-none rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span
                    className="grid h-10 w-10 flex-none place-items-center rounded-full text-[15px] text-[var(--text-body)]"
                    style={{ background: '#D1D9E0' }}
                  >
                    {avatarSymbols[i % avatarSymbols.length]}
                  </span>
                )}
                <span>
                  <b className="theme-heading block text-sm">{story.name}</b>
                  <small className="text-xs text-[var(--text-subtle)]">{story.role}</small>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="sd-rise mt-9 text-center">
          <Link
            href="/contact-us-page"
            className="theme-secondary-button inline-flex rounded-xl px-6 py-3.5 text-[15px] font-semibold"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
