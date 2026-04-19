import type { Metadata } from 'next';
import ResourceDownloadGate from '@/components/sections/ResourceDownloadGate';

const downloadUrl =
  'https://github.com/uponai8192/myvoiplogo/raw/00d246d415d3f2f7a5690afc38c73906df8f5201/The%20Impact%20of%20Virtual%20Reality.pdf';

export const metadata: Metadata = {
  title: 'Virtual Reality PDF Download',
  description:
    'Download the Virtual Reality (VR & Metaverse) PDF. Enter your email address to unlock the guide instantly.',
  alternates: { canonical: 'https://uponai.com/virtual-reality' },
};

export default function VirtualRealityPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ResourceDownloadGate
          resourceSlug="virtual-reality"
          title="Virtual Reality (VR & Metaverse)"
          description="A downloadable PDF exploring how virtual reality and metaverse-style experiences are shaping collaboration, training, customer engagement, and digital interaction."
          downloadUrl={downloadUrl}
          fileLabel="Virtual Reality PDF"
          highlights={[
            'Where VR and metaverse experiences are already impacting real business workflows',
            'How immersive environments can support training, collaboration, and engagement',
            'Key ideas teams should understand before evaluating virtual experiences seriously',
            'A concise PDF you can review after submitting your email address',
          ]}
        />
      </div>
    </section>
  );
}
