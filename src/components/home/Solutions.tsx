import { defaultHomeSolutions, type HomeSolutionsContent } from '@/lib/home-content';
import SolutionsStage from './SolutionsStage';

export default function Solutions({
  content = defaultHomeSolutions,
}: {
  content?: HomeSolutionsContent;
}) {
  return (
    <section id="solutions" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="sd-cine mx-auto mb-12 max-w-2xl text-center lg:mb-0">
          <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[var(--brand)] font-[family-name:var(--font-mono)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
            {content.eyebrow}
          </span>
          <h2 className="theme-heading mt-4 text-3xl font-bold leading-[1.15] md:text-4xl">
            {content.heading}
          </h2>
          <p className="theme-body mt-3.5 text-[17px]">{content.lede}</p>
        </div>

        <SolutionsStage items={content.items} itemKicker={content.itemKicker} ctaLabel={content.ctaLabel} />
      </div>
    </section>
  );
}
