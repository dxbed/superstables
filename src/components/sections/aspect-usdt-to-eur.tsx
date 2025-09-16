import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AspectUsdtToEur = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container border border-transparent p-0">
        {/* Hero Section */}
        <div className="flex flex-col gap-8 overflow-hidden border-b border-b-transparent px-6 py-12 md:px-16 md:py-20 md:pt-32">
          <div className="flex flex-col items-center justify-center gap-5 text-center lg:gap-8">
            <h1 className="text-foreground max-w-4xl text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              USDT to EUR — straight to your{' '}
              <span className="text-[#cbff00]">IBAN</span> (or on-chain EURC)
            </h1>

            <p className="font-inter-tight text-mid-gray max-w-3xl text-base md:text-lg lg:text-xl">
              Turn USDT into euros at low basis points and choose how you settle: to your bank (IBAN, SEPA) or on-chain as EURC. Superstables shows the best net rate up front (fees, gas, slippage included), then gives you audit-ready receipts your finance team can file.
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
                  aria-label="Learn more"
                  variant={'secondary'}
                  className="border-[#cbff00]/30 transition-colors hover:border-[#cbff00]/60 hover:text-[#cbff00]"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="border-b border-b-transparent px-6 py-16 md:px-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              How it works <span className="text-[#cbff00]">(simple)</span>
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-[#cbff00]/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-[#cbff00]">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  Get a live quote
                </h3>
                <p className="text-mid-gray">
                  For USDT → EUR (bank) or USDT → EURC (wallet). See the best net rate upfront.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#cbff00]/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-[#cbff00]">
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
                <div className="bg-[#cbff00]/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-[#cbff00]">
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              Settlement <span className="text-[#cbff00]">options</span>
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border border-[#cbff00]/20 rounded-lg p-6">
                <h3 className="text-foreground mb-4 text-2xl font-semibold">
                  USDT → EUR (IBAN)
                </h3>
                <p className="text-mid-gray mb-4">
                  Send USDT, receive euros in your company bank account. Typical posting same day or next business day in supported corridors.
                </p>
                <div className="flex items-center gap-2 text-[#cbff00]">
                  <span className="text-sm font-medium">SEPA Transfer</span>
                  <span>→</span>
                </div>
              </div>
              
              <div className="border border-[#cbff00]/20 rounded-lg p-6">
                <h3 className="text-foreground mb-4 text-2xl font-semibold">
                  USDT → EURC (wallet)
                </h3>
                <p className="text-mid-gray mb-4">
                  Prefer to stay on-chain? Receive EURC with the same low-bps pricing and documentation.
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              Why institutions use <span className="text-[#cbff00]">Superstables</span>
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="bg-[#cbff00]/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#cbff00]">
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
                <div className="bg-[#cbff00]/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#cbff00]">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Wallet or bank
                  </h3>
                  <p className="text-mid-gray">
                    One flow to settle on-chain or to IBAN.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-[#cbff00]/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#cbff00]">
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
                <div className="bg-[#cbff00]/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#cbff00]">
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
                <div className="bg-[#cbff00]/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#cbff00]">
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

        {/* Who it's for section */}
        <div className="px-6 py-16 md:px-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
              Who it's <span className="text-[#cbff00]">for</span>
            </h2>
            
            <p className="text-mid-gray text-lg leading-relaxed">
              PSPs and marketplaces paying sellers, treasuries managing USD↔EUR exposure, funds/market makers moving collateral, and fintechs/exchanges needing dependable stablecoin rails.
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
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectUsdtToEur;
