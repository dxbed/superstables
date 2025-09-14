'use client';

import {
  ArrowUp,
  Clock,
  Facebook,
  Home,
  Instagram,
  Lightbulb,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AspectBlogArticle = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Introducing Superstables - Stablecoin and fiat swaps for institutions',
            description:
              "Today we're introducing Superstables: a simple way for companies to turn stablecoins into euros—and back—at low basis points. You choose how to settle: on-chain to a wallet or straight to your bank account via SEPA.",
            image: '/og-image.jpg',
            author: {
              '@type': 'Organization',
              name: 'Superstables Team',
              url: 'https://superstables.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Superstables',
              logo: {
                '@type': 'ImageObject',
                url: '/images/layout/logo.png',
              },
            },
            datePublished: '2025-09-14',
            dateModified: '2025-09-14',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://superstables.com/blog/introducing-superstables-stablecoin-and-fiat-swaps-for-institutions',
            },
            keywords: [
              'Superstables',
              'stablecoins',
              'fiat swaps',
              'USDC',
              'EURC',
              'EUR',
              'institutional',
              'crypto',
              'blockchain',
              'DeFi',
              'SEPA',
              'on-chain',
              'treasury',
              'finance',
              'enterprise',
              'compliance',
              'audit',
              'reconciliation',
            ],
            articleSection: 'Technology',
            wordCount: 500,
            timeRequired: 'PT5M',
          }),
        }}
      />
      <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
        <div className="container border border-transparent p-0">
          <div className="flex flex-col gap-8 overflow-hidden border-b border-b-transparent px-6 py-12 md:px-16 md:py-20 md:pt-32">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Introducing Superstables</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-foreground mt-7 mb-6 max-w-3xl text-3xl font-semibold md:text-5xl">
              Introducing Superstables - Stablecoin and fiat swaps for
              institutions
            </h1>
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/favicon/favicon-96x96.png" />
              </Avatar>
              <span>
                <a href="#" className="text-foreground font-medium">
                  Superstables Team
                </a>
                <span className="text-mid-gray ml-1">
                  on September 14, 2025
                </span>
              </span>

              <span className="text-mid-gray flex items-center gap-1">
                <Clock className="h-4 w-4" />5 min. read
              </span>
            </div>
            <Separator className="mt-8 mb-16 bg-gray-300 dark:bg-gray-400/30" />
            <div className="relative grid grid-cols-12 gap-6 lg:grid">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  <h3 className="text-foreground mt-3 text-xl font-semibold">
                    What is Superstables?
                  </h3>
                  <p className="text-mid-gray mt-2 text-lg">
                    Today we're introducing Superstables: a simple way for
                    companies to turn stablecoins into euros—and back—at low
                    basis points. You choose how to settle: on-chain to a wallet
                    or straight to your bank account via SEPA. No crypto
                    wizardry required, just clean pricing and a process finance
                    teams can reconcile.
                  </p>
                </div>
                <section
                  id="section1"
                  ref={(ref) => addSectionRef('section1', ref)}
                  className="prose dark:prose-invert my-8"
                >
                  <h2 className="text-foreground">How It Works</h2>
                  <p className="text-mid-gray">
                    Superstables starts where most businesses actually need
                    help: moving value between USDC and EURC, and cashing out
                    USDC to EUR in a company IBAN. The experience is
                    intentionally familiar. You request a live quote, confirm,
                    and receive an audit-ready receipt. Prices are shown as the
                    best net rate we can find, with fees and network costs
                    already accounted for, so there are no surprises between the
                    screen and your statements.
                  </p>
                  <blockquote className="text-foreground border-l-4 border-[#cbff00] pl-4 italic">
                    "Behind the scenes, the system is built to be both cautious
                    and fast. Routes are selected not just on price, but also on
                    simple policy rules—think region, asset, and counterparty
                    checks—so flows stay clean for auditors and partners."
                  </blockquote>
                  <p className="text-mid-gray">
                    We continuously monitor stablecoin pegs and liquidity across
                    venues; if something looks off, the engine quietly steers
                    you to safer paths or pauses until conditions normalize. The
                    result is a rail that behaves the way enterprise money
                    should: predictable, explainable, and resilient.
                  </p>
                  <Alert className="border-[#cbff00]/20 bg-[#cbff00]/5">
                    <Lightbulb className="h-4 w-4 text-[#cbff00]" />
                    <AlertTitle className="text-foreground">
                      Enterprise Ready
                    </AlertTitle>
                    <AlertDescription className="text-mid-gray">
                      Every transaction comes with receipts and exports your
                      finance team can drop into their close process.
                    </AlertDescription>
                  </Alert>
                </section>

                <section
                  id="section2"
                  ref={(ref) => addSectionRef('section2', ref)}
                  className="prose dark:prose-invert mb-8"
                >
                  <h2 className="text-foreground">Day One Capabilities</h2>
                  <p className="text-mid-gray">
                    What can you do on day one? Swap USDC and EURC on-chain with
                    low spreads, or send USDC and receive euros in your bank.
                    The interface supports roles and approvals, and every
                    transaction comes with receipts and exports your finance
                    team can drop into their close.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-400/30">
                          <th className="text-foreground py-2 text-left">
                            Feature
                          </th>
                          <th className="text-foreground py-2 text-left">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300 dark:border-gray-400/30">
                          <td className="text-foreground py-2 font-medium">
                            On-chain Swaps
                          </td>
                          <td className="text-mid-gray py-2">
                            USDC ↔ EURC with low spreads
                          </td>
                        </tr>
                        <tr className="border-b border-gray-300 dark:border-gray-400/30">
                          <td className="text-foreground py-2 font-medium">
                            Bank Settlement
                          </td>
                          <td className="text-mid-gray py-2">
                            USDC → EUR straight to your IBAN
                          </td>
                        </tr>
                        <tr className="border-b border-gray-300 dark:border-gray-400/30">
                          <td className="text-foreground py-2 font-medium">
                            API Integration
                          </td>
                          <td className="text-mid-gray py-2">
                            Quotes, execution, and statements
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-mid-gray">
                    If you prefer to integrate, there's an API for quotes,
                    execution, and pulling statements, so you can plug
                    Superstables into payout flows, marketplaces, or treasury
                    tooling without rebuilding your stack.
                  </p>
                </section>

                <section
                  id="section3"
                  ref={(ref) => addSectionRef('section3', ref)}
                  className="prose dark:prose-invert mb-8"
                >
                  <h2 className="text-foreground">Why This Matters Now</h2>
                  <p className="text-mid-gray">
                    Stablecoins are fast and global, but most teams still
                    struggle to bridge them into day-to-day finance. They need
                    the speed of crypto rails with the clarity and control of
                    traditional payments. Superstables sits in that gap: low-bps
                    FX between digital dollars and euros, and a clean path from
                    wallet to IBAN, designed for companies that care about
                    reconciliation, policy, and reliability.
                  </p>
                  <blockquote className="text-foreground border-l-4 border-[#cbff00] pl-4 italic">
                    "We're starting focused and expanding quickly. Asset
                    coverage will grow beyond USDC and EURC to other major
                    stablecoins, enabled by region and partner support."
                  </blockquote>
                  <p className="text-mid-gray">
                    We're starting focused and expanding quickly. Asset coverage
                    will grow beyond USDC and EURC to other major stablecoins,
                    enabled by region and partner support. Soon after, we'll
                    introduce conservative savings in USDC and EURC—deposit,
                    convert, and allocate to transparent, low-risk yield—with
                    the same emphasis on clarity and withdrawals.
                  </p>
                  <ul className="text-mid-gray list-disc pl-6">
                    <li>Conservative savings in USDC and EURC</li>
                    <li>
                      Simple crypto payments: accept fiat, pay out stablecoins
                    </li>
                    <li>Real-time tracking from initiation to settlement</li>
                    <li>Transparent, low-risk yield options</li>
                  </ul>
                  <p className="text-mid-gray">
                    If you run a PSP, marketplace, treasury, exchange, or fund
                    and need dependable stablecoin FX and cash-out, we'd love to
                    get you on early. Superstables is built to be
                    straightforward for operators and friendly to auditors:
                    clear prices, policy-clean routes, and documentation you can
                    file away without a meeting.
                  </p>
                </section>
              </div>
              <div className="sticky top-8 col-span-3 col-start-10 hidden h-fit lg:block">
                <span className="text-foreground text-lg font-medium">
                  On this page
                </span>
                <nav className="mt-4 text-sm">
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="#section1"
                        className={cn(
                          'block py-1 transition-colors duration-200',
                          activeSection === 'section1'
                            ? 'text-[#cbff00]'
                            : 'text-mid-gray hover:text-[#cbff00]',
                        )}
                      >
                        How It Works
                      </a>
                    </li>
                    <li>
                      <a
                        href="#section2"
                        className={cn(
                          'block py-1 transition-colors duration-200',
                          activeSection === 'section2'
                            ? 'text-[#cbff00]'
                            : 'text-mid-gray hover:text-[#cbff00]',
                        )}
                      >
                        Day One Capabilities
                      </a>
                    </li>
                    <li>
                      <a
                        href="#section3"
                        className={cn(
                          'block py-1 transition-colors duration-200',
                          activeSection === 'section3'
                            ? 'text-[#cbff00]'
                            : 'text-mid-gray hover:text-[#cbff00]',
                        )}
                      >
                        Why This Matters Now
                      </a>
                    </li>
                  </ul>
                </nav>
                <Separator className="my-6 bg-gray-300 dark:bg-gray-400/30" />
                <div className="flex items-center justify-between">
                  <p className="text-foreground text-sm font-medium">
                    Share this article
                  </p>
                  <ul className="flex gap-2">
                    <li>
                      <a
                        href="https://twitter.com/superstables"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-muted inline-flex rounded-full border border-[#cbff00]/20 p-2 transition-colors hover:border-[#cbff00]/40"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/superstables"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-muted inline-flex rounded-full border border-[#cbff00]/20 p-2 transition-colors hover:border-[#cbff00]/40"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="border-[#cbff00]/30 transition-colors hover:border-[#cbff00]/60 hover:text-[#cbff00]"
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }
                  >
                    <ArrowUp className="h-4 w-4" />
                    Back to top
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AspectBlogArticle;
