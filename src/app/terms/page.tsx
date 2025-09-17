import type { Metadata } from 'next';

import Privacy from './terms.mdx';

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

const Page = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="border-b-dark-gray border-l-dark-gray border-r-dark-gray relative container border px-4 py-16 md:px-28 md:py-28 lg:px-32 lg:py-32">
        <article className="prose prose-lg dark:prose-invert prose-h1:!text-foreground">
          <Privacy />
        </article>
      </div>
    </section>
  );
};

export default Page;
