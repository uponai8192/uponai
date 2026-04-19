import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "UponAI | Powering Tomorrow's Conversations",
    template: '%s | UponAI',
  },
  description:
    'At UponAI, we blend AI and communication to redefine business engagement with AI voice agents, AI chatbots, call automation, and modern communications solutions.',
  keywords: ['AI voice agents', 'AI chatbots', 'conversational AI', 'call automation', 'business communications'],
  authors: [{ name: 'UponAI', url: 'https://uponai.com' }],
  metadataBase: new URL('https://uponai.com'),
  openGraph: {
    siteName: 'UponAI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="snitcher-radar"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({"apiEndpoint":"radar.snitcher.com","cdn":"cdn.snitcher.com","namespace":"Snitcher","profileId":"ssNlf0nX3C"});`,
          }}
        />
      </head>
      <body className={`${manrope.className} bg-[#08111f] text-slate-100 antialiased`}>
        <Nav />
        <main className="pt-16 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
