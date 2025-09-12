'use client';
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const TEAM = [
  {
    name: 'Alexandra Carter',
    position: 'Chief Executive Officer',
    image: '/images/about/team/1.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Maya Patel',
    position: 'Chief Financial Officer',
    image: '/images/about/team/2.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Sophia Nguyen',
    position: 'Head of Marketing',
    image: '/images/about/team/3.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Olivia Brown',
    position: 'UX/UI Designer',
    image: '/images/about/team/4.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Daniel Kim',
    position: 'Chief Technology Officer',
    image: '/images/about/team/5.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Michael Thompson',
    position: 'Lead Software Engineer',
    image: '/images/about/team/6.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Joshua Lee',
    position: 'Data Scientist',
    image: '/images/about/team/7.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Benjamin Ross',
    position: 'Product Manager',
    image: '/images/about/team/8.webp',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
];

export default function AspectTeamCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-obsidian overflow-hidden px-2.5 lg:px-0">
      <div className="container p-0">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <div className="border-b-dark-gray border-l-dark-gray border-r-dark-gray gap-0 border-r border-b border-l">
            <CarouselContent className="ml-0 w-[calc(100%+1px)] gap-0">
              {TEAM.map((member) => (
                <CarouselItem
                  key={member.name}
                  className="border-r-dark-gray basis-full border-r p-0 md:basis-1/4"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-foreground p-4">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {member.position}
                    </div>
                    <div className="mt-10 flex items-end justify-end gap-3">
                      <Link href={member.facebook} aria-label="Facebook">
                        <Facebook size={20} className="hover:text-foreground" />
                      </Link>
                      <Link href={member.twitter} aria-label="Twitter">
                        <Twitter size={20} className="hover:text-foreground" />
                      </Link>
                      <Link href={member.linkedin} aria-label="LinkedIn">
                        <Linkedin size={20} className="hover:text-foreground" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <div className="border-dark-gray relative flex h-20 items-center justify-end gap-2 border-r border-b border-l px-2.5">
            <CarouselPrevious className="text-foreground !static flex size-11 !translate-y-0 items-center justify-center bg-transparent transition-colors hover:bg-white hover:text-black">
              <ArrowLeft size={24} />
            </CarouselPrevious>

            <CarouselNext className="text-foreground !static flex size-11 !translate-y-0 items-center justify-center bg-transparent transition-colors hover:bg-white hover:text-black">
              <ArrowRight size={24} />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
