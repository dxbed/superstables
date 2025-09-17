import type { Metadata } from 'next';

import CookiePolicy from './cookie-policy.mdx';

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

const Page = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="border-b-dark-gray border-l-dark-gray border-r-dark-gray relative container border px-4 py-16 md:px-28 md:py-28 lg:px-32 lg:py-32">
        <article className="prose prose-lg dark:prose-invert prose-h1:!text-foreground">
          <CookiePolicy />
        </article>
      </div>
    </section>
  );
};

export default Page;
