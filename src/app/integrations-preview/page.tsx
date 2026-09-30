import type { Metadata } from 'next';
import IntegrationsHub from '@/components/home/IntegrationsHub';
import IntegrationsVideo from '@/components/home/IntegrationsVideo';

// Side-by-side review page for the two integrations section treatments.
// Temporary: delete this route (and whichever component loses) once the
// stakeholder has picked one.
export const metadata: Metadata = {
  title: 'Integrations section preview',
  robots: { index: false, follow: false },
};

function Label({ tag, title, note }: { tag: string; title: string; note: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 pt-16">
      <span className="theme-pill-primary inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
        {tag}
      </span>
      <h2 className="theme-heading mt-3 text-2xl font-bold">{title}</h2>
      <p className="theme-body mt-1.5 max-w-2xl text-sm">{note}</p>
    </div>
  );
}

export default function IntegrationsPreviewPage() {
  return (
    <>
      <Label
        tag="Option A"
        title="Built in code"
        note="Hover a tile to see its name and light its connection, move the mouse for depth, and the number counts up on arrival. Text is real, scales to any screen, and swaps to scrolling rows on phones."
      />
      <IntegrationsHub />
      <Label
        tag="Option B"
        title="Video loop"
        note="The supplied 10 second render, looping. Pixel-identical to the design, but the text is part of the video and it is cropped to the centre on phones."
      />
      <IntegrationsVideo />
      <div className="h-24" />
    </>
  );
}
