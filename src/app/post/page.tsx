import { permanentRedirect } from 'next/navigation';

export default function BlogArchiveRedirectPage() {
  permanentRedirect('/blogs');
}
