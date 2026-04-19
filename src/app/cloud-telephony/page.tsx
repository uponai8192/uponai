import type { Metadata } from 'next';
import ResourceDownloadGate from '@/components/sections/ResourceDownloadGate';

const downloadUrl =
  'https://github.com/uponai8192/myvoiplogo/raw/276e3ac5eb60d08b4f1b43fccb2c0bbc0c5ea52a/Cloud%20Telephony.pdf';

export const metadata: Metadata = {
  title: 'Cloud Telephony PDF Download',
  description:
    'Download the UponAI Cloud Telephony PDF. Enter your email address to unlock the guide instantly.',
  alternates: { canonical: 'https://uponai.com/cloud-telephony' },
};

export default function CloudTelephonyPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ResourceDownloadGate
          resourceSlug="cloud-telephony"
          title="Cloud Telephony"
          description="A downloadable PDF resource covering how modern cloud telephony improves flexibility, reliability, and business communications without the cost and friction of legacy phone systems."
          downloadUrl={downloadUrl}
          fileLabel="Cloud Telephony PDF"
          highlights={[
            'What cloud telephony changes compared to traditional PBX deployments',
            'How hosted voice infrastructure supports remote teams and multi-site businesses',
            'Why businesses move to flexible, subscription-based calling platforms',
            'A fast reference you can review internally or share with your team',
          ]}
        />
      </div>
    </section>
  );
}
