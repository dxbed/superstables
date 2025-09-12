'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const DEMO_VIDEO = '/images/features/ship.mp4';

export default function AspectFeaturesHero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="relative container px-0">
        {/* headline */}
        <div className="border-dark-gray flex items-center justify-center border border-t-0 px-6 py-8 lg:px-8 lg:py-20">
          <div className="flex w-full max-w-lg flex-col items-center gap-4 text-center lg:gap-6">
            <h1 className="text-foreground text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Explore Aspect’s Core Features
            </h1>
            <p className="text-mid-gray text-base">
              From real-time balances to in-app support, these tools let you
              see, move, analyze and act on your company’s money—all in one
              place.
            </p>
          </div>
        </div>

        <div
          className={cn(
            'border-b-dark-gray border-l-dark-gray border-r-dark-gray relative aspect-video w-full border',
            !isPlaying &&
              "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-black/45 before:content-['']",
          )}
        >
          {isPlaying ? (
            <video
              src={DEMO_VIDEO}
              className="h-full w-full object-cover"
              autoPlay
              muted
              controls
            />
          ) : (
            <>
              <Image
                src="/images/features/thumbnail.webp"
                alt="Features preview"
                fill
                className="z-0 object-cover" /* keep image below overlay */
                priority
              />
              <button
                onClick={() => setIsPlaying(true)}
                className="border-dark-gray bg-ebony text-foreground absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border p-4"
                aria-label="Play demo video"
              >
                <Play className="size-12" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
