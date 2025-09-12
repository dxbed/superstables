'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface AspectSplitSectionProps {
  header: string;
  description: string;
  image: string;
  side?: 'L' | 'R';
}

export default function AspectSplitSection({
  header,
  description,
  image,
  side = 'L',
}: AspectSplitSectionProps) {
  const order = side === 'R' ? 'md:flex-row-reverse' : 'md:flex-row';
  const imgBorder =
    side === 'R'
      ? 'md:border-l md:border-l-dark-gray'
      : 'md:border-r md:border-r-dark-gray';

  return (
    <section className="bg-obsidian px-2.5 lg:px-0">
      <div className="bg-jet border-dark-gray container border border-t-0 p-0">
        <div className={cn('flex flex-col items-center', order)}>
          <div
            className={cn(
              'border-b-dark-gray w-full border-b md:w-1/2 md:border-0',
              imgBorder,
            )}
          >
            {' '}
            <Image
              src={image}
              alt={header}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>

          <div className="text-foreground w-full px-6 py-12 md:w-1/2 md:px-16 md:py-20">
            <h2 className="mb-2.5 text-3xl font-medium tracking-tight md:text-4xl">
              {header}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
