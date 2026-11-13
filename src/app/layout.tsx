import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { getSiteSettings } from '@/lib/cms/settings';
import CookieConsentManager from '@/components/ui/CookieConsentManager';
import { consentEnabled, consentStorageKey, gtmContainerId } from '@/lib/consent';
import { VoiceWidgetProvider } from '@/components/widget/VoiceWidgetProvider'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, organizationSchema, websiteSchema } from '@/lib/seo';

const displayFont = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });
const monoFont = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono' });
// A choice made with the toggle wins; otherwise the OS preference decides.
// Light is only the last resort (no storage access and no matchMedia).
const themeInitScript = `(() => {
  try {
    const stored = window.localStorage.getItem('uponai-theme');
    const theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }
})();`;

// Google Tag Manager bootstrap. Consent defaults must be pushed before the
// container loads; a returning visitor who already accepted starts granted.
const gtmInitScript = `(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  let granted = ${consentEnabled ? 'false' : 'true'};
  try {
    if (!granted) granted = window.localStorage.getItem('${consentStorageKey}') === 'accepted';
  } catch (error) {}
  const state = granted ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
    wait_for_update: 500,
  });
  gtag('js', new Date());
})();`;

export const metadata: Metadata = {
  title: {
    default: "Powering Tomorrow's Conversations",
    template: '%s | UponAI',
  },
  description:
    'At UponAI, we blend AI and communication to redefine business engagement with AI voice agents, AI chatbots, call automation, and modern communications solutions.',
  keywords: [
    'AI voice agents',
    'AI chatbots',
    'voice AI',
    'conversational AI',
    'call automation',
    'customer support automation',
    'appointment scheduling AI',
    'business communications',
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Powering Tomorrow's Conversations",
    description:
      'UponAI builds AI voice agents, AI chatbots, and conversation workflows for businesses that need faster call handling and cleaner customer conversations.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Powering Tomorrow's Conversations",
    description:
      'UponAI builds AI voice agents, AI chatbots, and conversation workflows for modern customer conversations.',
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Nav is a client component, so the CMS-backed menus are resolved here.
  const settings = await getSiteSettings();
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmInitScript }} />
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${gtmContainerId}`} />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <Script
            id="cloudflare-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} text-[var(--foreground)] antialiased transition-[color] duration-300`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <VoiceWidgetProvider>
          <Nav settings={settings} />
          {/* Offsets the fixed header at its docked height: 64px bar on mobile,
              utility strip plus 72px bar from md up. */}
          <main className="pt-16 md:pt-28">{children}</main>
          <Footer />
          <CookieConsentManager />
        </VoiceWidgetProvider>
      </body>
    </html>
  );
}
