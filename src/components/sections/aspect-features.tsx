'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ItemType = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  link: string;
};

const ITEMS: ItemType[] = [
  {
    title: 'Balance Overview',
    description: 'See your total and per-account cash in a glance.',
    image: { src: '/images/homepage/features-tabs/1.webp', alt: '' },
    link: '/features/support',
  },
  {
    title: 'Initiate Transfers',
    description: 'Move funds instantly or schedule recurring payouts.',
    image: { src: '/images/homepage/features-tabs/2.webp', alt: '' },
    link: '/features/support',
  },
  {
    title: 'Generate Reports',
    description: 'Build, export and automate your financial summaries.',
    image: { src: '/images/homepage/features-tabs/3.webp', alt: '' },
    link: '/features/support',
  },
  {
    title: 'Messaging Support',
    description: 'Get help without leaving your dashboard.',
    image: { src: '/images/homepage/features-tabs/5.webp', alt: '' },
    link: '/features/support',
  },
  {
    title: 'Transaction Ledger',
    description: 'Drill into every debit, credit and memo—no spreadsheets.',
    image: { src: '/images/homepage/features-tabs/4.webp', alt: '' },
    link: '/features/support',
  },
];

export const AspectFeatures = () => (
  <section className="bg-obsidian overflow-hidden px-2.5 md:px-0">
    <div className="border-dark-gray relative container border border-t-0 border-b-0 px-0">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Item key={i} {...item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

function Item(props: ItemType & { index: number }) {
  const { title, description, image, link, index } = props;

  const wide = index === 3;
  const colSpan = wide ? 'md:col-span-2' : '';

  const lastDesktop = index === 2 || index === 4;
  const borderRight = lastDesktop ? '' : 'md:border-r md:border-dark-gray';

  return (
    <div
      className={cn(
        'border-dark-gray relative flex flex-col overflow-hidden border-b p-6 max-md:min-h-[400px]',
        wide && 'gap-2 md:flex-row',
        borderRight,
        colSpan,
      )}
    >
      <div
        className={cn(
          'bg-overlay-gray relative overflow-hidden rounded-lg px-2 pt-2 pb-2 sm:p-3 md:p-4',
          wide &&
            'md:order-2 md:h-[calc(100%+80px)] md:flex-none md:basis-[320px] lg:basis-[360px]',
        )}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-sm',
            wide ? 'h-full' : 'aspect-[501/351]',
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="rounded-sm object-cover"
            priority
          />
        </div>
      </div>

      <div
        className={cn(
          'mt-6 flex flex-col items-start gap-4',
          wide && 'md:order-1 md:w-1/2 md:justify-center',
        )}
      >
        <h3 className="text-foreground text-xl font-medium">{title}</h3>
        <p className="text-mid-gray">{description}</p>
        <Button asChild variant="link" size="link" className="gap-1 self-start">
          <Link href={link}>
            Read more
            <ChevronRight className="size-2" />
          </Link>
        </Button>
      </div>

      <Image
        src="/images/homepage/features-tabs/bg-small.webp"
        alt="tabs background"
        fill
        className="pointer-events-none object-cover"
        priority
      />
    </div>
  );
}
