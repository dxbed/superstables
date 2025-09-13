'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const ITEMS = [
  {
    logo: {
      name: 'Mercury',
      src: '/images/logos/mercury.svg',
      width: 143,
      height: 26,
      href: 'https://mercury.com',
    },
    testimonial: `“Since integrating Aspect’s unified dashboard, we’ve consolidated all our Mercury accounts into one view—no more juggling multiple logins or spreadsheets.”`,
    avatar: '/images/homepage/testimonials/avatar.webp',
    nameSurname: 'John Doe',
    company: 'Mercury, Inc.',
  },
  {
    logo: {
      name: 'Watershed',
      src: '/images/logos/watershed.svg',
      width: 154,
      height: 31,
      href: 'https://watershed.com',
    },
    testimonial: `“Aspect has been a game-changer for our Watershed team—real-time balances and built-in analytics keep us on top of cash flow like never before.”`,
    avatar: '/images/homepage/testimonials/avatar.webp',
    nameSurname: 'Jane Smith',
    company: 'Watershed Labs',
  },
  {
    logo: {
      name: 'Retool',
      src: '/images/logos/retool.svg',
      width: 113,
      height: 22,
      href: 'https://retool.com',
    },
    testimonial: `“Building internal tools with Retool used to feel disjointed—now with Aspect’s APIs and dashboards, everything flows seamlessly in one place.”`,
    avatar: '/images/homepage/testimonials/avatar.webp',
    nameSurname: 'Alex Li',
    company: 'Retool',
  },
  {
    logo: {
      name: 'Descript',
      src: '/images/logos/descript.svg',
      width: 112,
      height: 27,
      href: 'https://descript.com',
    },
    testimonial: `“Our whole content team loves how Aspect surfaces real-time spending data alongside our Descript workflows—insights we never had before.”`,
    avatar: '/images/homepage/testimonials/avatar.webp',
    nameSurname: 'Emily Nguyen',
    company: 'Descript',
  },
];

export default function AspectTestimonials() {
  return (
    <section className="bg-obsidian overflow-hidden px-2.5 lg:px-0">
      <div className="container flex flex-col items-center justify-center gap-8 overflow-hidden border border-t-0 border-transparent py-12 text-center md:py-20">
        <h2 className="text-foreground text-2xl tracking-tight text-balance md:text-4xl lg:text-5xl">
          What Our Customers Are Saying
        </h2>
        <p className="text-mid-gray max-w-lg text-base">
          Don’t just take our word for it—see how our platform is empowering
          teams to achieve more, streamline workflows, and transform their
          day-to-day operations.
        </p>
        <div className="flex items-center justify-center gap-2 rounded-full border border-transparent px-3 py-2">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="text-star size-4" fill="currentColor" />
            ))}
          </div>
          <div className="bg-dark-gray h-3 w-[1px]"></div>
          <p className="text-foreground text-sm">Real Results.</p>
        </div>
      </div>
      <div className="bg-jet container grid overflow-hidden border-r border-l border-transparent p-0 lg:grid-cols-2">
        {ITEMS.map((item, index) => (
          <div
            key={index}
            className={cn(
              'border-b border-transparent',
              index % 2 === 0 && 'lg:border-r',
            )}
          >
            <div className="flex min-h-[450px] flex-col justify-between gap-8 px-8 py-16">
              <div>
                <Link
                  href={item.logo.href}
                  target="_blank"
                  key={index}
                  className="p-6"
                >
                  <Image
                    src={item.logo.src}
                    alt={item.logo.name}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="object-contain transition-opacity hover:opacity-70"
                  />
                </Link>
                <p className="text-foreground text-xl">{item.testimonial}</p>
              </div>
              <div className="flex">
                <Image
                  src={item.avatar}
                  alt={`Avatar ${index + 1}`}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="text-foreground font-semibold">
                    {item.nameSurname}
                  </p>
                  <p className="text-foreground text-sm">{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
