import { ArrowDownUp, BookUser, FileLock2, SmartphoneNfc } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const FEATURES = [
  {
    title: 'Audit-Ready Transparency',
    description: `See live quotes, route decisions, and full execution traces—down to min-out, fees, and counterparties—with downloadable receipts for reconciliation.`,
    icon: BookUser,
  },
  {
    title: 'Wallet or Bank Settlement',
    description:
      'Swap USDC↔EURC on-chain or send USDC→EUR straight to your IBAN at low bps—no extra portals, contracts, or new bank accounts.',
    icon: ArrowDownUp,
  },
  {
    title: 'Peg Watch & Smart Guardrails',
    description:
      'We monitor stablecoin pegs in real time; during stress we auto-reroute, throttle size, or hedge—then alert your team instantly.',
    icon: SmartphoneNfc,
  },
  {
    title: 'Institutional-Grade Security & Compliance',
    description:
      'Policy-aware routing, KYB/KYC and sanctions screening via regulated partners, roles and approvals, and strong encryption—keeping every swap, and every euro, safe.',
    icon: FileLock2,
  },
];

const AspectDashboard = () => {
  return (
    <section
      id="aspect-dashboard"
      className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0"
    >
      <div className="relative container border border-r-transparent border-l-transparent px-0">
        <div className="grid grid-cols-1 gap-4 border-b border-b-transparent px-6 pt-20 pb-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-32 lg:pb-12">
          <h1 className="text-foreground text-3xl tracking-tight">
            See Every Dollar, Understand Every Trend, and Act with Unmatched
            Speed
          </h1>
          <p className="font-inter-tight text-mid-gray text-base">
            Our unified dashboard brings all your accounts, currencies, and
            subsidiaries into a single panoramic view—updated in real time.
          </p>
        </div>
        <div className="relative">
          <div className="group pointer-events-none absolute inset-0 flex size-full flex-col items-center justify-center self-start">
            <Image
              src="/images/homepage/dashboard/dashboard-background.png"
              alt={`hero background`}
              fill
              className="size-full object-cover"
            />
          </div>
          <div className="group pointer-events-none absolute inset-0 z-20 flex size-full flex-col items-center justify-center self-start">
            <Image
              src="/images/homepage/dashboard/dashboard-frontground.png"
              alt={`hero foreground`}
              fill
              className="size-full object-cover"
            />
          </div>
          <div className="z-10 p-5 lg:p-20">
            <div className="bg-overlay-gray rounded-sm p-2 sm:p-3 md:p-4 lg:rounded-md">
              <div className="relative aspect-video size-full overflow-hidden rounded-sm lg:rounded-md">
                <Image
                  src="/images/homepage/dashboard/dashboard.jpg"
                  alt={`Aspect product interface showing connected banks`}
                  fill
                  className="object-contain object-left-top"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-obsidian flex flex-col items-start justify-start overflow-x-auto rounded-none border-t border-b border-t-transparent border-b-transparent p-0 lg:basis-1/4 lg:flex-row">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                'text-foreground h-full min-h-56 w-full items-start justify-start rounded-none px-6 py-12 text-start whitespace-normal lg:p-8',
                'border-b border-b-transparent lg:border-r lg:border-b-0 lg:border-r-transparent lg:last:border-none',
              )}
            >
              <div className="flex h-full w-full justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="text-foreground mt-2 text-sm">
                    {feature.description}
                  </p>
                </div>
                <feature.icon className="size-4 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AspectDashboard;
