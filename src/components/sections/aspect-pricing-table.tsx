'use client';

import {
  Check,
  ChevronsUpDown,
  Infinity as InfinityIcon,
  X as XIcon,
} from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const pricingPlans = [
  { name: 'Free', cta: 'Get started' },
  { name: 'Startup', cta: 'Get started' },
  { name: 'Enterprise', cta: 'Get a demo' },
];

type Cell = boolean | 'unlimited' | string;

interface FeatureRow {
  name: string;
  free: Cell;
  startup: Cell;
  enterprise: Cell;
}

interface FeatureSection {
  category: string;
  rows: FeatureRow[];
}

const featureSections: FeatureSection[] = [
  {
    category: 'Account Connectivity & Monitoring',
    rows: [
      {
        name: 'Account Connections',
        free: true,
        startup: true,
        enterprise: 'unlimited',
      },
      {
        name: 'Real-Time Balance & Allocation',
        free: false,
        startup: true,
        enterprise: 'unlimited',
      },
      {
        name: 'Detailed Transaction History',
        free: false,
        startup: true,
        enterprise: 'unlimited',
      },
    ],
  },
  {
    category: 'Data & Reporting',
    rows: [
      {
        name: 'CSV / PDF Exports',
        free: false,
        startup: true,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Advanced Analytics & Automation',
    rows: [
      {
        name: 'Advanced Cash-Flow Forecasting',
        free: false,
        startup: true,
        enterprise: 'unlimited',
      },
      {
        name: 'Automated Reconciliation',
        free: false,
        startup: true,
        enterprise: 'unlimited',
      },
      {
        name: 'Custom Dashboards & Alerts',
        free: false,
        startup: true,
        enterprise: 'unlimited',
      },
    ],
  },
  {
    category: 'Support & Professional Services',
    rows: [
      { name: 'Email Support', free: true, startup: true, enterprise: true },
      {
        name: 'Priority Email & Chat Support',
        free: false,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Dedicated Account Manager',
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: 'SSO & Advanced SAML Integration',
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: 'Custom SLAs & Onboarding',
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: 'Volume Discounts & Bespoke Features',
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: '14-Day Free Trial',
        free: false,
        startup: true,
        enterprise: false,
      },
    ],
  },
];

export default function AspectPricingTable() {
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <section className="bg-obsidian px-2.5 lg:px-0">
      <div className="border-dark-gray container border border-t-0 px-0">
        <Header selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
        <div>
          {featureSections.map((sec, i) => (
            <Section key={i} sec={sec} selectedPlan={selectedPlan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HEADER ─────────────────────────── */

function Header({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile view: dropdown plan selector */}
      <div className="border-b-dark-gray border-b md:hidden">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between px-6 py-6">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-foreground text-2xl font-medium">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={cn(
                  'text-foreground size-5 transition-transform',
                  open && 'rotate-180',
                )}
              />
            </CollapsibleTrigger>

            <Button variant="default" size="sm">
              {pricingPlans[selectedPlan].cta}
            </Button>
          </div>

          <CollapsibleContent className="flex flex-col gap-2 px-6 pb-4">
            {pricingPlans.map((p, i) =>
              i === selectedPlan ? null : (
                <Button
                  key={p.name}
                  variant="ghost"
                  className="text-foreground"
                  onClick={() => {
                    onPlanChange(i);
                    setOpen(false);
                  }}
                >
                  {p.name}
                </Button>
              ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop view: four-column header (blank + three plans) */}
      <div className="border-dark-gray hidden grid-cols-4 border-b md:grid">
        <div className="border-r-dark-gray border-r" />
        {pricingPlans.map((p, i) => (
          <div
            key={p.name}
            className={cn(
              'flex flex-col items-start gap-4 p-8',
              i < 2 && 'md:border-dark-gray md:border-r', // right border on first two
            )}
          >
            <h3 className="text-foreground text-2xl font-medium">{p.name}</h3>
            <Button variant={i === 1 ? 'default' : 'ghost'}>{p.cta}</Button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────── SECTIONS ────────────────────────── */

function Section({
  sec,
  selectedPlan,
}: {
  sec: FeatureSection;
  selectedPlan: number;
}) {
  return (
    <div className="border-dark-gray border-b last:border-b-0">
      <div className="border-b-dark-gray flex min-h-20 items-center border-b p-8">
        <h3 className="text-foreground max-w-3xs text-lg font-medium">
          {sec.category}
        </h3>
      </div>

      {sec.rows.map((row, idx) => (
        <div
          key={idx}
          className="border-dark-gray text-foreground/90 grid h-20 grid-cols-2 items-center border-b px-0 last:border-b-0 md:grid-cols-4"
        >
          <div className="border-r-dark-gray flex h-full items-center py-3 pl-6 md:border-r md:pl-8">
            <span>{row.name}</span>
          </div>

          {/* Mobile view: only the selected plan’s value */}
          <div className="flex justify-end py-3 pr-6 md:hidden">
            <Cell val={[row.free, row.startup, row.enterprise][selectedPlan]} />
          </div>

          {/* Desktop view: all three plans side-by-side */}
          <div className="md:[&>:not(:last-child)]:border-dark-gray hidden h-full md:col-span-3 md:flex md:[&>:not(:last-child)]:border-r">
            {[row.free, row.startup, row.enterprise].map((val, i) => (
              <div
                key={i}
                className="flex h-full flex-1 items-center py-3 pl-6 md:pl-8"
              >
                <Cell val={val} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────  CELL ──────────────────────────── */

function Cell({ val }: { val: Cell }) {
  if (val === 'unlimited')
    return <InfinityIcon className="text-foreground size-5" />;

  if (typeof val === 'boolean')
    return val ? (
      <Check className="text-foreground size-5" />
    ) : (
      <XIcon className="text-foreground size-5" />
    );

  return (
    <div className="flex h-full items-center gap-1">
      <Check className="text-foreground size-4" />
      <span>{val}</span>
    </div>
  );
}
