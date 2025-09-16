import { Metadata } from 'next';

import AspectUsdcToUsd from '@/components/sections/aspect-usdc-to-usd';

export const metadata: Metadata = {
  title: 'USDC to USD (Bank Payout) for Institutions | Superstables',
  description:
    'Convert USDC to USD at low bps. Settle to your corporate USD bank account (wire/SWIFT; ACH where supported). Best net rate, policy-aware routing, audit-ready receipts.',
  keywords: [
    'USDC to USD',
    'USDC conversion',
    'USD bank account',
    'wire transfer',
    'SWIFT transfer',
    'ACH transfer',
    'stablecoin conversion',
    'institutional crypto',
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
  category: 'Financial Technology',
  classification: 'Business',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://superstables.com/usdc-to-usd',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://superstables.com/usdc-to-usd',
    title: 'USDC to USD (Bank Payout) for Institutions | Superstables',
    description:
      'Convert USDC to USD at low bps. Settle to your corporate USD bank account (wire/SWIFT; ACH where supported). Best net rate, policy-aware routing, audit-ready receipts.',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'USDC to USD conversion for institutions',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USDC to USD (Bank Payout) for Institutions | Superstables',
    description:
      'Convert USDC to USD at low bps. Settle to your corporate USD bank account (wire/SWIFT; ACH where supported). Best net rate, policy-aware routing, audit-ready receipts.',
    images: ['/og-image.jpg'],
    creator: '@superstables',
    site: '@superstables',
  },
};

export default function UsdcToUsdPage() {
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
                name: 'Can I send USDC directly to a U.S. dollar bank account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We convert USDC to USD and pay out to your corporate USD account via wire/SWIFT (and ACH where supported). Timing is shown before you confirm.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you support USD to USDC as well?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Two-way conversion is available where supported. If a direct route isn\'t policy-approved in your region, we\'ll offer a compliant alternative.',
                },
              },
              {
                '@type': 'Question',
                name: 'How fast is USDC to USD?',
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
                name: 'Which networks are supported for USDC?',
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
      <AspectUsdcToUsd />
    </>
  );
}
