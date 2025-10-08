import {
  CheckCircle,
  CircleMinus,
  Code2,
  Headset,
  LineChart,
  Shield,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AspectComparison = () => {
  return (
    <section className="bg-obsidian py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="border-[#cbff00]/30 text-[#cbff00]"
          >
            Comparison
          </Badge>
          <h2 className="text-foreground mx-auto max-w-2xl text-center text-4xl font-semibold sm:text-5xl">
            See how Superstables stacks up against traditional exchanges
          </h2>
          <p className="text-mid-gray mx-auto mt-2 max-w-2xl text-center">
            Discover why institutions choose Superstables for off-exchange
            clearing and settlement
          </p>
        </div>
        <div className="-mx-7 overflow-x-auto">
          <div className="mt-14 grid min-w-2xl grid-cols-3">
            <div className="border-b border-gray-300 p-5 dark:border-gray-400/30"></div>
            <div className="flex flex-col items-center gap-2 rounded-t-2xl border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <img
                src="/favicon/apple-touch-icon.png"
                alt="Superstables logo"
                className="size-8 rounded-full"
              />
              <p className="text-foreground text-lg font-semibold">
                Superstables
              </p>
              <p className="text-mid-gray mt-1 text-center text-sm">
                Off-exchange clearing and settlement
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/homepage/coinbase-v2.svg"
                  alt="Coinbase logo"
                  className="z-10 size-8"
                />
                <img
                  src="/images/homepage/kraken-svgrepo-com.svg"
                  alt="Kraken logo"
                  className="absolute -right-1 -bottom-1 z-0 size-6"
                />
                <img
                  src="/images/homepage/binance-svgrepo-com.svg"
                  alt="Binance logo"
                  className="absolute -right-2 -bottom-2 z-0 size-6"
                />
              </div>
              <p className="text-foreground text-lg font-semibold">
                Traditional Exchanges
              </p>
              <p className="text-mid-gray mt-1 text-center text-sm">
                Centralized exchange model
              </p>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <Code2 className="text-foreground size-4 shrink-0" />
              <span className="text-foreground font-semibold">
                Off-exchange Settlement
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-mid-gray text-xs">
                Direct settlement network
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-mid-gray text-xs">
                Exchange-dependent settlement
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <Zap className="text-foreground size-4 shrink-0" />
              <span className="text-foreground font-semibold">
                Settlement Speed
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-mid-gray text-xs">Instant settlement</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-mid-gray text-xs">
                T+1 or T+2 settlement
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <Shield className="text-foreground size-4 shrink-0" />
              <span className="text-foreground font-semibold">
                Compliance & Regulation
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-mid-gray text-xs">
                MiCA compliant, full audit trail
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-mid-gray text-xs">
                Varying compliance standards
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <LineChart className="text-foreground size-4 shrink-0" />
              <span className="text-foreground font-semibold">
                Smart Routing
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-mid-gray text-xs">
                Intelligent path optimization, low fees
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-mid-gray text-xs">
                Inefficient paths, high fees
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 p-5 dark:border-gray-400/30">
              <Headset className="text-foreground size-4 shrink-0" />
              <span className="text-foreground font-semibold">Support</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-mid-gray text-xs">
                Dedicated institutional support
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-mid-gray text-xs">
                Generic support tiers
              </span>
            </div>
            <div className="border-gray-300 p-5 dark:border-gray-400/30"></div>
            <div className="flex items-center justify-center gap-2 rounded-b-2xl border-gray-300 bg-[#cbff00]/5 p-5 dark:border-gray-400/30">
              <Button className="w-full bg-[#cbff00] text-black hover:bg-[#cbff00]/90">
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectComparison;
