import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const AspectHero = () => {
  return (
    <section
      id="aspect-hero"
      className="bg-obsidian relative -mt-px overflow-hidden"
    >
      <div className="relative w-full border border-transparent px-5">
        <div className="group pointer-events-none absolute inset-0 flex size-full flex-col items-center justify-center self-start">
          <Image
            src="/images/homepage/hero-background.png"
            alt={`hero background`}
            fill
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 px-16 py-12 text-center lg:gap-8 lg:px-32 lg:py-20 xl:px-48">
          <Link
            href="/blog/introducing-superstables-stablecoin-and-fiat-swaps-for-institutions"
            className="flex items-center gap-2"
          >
            <Button
              size="sm"
              className="mt-8 border-[#cbff00]/20 transition-colors hover:border-[#cbff00]/40 lg:mt-12"
            >
              The stablecoin rail for enterprises
              <span className="text-[#cbff00]">→</span>
            </Button>
          </Link>

          <h1 className="text-foreground max-w-4xl text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Swap <span className="text-[#cbff00]">stablecoins</span> for fiat at
            institutional scale.
          </h1>

          <p className="font-inter-tight text-mid-gray max-w-3xl text-base md:text-lg lg:text-xl">
            Manage stablecoin and fiat company operations with instant on/off
            ramps, earning products and compliant accounts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://form.typeform.com/to/HkuIZife"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                aria-label="Get started"
                className="bg-[#cbff00] text-black transition-colors hover:bg-[#cbff00]/90"
              >
                Get Early Access
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                aria-label="Get started"
                variant={'secondary'}
                className="border-[#cbff00]/30 transition-colors hover:border-[#cbff00]/60 hover:text-[#cbff00]"
              >
                Read more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectHero;
