import type { Metadata } from 'next';

import AspectBlog16 from '@/components/sections/aspect-blog16';

export const metadata: Metadata = {
  title: 'Blog - Superstables',
  description:
    'Read the latest insights on stablecoin infrastructure, institutional finance, and regulatory compliance. Stay updated with Superstables news and industry trends.',
  keywords: [
    'stablecoin blog',
    'institutional finance',
    'cryptocurrency news',
    'regulatory compliance',
    'fintech insights',
    'banking technology',
    'digital assets',
    'blockchain finance',
  ],
  openGraph: {
    title: 'Blog - Superstables',
    description:
      'Read the latest insights on stablecoin infrastructure, institutional finance, and regulatory compliance. Stay updated with Superstables news and industry trends.',
    url: 'https://superstables.com/blog',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Superstables',
    description:
      'Read the latest insights on stablecoin infrastructure, institutional finance, and regulatory compliance. Stay updated with Superstables news and industry trends.',
    images: ['/og-image.jpg'],
  },
};

export default function BlogNewPage() {
  return (
    <>
      <AspectBlog16 />
    </>
  );
}
