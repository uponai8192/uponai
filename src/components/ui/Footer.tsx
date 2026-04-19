import Image from 'next/image';
import Link from 'next/link';
import {
  uponaiFooterInfo,
  uponaiOfficeLocations,
  uponaiResourcesMenu,
} from '@/lib/uponai-pages';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#08111f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="UponAI"
                width={140}
                height={52}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              We blend the brilliance of Artificial Intelligence with communication, setting a new standard for business engagement and success.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Useful Information</h3>
            <ul className="space-y-2">
              {uponaiFooterInfo.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="https://www.google.com/maps?q=711+Moorefield+Park+Drive,+Suite+A,+North+Chesterfield,+Virginia,+23236"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white transition-colors"
              >
                711 Moorefield Park Drive, Suite A, North Chesterfield, Virginia, 23236
              </a>
              <a href="tel:+18887876624" className="block text-blue-400 hover:text-blue-300 transition-colors">
                (888) 787-6624
              </a>
              <a href="mailto:info@uponai.com" className="block text-blue-400 hover:text-blue-300 transition-colors">
                info@uponai.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Other Office</h3>
            <ul className="space-y-2 columns-2 text-sm text-slate-400">
              {uponaiOfficeLocations.map((location) => (
                <li key={location} className="break-inside-avoid">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-y border-slate-800 py-5 text-sm text-slate-400">
          {uponaiResourcesMenu.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/supports" className="hover:text-white transition-colors">
            Support
          </Link>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">Copyright © {year}. UponAI. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <Link href="/privacy-policy-page" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-services-page" className="hover:text-slate-300 transition-colors">Terms &amp; Condition</Link>
            <Link href="/contact-us-page" className="hover:text-slate-300 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
