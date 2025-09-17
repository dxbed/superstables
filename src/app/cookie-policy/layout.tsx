import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Superstables',
  description:
    'Learn about how Superstables uses cookies and similar technologies to enhance your experience. Understand our cookie practices and your choices.',
  keywords: [
    'cookie policy',
    'cookies',
    'tracking technologies',
    'web analytics',
    'privacy preferences',
    'cookie consent',
    'data collection',
  ],
  openGraph: {
    title: 'Cookie Policy - Superstables',
    description:
      'Learn about how Superstables uses cookies and similar technologies to enhance your experience. Understand our cookie practices and your choices.',
    url: 'https://superstables.com/cookie-policy',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables Cookie Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy - Superstables',
    description:
      'Learn about how Superstables uses cookies and similar technologies to enhance your experience. Understand our cookie practices and your choices.',
    images: ['/og-image.jpg'],
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
