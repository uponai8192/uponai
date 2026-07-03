import Link from 'next/link';
import { uponaiBookingUrl } from '@/lib/booking';

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  city?: string;
}

export default function CTASection({
  heading = 'Ready to Build Your AI Voice Workflow?',
  subheading = 'Book a demo to see how UponAI can handle inbound conversations, qualification, and routing for your business.',
  city,
}: CTASectionProps) {
  const displayHeading = city ? `Deploy AI Voice Agents in ${city}` : heading;

  return (
    <section className="relative overflow-hidden px-4 py-16">
      <div className="absolute inset-0">
        <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-[#63ade5]/16 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-[#1e78cc]/16 blur-3xl" />
      </div>
      <div className="theme-panel relative mx-auto max-w-5xl rounded-[2.25rem] px-6 py-12 text-center md:px-10">
        <div className="theme-pill-primary mx-auto inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
          AI Voice Demo
        </div>
        <h2 className="theme-heading mx-auto mt-5 max-w-3xl text-3xl font-bold md:text-5xl">{displayHeading}</h2>
        <p className="theme-body mx-auto mt-4 max-w-2xl text-lg leading-8">{subheading}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={uponaiBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="theme-primary-button rounded-full px-8 py-3.5 text-base font-bold"
          >
            Get a Demo
          </a>
          <Link
            href="/contact-us-page"
            className="theme-secondary-button rounded-full px-8 py-3.5 text-base font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
