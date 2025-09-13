'use client';

import Image from 'next/image';
import Link from 'next/link';

const ITEMS = [
  {
    name: 'Mercury',
    src: '/images/logos/mercury.svg',
    width: 143,
    height: 26,
    href: 'https://mercury.com',
  },
  {
    name: 'Watershed',
    src: '/images/logos/watershed.svg',
    width: 154,
    height: 31,
    href: 'https://watershed.com',
  },
  {
    name: 'Retool',
    src: '/images/logos/retool.svg',
    width: 113,
    height: 22,
    href: 'https://retool.com',
  },
  {
    name: 'Descript',
    src: '/images/logos/descript.svg',
    width: 112,
    height: 27,
    href: 'https://descript.com',
  },
  {
    name: 'Perplexity',
    src: '/images/logos/perplexity.svg',
    width: 141,
    height: 32,
    href: 'https://perplexity.ai',
  },
  {
    name: 'Monzo',
    src: '/images/logos/monzo.svg',
    width: 104,
    height: 18,
    href: 'https://monzo.com',
  },
  {
    name: 'Ramp',
    src: '/images/logos/ramp.svg',
    width: 105,
    height: 28,
    href: 'https://ramp.com',
  },
  {
    name: 'Raycast',
    src: '/images/logos/raycast.svg',
    width: 128,
    height: 33,
    href: 'https://raycast.com',
  },
  {
    name: 'Arc',
    src: '/images/logos/arc.svg',
    width: 90,
    height: 28,
    href: 'https://arc.com',
  },
];

export default function AspectLogos() {
  return (
    <section className="bg-obsidian overflow-hidden px-2.5 lg:px-0">
      <div className="bg-jet container overflow-hidden border border-transparent py-12 text-center md:py-20">
        <h2 className="text-foreground text-2xl tracking-tight text-balance md:text-4xl lg:text-5xl">
          Powering the world&apos;s best.
        </h2>

        <div className="relative mt-12">
          <div className="flex w-full">
            {/* First marquee group */}
            <div className="animate-marquee flex shrink-0 items-center gap-12">
              {ITEMS.map((logo, index) => (
                <Link
                  href={logo.href}
                  target="_blank"
                  key={index}
                  className="p-6"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain transition-opacity hover:opacity-70"
                  />
                </Link>
              ))}
            </div>
            {/* Second marquee group */}
            <div className="animate-marquee flex shrink-0 items-center gap-12">
              {ITEMS.map((logo, index) => (
                <Link
                  href={logo.href}
                  target="_blank"
                  key={index}
                  className="p-6"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain transition-opacity hover:opacity-70"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
