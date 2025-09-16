import Link from 'next/link';

import { Button } from '@/components/ui/button';
import AspectFaqUsdtUsd from './aspect-faq-usdt-usd';

const AspectUsdtToUsd = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container border border-transparent p-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-b-transparent px-6 py-16 md:px-16 md:py-24 md:pt-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-[#cbff00] blur-3xl"></div>
            <div className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-[#cbff00] blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Main Heading */}
            <div className="mb-12 text-center">
              <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="mb-2 block">Convert</span>
                <span className="mb-2 block text-[#cbff00]">USDT → USD</span>
                <span className="block text-3xl font-normal sm:text-4xl md:text-5xl lg:text-6xl">
                  at institutional scale
                </span>
              </h1>

              <p className="text-mid-gray mx-auto max-w-3xl text-lg leading-relaxed font-light md:text-xl lg:text-2xl">
                Two ways to settle:{' '}
                <span className="font-medium text-[#cbff00]">
                  wire/SWIFT to your bank
                </span>{' '}
                or{' '}
                <span className="font-medium text-[#cbff00]">
                  on-chain as USDC
                </span>
                . Best net rates, policy-aware routing, audit-ready
                documentation.
              </p>
            </div>

            {/* Conversion Visual */}
            <div className="mb-12 flex items-center justify-center">
              <div className="flex items-center gap-4 md:gap-8">
                {/* USDT */}
                <div className="text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#26A17B] to-[#1e8a66] shadow-lg md:h-20 md:w-20">
                    <span className="text-lg font-bold text-white md:text-xl">
                      ₮
                    </span>
                  </div>
                  <p className="text-foreground text-sm font-semibold md:text-base">
                    USDT
                  </p>
                  <p className="text-mid-gray text-xs md:text-sm">Tether</p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#cbff00]/20 bg-[#cbff00]/10 md:h-14 md:w-14">
                    <svg
                      className="h-6 w-6 text-[#cbff00] md:h-7 md:w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-[#cbff00] md:text-sm">
                    Convert
                  </p>
                </div>

                {/* USD */}
                <div className="text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-lg md:h-20 md:w-20">
                    <span className="text-lg font-bold text-white md:text-xl">
                      $
                    </span>
                  </div>
                  <p className="text-foreground text-sm font-semibold md:text-base">
                    USD
                  </p>
                  <p className="text-mid-gray text-xs md:text-sm">Dollar</p>
                </div>
              </div>
            </div>

            {/* Settlement Options */}
            <div className="mx-auto mb-12 grid max-w-4xl gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-[#cbff00]/20 bg-[#cbff00]/5 p-6 transition-colors hover:bg-[#cbff00]/10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbff00]/20">
                    <svg
                      className="h-5 w-5 text-[#cbff00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-foreground text-lg font-semibold">
                    Bank Settlement
                  </h3>
                </div>
                <p className="text-mid-gray text-sm">
                  Wire/SWIFT to your USD account • Same/next day
                </p>
              </div>

              <div className="rounded-lg border border-[#cbff00]/20 bg-[#cbff00]/5 p-6 transition-colors hover:bg-[#cbff00]/10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbff00]/20">
                    <svg
                      className="h-5 w-5 text-[#cbff00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-foreground text-lg font-semibold">
                    On-chain Settlement
                  </h3>
                </div>
                <p className="text-mid-gray text-sm">
                  Receive USDC in your wallet • Instant
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://form.typeform.com/to/HkuIZife"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#cbff00] font-semibold text-black transition-all hover:scale-105 hover:bg-[#cbff00]/90"
                >
                  Get Early Access
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  size="lg"
                  variant={'outline'}
                  className="border-[#cbff00]/30 font-semibold transition-all hover:border-[#cbff00]/60 hover:bg-[#cbff00]/5 hover:text-[#cbff00]"
                >
                  Read more
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="border-b border-b-transparent px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              How it works <span className="text-[#cbff00]">(simple)</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  Get a live quote
                </h3>
                <p className="text-mid-gray">
                  For USDT → USD (bank) or USDT → USDC (wallet/custody). See the
                  best net rate upfront.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  Confirm & settle
                </h3>
                <p className="text-mid-gray">
                  We route the best net path and handle screening automatically.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  Reconcile
                </h3>
                <p className="text-mid-gray">
                  Download the receipt and statement, or pull them via API.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settlement options section */}
        <div className="border-b border-b-transparent px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              Settlement <span className="text-[#cbff00]">options</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-[#cbff00]/20 p-6">
                <h3 className="text-foreground mb-4 text-2xl font-semibold">
                  USDT → USD (bank)
                </h3>
                <p className="text-mid-gray mb-4">
                  Send USDT, receive dollars in your corporate USD account.
                  Typical posting same day or next business day in supported
                  corridors; exact timing is shown before you confirm.
                </p>
                <div className="flex items-center gap-2 text-[#cbff00]">
                  <span className="text-sm font-medium">
                    Wire/SWIFT Transfer
                  </span>
                  <span>→</span>
                </div>
              </div>

              <div className="rounded-lg border border-[#cbff00]/20 p-6">
                <h3 className="text-foreground mb-4 text-2xl font-semibold">
                  USDT → USDC (wallet)
                </h3>
                <p className="text-mid-gray mb-4">
                  Prefer to stay on-chain? Receive USDC with the same low-bps
                  pricing and documentation.
                </p>
                <div className="flex items-center gap-2 text-[#cbff00]">
                  <span className="text-sm font-medium">On-chain</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why institutions use Superstables */}
        <div className="border-b border-b-transparent px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              Why institutions use{' '}
              <span className="text-[#cbff00]">Superstables</span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Low bps, shown up front
                  </h3>
                  <p className="text-mid-gray">
                    No surprises between quote and settlement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Wallet or bank
                  </h3>
                  <p className="text-mid-gray">
                    One flow to settle on-chain or to a USD account.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Policy-aware by design
                  </h3>
                  <p className="text-mid-gray">
                    Region, asset, and counterparty checks included.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Peg-safe routing
                  </h3>
                  <p className="text-mid-gray">
                    We monitor stablecoin pegs and reroute during stress.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cbff00]/10 text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Finance-ready
                  </h3>
                  <p className="text-mid-gray">
                    Roles/approvals, receipts, statements, and CSV/API exports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <AspectFaqUsdtUsd />

        {/* Who it's for section */}
        <div className="bg-obsidian relative overflow-hidden px-2.5 py-16 md:py-24 lg:px-0">
          <div className="container border border-transparent p-0">
            <div className="px-6 md:px-16">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
                  Who it's <span className="text-[#cbff00]">for</span>
                </h2>

                <p className="text-mid-gray text-lg leading-relaxed">
                  PSPs & marketplaces paying sellers, treasuries managing USD
                  liquidity, funds/market makers moving collateral, and
                  fintechs/exchanges needing dependable rails.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
                      aria-label="Learn more"
                      variant={'secondary'}
                      className="border-[#cbff00]/30 transition-colors hover:border-[#cbff00]/60 hover:text-[#cbff00]"
                    >
                      Read more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectUsdtToUsd;
