import type { Metadata } from 'next';

import Privacy from './privacy.mdx';

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
