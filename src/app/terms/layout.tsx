import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Superstables',
  description:
    'Read our terms of service to understand the rules and guidelines for using Superstables platform. Learn about your rights and responsibilities as a user.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'platform terms',
    'legal terms',
    'institutional terms',
    'service agreement',
  ],
  openGraph: {
    title: 'Terms of Service - Superstables',
    description:
      'Read our terms of service to understand the rules and guidelines for using Superstables platform. Learn about your rights and responsibilities as a user.',
    url: 'https://superstables.com/terms',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables Terms of Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Superstables',
    description:
      'Read our terms of service to understand the rules and guidelines for using Superstables platform. Learn about your rights and responsibilities as a user.',
    images: ['/og-image.jpg'],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
