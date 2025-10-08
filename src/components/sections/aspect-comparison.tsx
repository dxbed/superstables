import {
  BadgePercent,
  CheckCircle,
  CircleMinus,
  Code2,
  Headset,
  LineChart,
  Users,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AspectComparison = () => {
  return (
    <section className="bg-obsidian py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <Badge variant="outline" className="border-[#cbff00]/30 text-[#cbff00]">
            Comparison
          </Badge>
          <h2 className="mx-auto max-w-2xl text-center text-foreground text-4xl font-semibold sm:text-5xl">
            See how Superstables stacks up against traditional exchanges
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-mid-gray">
            Discover why institutions choose Superstables for off-exchange clearing and settlement
          </p>
        </div>
        <div className="-mx-7 overflow-x-auto">
          <div className="mt-14 grid min-w-2xl grid-cols-3">
            <div className="border-b border-gray-300 dark:border-gray-400/30 p-5"></div>
            <div className="flex flex-col items-center gap-2 rounded-t-2xl border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <img
                src="/favicon/apple-touch-icon.png"
                alt="Superstables logo"
                className="size-8 rounded-full"
              />
              <p className="text-lg font-semibold text-foreground">Superstables</p>
              <p className="mt-1 text-center text-sm text-mid-gray">
                Off-exchange clearing and settlement
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/homepage/coinbase-v2.svg"
                  alt="Coinbase logo"
                  className="size-8 z-10"
                />
                <img
                  src="/images/homepage/kraken-svgrepo-com.svg"
                  alt="Kraken logo"
                  className="size-6 absolute -right-1 -bottom-1 z-0"
                />
                <img
                  src="/images/homepage/binance-svgrepo-com.svg"
                  alt="Binance logo"
                  className="size-6 absolute -right-2 -bottom-2 z-0"
                />
              </div>
              <p className="text-lg font-semibold text-foreground">Traditional Exchanges</p>
              <p className="mt-1 text-center text-sm text-mid-gray">
                Centralized exchange model
              </p>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <Code2 className="size-4 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">Off-exchange Settlement</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-mid-gray">Direct settlement network</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-mid-gray">
                Exchange-dependent settlement
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <Zap className="size-4 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">Settlement Speed</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-mid-gray">
                Instant settlement
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-mid-gray">
                T+1 or T+2 settlement
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <Shield className="size-4 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">Compliance & Regulation</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-mid-gray">
                MiCA compliant, full audit trail
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-mid-gray">
                Varying compliance standards
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <LineChart className="size-4 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">Smart Routing</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-mid-gray">
                Intelligent path optimization, low fees
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-mid-gray">
                Inefficient paths, high fees
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-400/30 p-5">
              <Headset className="size-4 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">Support</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-mid-gray">
                Dedicated institutional support
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-mid-gray">
                Generic support tiers
              </span>
            </div>
            <div className="border-gray-300 dark:border-gray-400/30 p-5"></div>
            <div className="flex items-center justify-center gap-2 rounded-b-2xl border-gray-300 dark:border-gray-400/30 bg-[#cbff00]/5 p-5">
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
