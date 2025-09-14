import { Metadata } from 'next';
import AspectBlogArticle from '@/components/sections/aspect-blog-article';

export const metadata: Metadata = {
  title:
    'Introducing Superstables - Stablecoin and fiat swaps for institutions',
  description:
    "Today we're introducing Superstables: a simple way for companies to turn stablecoins into euros—and back—at low basis points. You choose how to settle: on-chain to a wallet or straight to your bank account via SEPA.",
  keywords: [
    'Superstables',
    'stablecoins',
    'fiat swaps',
    'USDC',
    'EURC',
    'EUR',
    'institutional',
    'crypto',
    'blockchain',
    'DeFi',
    'SEPA',
    'on-chain',
    'treasury',
    'finance',
    'enterprise',
    'compliance',
    'audit',
    'reconciliation',
  ],
  authors: [{ name: 'Superstables Team' }],
  creator: 'Superstables',
  publisher: 'Superstables',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      'Introducing Superstables - Stablecoin and fiat swaps for institutions',
    description:
      "Today we're introducing Superstables: a simple way for companies to turn stablecoins into euros—and back—at low basis points. You choose how to settle: on-chain to a wallet or straight to your bank account via SEPA.",
    url: 'https://superstables.com/blog/introducing-superstables-stablecoin-and-fiat-swaps-for-institutions',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Introducing Superstables - Stablecoin and fiat swaps for institutions',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Introducing Superstables - Stablecoin and fiat swaps for institutions',
    description:
      "Today we're introducing Superstables: a simple way for companies to turn stablecoins into euros—and back—at low basis points.",
    creator: '@superstables',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function BlogArticlePage() {
  return (
    <>
      <AspectBlogArticle />
    </>
  );
}
