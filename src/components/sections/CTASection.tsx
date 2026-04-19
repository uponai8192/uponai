import Link from 'next/link';

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
    <section className="relative overflow-hidden bg-blue-600 py-16 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-2 border-white" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full border-2 border-white" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{displayHeading}</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{subheading}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-a-demo-page"
            className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-base"
          >
            Get a Demo
          </Link>
          <Link
            href="/contact-us-page"
            className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
