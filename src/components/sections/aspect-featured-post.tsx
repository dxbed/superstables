'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AspectFeaturedPostProps {
  tagline: string;
  header: string;
  description: string;
  image: string;
  side?: 'L' | 'R';
  link: string;
}

export default function AspectFeaturedPost({
  tagline,
  header,
  description,
  image,
  side = 'L',
  link,
}: AspectFeaturedPostProps) {
  const order = side === 'R' ? 'md:flex-row-reverse' : 'md:flex-row';
  const imgBorder =
    side === 'R'
      ? 'md:border-l md:border-l-dark-gray'
      : 'md:border-r md:border-r-dark-gray';

  return (
    <section className="bg-obsidian px-2.5 lg:px-0">
      <div className="bg-jet border-dark-gray container border border-t-0 p-0">
        <div className={cn('flex flex-col md:items-stretch', order)}>
          <div
            className={cn(
              'border-b-dark-gray w-full border-b md:w-1/2 md:border-0',
              imgBorder,
            )}
          >
            <div className="relative h-full min-h-[320px]">
              <Image
                src={image}
                alt={header}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="text-foreground w-full px-6 py-12 md:w-1/2 md:px-16 md:py-20">
            <p className="text-foreground mb-4 text-sm leading-relaxed">
              {tagline}
            </p>
            <h2 className="mb-2.5 text-3xl font-medium tracking-tight md:text-4xl">
              {header}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {description}
            </p>
            <Button
              asChild
              variant="link"
              size="link"
              className="gap-1 self-start"
            >
              <Link href={link}>
                Read more
                <ChevronRight className="size-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
