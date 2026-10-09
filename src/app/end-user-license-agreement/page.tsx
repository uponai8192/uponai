import type { Metadata } from 'next';
import { LegalDocumentPage, loadLegalDocument } from '@/lib/legal-documents';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'End User License Agreement',
  description:
    'The terms governing access to and use of UponAI websites, applications, dashboards, APIs, voice agents, messaging tools, analytics, and related services.',
  path: '/end-user-license-agreement',
});

export default async function EndUserLicenseAgreementPage() {
  const document = await loadLegalDocument('end-user-license-agreement.md');

  return <LegalDocumentPage document={document} breadcrumbLabel="End User License Agreement" />;
}
