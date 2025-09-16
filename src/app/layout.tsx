import './globals.css';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: {
    default: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
    template: '%s | Superstables',
  },
  description:
    'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
  keywords: [
    'stablecoins',
    'fiat',
    'institutional',
    'cryptocurrency',
    'trading',
    'finance',
    'banking',
    'compliance',
    'on-ramp',
    'off-ramp',
    'EUR',
    'USD',
    'worldwide',
  ],
  authors: [{ name: 'Superstables Team' }],
  creator: 'Superstables Team',
  publisher: 'Superstables',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  manifest: '/site.webmanifest',
  themeColor: '#cbff01',
  openGraph: {
    title: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
    description:
      'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
    description:
      'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
    images: ['/og-image.jpg'],
    creator: '@superstables',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TB1MVXZZ3R"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TB1MVXZZ3R');
            `,
          }}
        />
      </head>
      <body
        className={`h-screen ${figtree.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
