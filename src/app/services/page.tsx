import { permanentRedirect } from 'next/navigation';

export default function ServicesIndexRedirectPage() {
  permanentRedirect('/services/ai-voice-agents');
}
