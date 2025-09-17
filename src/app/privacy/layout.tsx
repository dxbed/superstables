import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Superstables',
  description:
    'Learn how Superstables protects your privacy and handles your data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR compliance',
    'privacy rights',
    'data security',
    'institutional privacy',
    'financial data protection',
  ],
  openGraph: {
    title: 'Privacy Policy - Superstables',
    description:
      'Learn how Superstables protects your privacy and handles your data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.',
    url: 'https://superstables.com/privacy',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Superstables',
    description:
      'Learn how Superstables protects your privacy and handles your data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.',
    images: ['/og-image.jpg'],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
