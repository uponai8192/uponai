import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Get In Touch With Us',
    description:
      'Contact UponAI with questions about AI voice agents, AI chatbots, call automation, or modern communications solutions. Call (888) 787-6624 or send us a message.',
    path: '/contact-us-page',
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
