import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import CookieConsentManager from '@/components/ui/CookieConsentManager';
import { VoiceWidgetProvider } from '@/components/widget/VoiceWidgetProvider'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, organizationSchema, websiteSchema } from '@/lib/seo';

const displayFont = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });
const monoFont = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono' });
const themeInitScript = `(() => {
  try {
    const stored = window.localStorage.getItem('uponai-theme');
    const theme = stored === 'light' ? 'light' : 'dark';
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
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
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} bg-[var(--background)] text-[var(--foreground)] antialiased transition-[background-color,color] duration-300`}>
        <VoiceWidgetProvider>
          <Nav />
          <main className="pt-20 sm:pt-24 md:pt-32">{children}</main>
          <Footer />
          <CookieConsentManager />
        </VoiceWidgetProvider>
      </body>
    </html>
  );
}
