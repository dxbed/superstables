import type { Metadata } from 'next';

import AspectDashboard from '@/components/sections/aspect-dashboard';
import AspectHero from '@/components/sections/aspect-hero';
import AspectSeparator from '@/components/sections/aspect-separator';
import AspectWorldMap from '@/components/sections/aspect-world-map';

export const metadata: Metadata = {
  title: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
  description:
    'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
  keywords: [
    'stablecoins',
    'fiat',
    'institutional',
    'cryptocurrency',
    'trading',
    'finance',
    'banking',
    'compliance',
    'on-ramp',
    'off-ramp',
    'EUR',
    'USD',
    'worldwide',
    'USDT',
    'USDC',
    'EURC',
  ],
  openGraph: {
    title: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
    description:
      'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
    url: 'https://superstables.com',
    siteName: 'Superstables',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superstables - Swap Stablecoins for Fiat at Institutional Scale',
    description:
      'Superstables is a platform to swap stablecoins for fiat at institutional scale. Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.',
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <AspectHero />
      <AspectWorldMap />
      <AspectDashboard />
      <AspectSeparator />
    </>
  );
}
