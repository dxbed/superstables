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
    'Tether to Euro',
    'USDT EUR exchange',
    'cryptocurrency banking',
    'institutional DeFi',
    'stablecoin infrastructure',
  ],
  authors: [{ name: 'Superstables Team' }],
  creator: 'Superstables',
  publisher: 'Superstables',
  category: 'Financial Technology',
  classification: 'Business',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://superstables.com/usdt-to-eur',
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
        type: 'image/jpeg',
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
    site: '@superstables',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'article:section': 'Financial Technology',
    'article:tag': 'USDT, EUR, stablecoin, institutional, banking',
  },
};

export default function UsdtToEurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can I send USDT directly to a European bank account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We convert USDT to EUR and payout to your IBAN (SEPA) in supported regions, with timing shown before you confirm.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you support EUR to USDT as well?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Two-way conversion is available where supported. If a direct route isn\'t policy-approved in your region, we\'ll offer a compliant alternative.',
                },
              },
              {
                '@type': 'Question',
                name: 'How fast is USDT to EUR?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typically same day or next business day for SEPA corridors. Expected posting time is shown before you confirm.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the fees?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We show the best net rate up front, including fees, gas, and expected slippage.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which networks are supported for USDT?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Support varies by region and venue. The app displays supported networks for your account at quote time.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can we automate this?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Our API provides quotes, execution, and access to receipts and statements.',
                },
              },
            ],
          }),
        }}
      />
      <AspectUsdtToEur />
    </>
  );
}
