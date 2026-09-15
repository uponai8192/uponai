import Link from 'next/link';
import StoryCarousel from '@/components/home/StoryCarousel';
import { defaultHomeCustomerStories, type HomeCustomerStoriesContent } from '@/lib/home-content';

export default function CustomerStories({
  content = defaultHomeCustomerStories,
}: {
  content?: HomeCustomerStoriesContent;
}) {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="sd-cine mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold md:text-5xl">{content.heading}</h2>
        </div>

        <div className="sd-pop">
          <StoryCarousel stories={content.stories} />
        </div>

        <div className="sd-rise mt-10 text-center">
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
