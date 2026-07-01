import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { LegalDocumentPage, loadLegalDocument } from '@/lib/legal-documents';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How UponAI collects, uses, discloses, and protects personal information across its website, applications, voice agents, and related services.',
  path: '/privacy-policy',
});

export default async function PrivacyPolicyPage() {
  const document = await loadLegalDocument('privacy-policy.md');

  return <LegalDocumentPage document={document} breadcrumbLabel="Privacy Policy" />;
}
