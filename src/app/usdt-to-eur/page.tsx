import { Metadata } from 'next';

import AspectUsdtToEur from '@/components/sections/aspect-usdt-to-eur';

export const metadata: Metadata = {
  title: 'USDT to EUR (IBAN) for Institutions | Superstables',
  description:
    'Convert USDT to EUR at low bps. Settle to your IBAN via SEPA or on-chain to EURC. Best net rate, policy-aware routing, audit-ready receipts.',
  keywords: [
    'USDT to EUR',
    'USDT conversion',
    'EUR IBAN',
    'SEPA transfer',
    'stablecoin conversion',
    'institutional crypto',
    'USDT to EURC',
    'crypto to fiat',
    'stablecoin rails',
    'institutional trading',
    'crypto treasury',
    'digital assets',
    'blockchain payments',
    'crypto compliance',
    'audit-ready receipts',
  ],
  authors: [{ name: 'Superstables Team' }],
  creator: 'Superstables',
  publisher: 'Superstables',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://superstables.com/usdt-to-eur',
    title: 'USDT to EUR (IBAN) for Institutions | Superstables',
    description:
      'Convert USDT to EUR at low bps. Settle to your IBAN via SEPA or on-chain to EURC. Best net rate, policy-aware routing, audit-ready receipts.',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'USDT to EUR conversion for institutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USDT to EUR (IBAN) for Institutions | Superstables',
    description:
      'Convert USDT to EUR at low bps. Settle to your IBAN via SEPA or on-chain to EURC. Best net rate, policy-aware routing, audit-ready receipts.',
    images: ['/og-image.jpg'],
    creator: '@superstables',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function UsdtToEurPage() {
  return <AspectUsdtToEur />;
}
