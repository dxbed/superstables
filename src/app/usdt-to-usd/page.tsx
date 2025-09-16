import { Metadata } from 'next';

import AspectUsdtToUsd from '@/components/sections/aspect-usdt-to-usd';

export const metadata: Metadata = {
  title: 'USDT to USD (Bank or On-Chain) for Institutions | Superstables',
  description:
    'Convert USDT to USD at low bps. Settle to your company bank account (wire/SWIFT; ACH where supported) or on-chain to USDC. Best net rate, policy-aware routing, audit-ready receipts.',
  keywords: [
    'USDT to USD',
    'USDT conversion',
    'USD bank account',
    'wire transfer',
    'SWIFT transfer',
    'stablecoin conversion',
    'institutional crypto',
    'USDT to USDC',
    'crypto to fiat',
    'stablecoin rails',
    'institutional trading',
    'crypto treasury',
    'digital assets',
    'blockchain payments',
    'crypto compliance',
    'audit-ready receipts',
    'Tether to USD',
    'USDT USD exchange',
    'cryptocurrency banking',
    'institutional DeFi',
    'stablecoin infrastructure',
    'ACH transfer',
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
    canonical: 'https://superstables.com/usdt-to-usd',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://superstables.com/usdt-to-usd',
    title: 'USDT to USD (Bank or On-Chain) for Institutions | Superstables',
    description:
      'Convert USDT to USD at low bps. Settle to your company bank account (wire/SWIFT; ACH where supported) or on-chain to USDC. Best net rate, policy-aware routing, audit-ready receipts.',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'USDT to USD conversion for institutions',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USDT to USD (Bank or On-Chain) for Institutions | Superstables',
    description:
      'Convert USDT to USD at low bps. Settle to your company bank account (wire/SWIFT; ACH where supported) or on-chain to USDC. Best net rate, policy-aware routing, audit-ready receipts.',
    images: ['/og-image.jpg'],
    creator: '@superstables',
    site: '@superstables',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'article:section': 'Financial Technology',
    'article:tag': 'USDT, USD, stablecoin, institutional, banking',
  },
};

export default function UsdtToUsdPage() {
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
                name: 'Can I send USDT directly to a U.S. dollar bank account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We convert USDT to USD and pay out to your corporate USD account via wire/SWIFT (and ACH where supported). Timing is shown before you confirm.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you support USD to USDT as well?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. Two-way conversion is available where supported. If a direct route isn't policy-approved in your region, we'll offer a compliant alternative.",
                },
              },
              {
                '@type': 'Question',
                name: 'How fast is USDT to USD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typically same day or next business day for supported corridors. Expected posting time is shown before you confirm.',
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
                name: 'Can I convert USDT to USDC instead of cashing out?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. You can select USDT to USDC for on-chain settlement in a USD-denominated stablecoin.',
                },
              },
            ],
          }),
        }}
      />
      <AspectUsdtToUsd />
    </>
  );
}
