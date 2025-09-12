import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const AspectHero = () => {
  return (
    <section
      id="aspect-hero"
      className="bg-obsidian relative overflow-hidden -mt-px"
    >
      <div className="border-transparent relative w-full border px-5">
        <div className="group pointer-events-none absolute inset-0 flex size-full flex-col items-center justify-center self-start">
          <Image
            src="/images/homepage/hero-background.png"
            alt={`hero background`}
            fill
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 py-12 px-16 text-center lg:gap-8 lg:py-20 lg:px-32 xl:px-48">
          <Button size="sm" className="mt-8 lg:mt-12 border-[#cbff00]/20 hover:border-[#cbff00]/40 transition-colors">
            <Link href="/blog" className="flex items-center gap-2">
              Read our latest article
              <span className="text-[#cbff00]">→</span>
            </Link>
          </Button>
          
          <h1 className="text-foreground text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl">
            Swap <span className="text-[#cbff00]">stablecoins</span> for fiat at institutional scale.
          </h1>

          <p className="font-inter-tight text-mid-gray text-base md:text-lg lg:text-xl max-w-3xl">
            Manage stablecoin and fiat company operations with instant on/off ramps, earning products and compliant accounts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button aria-label="Get started" className="bg-[#cbff00] text-black hover:bg-[#cbff00]/90 transition-colors">
              <Link href="/signup">Waiting list</Link>
            </Button>
            <Button aria-label="Get started" variant={'secondary'} className="border-[#cbff00]/30 hover:border-[#cbff00]/60 hover:text-[#cbff00] transition-colors">
              <Link href="/login">Book a demo</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AspectHero;
