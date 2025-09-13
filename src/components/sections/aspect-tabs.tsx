import { ChartPie, FileDown, List, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    title: 'Balance Overview',
    description: 'View your total balance across all banks.',
    content: {
      title: 'Unified Balance Overview',
      description: `View your total balance across all banks and see exactly how each resource is allocated with intuitive pie- and bar-chart visualizations.`,
      image: '/images/homepage/features-tabs/1.webp',
      button: {
        href: '/features/support',
        text: 'Read more',
      },
    },
    icon: ChartPie,
  },
  {
    title: 'Transaction Ledger',
    description: 'Drill into each transaction.',
    content: {
      title: 'Comprehensive Transaction Ledger',
      description:
        'Drill into each transaction—date, amount, payee, category—and use filters to trace cash flow with pinpoint accuracy.',
      image: '/images/homepage/features-tabs/2.webp',
      button: {
        href: '/features/support',
        text: 'Read more',
      },
    },
    icon: List,
  },
  {
    title: 'Initiate Transfers',
    description: 'Set up one‑off or recurring transfers in seconds.',
    content: {
      title: 'Initiate Transfers',
      description:
        'Set up one‑off or recurring transfers in seconds: choose source and destination accounts, enter the amount, schedule a date, and add an optional note.',
      image: '/images/homepage/features-tabs/3.webp',
      button: {
        href: '/features/support',
        text: 'Read more',
      },
    },
    icon: Send,
  },
  {
    title: 'Generate & Export',
    description: 'Export tailored financial reports.',
    content: {
      title: 'Generate & Export Reports',
      description:
        'Export tailored financial reports to CSV or PDF so you can share insights with stakeholders or meet compliance requirements effortlessly.',
      image: '/images/homepage/features-tabs/4.webp',
      button: {
        href: '/features/support',
        text: 'Read more',
      },
    },
    icon: FileDown,
  },
];

export const AspectTabs = () => {
  return (
    <section id="aspect-tabs" className="bg-obsidian px-2.5 lg:px-0">
      <div className="container border-x border-b border-r-transparent border-b-transparent border-l-transparent px-0">
        {/*  DESKTOP  */}
        <Tabs
          defaultValue={FEATURES[0].title}
          orientation="horizontal"
          className="hidden lg:flex lg:flex-col"
        >
          <TabsList className="bg-jet flex items-start justify-start overflow-x-auto rounded-none border-b border-b-transparent p-0 lg:basis-1/4">
            {FEATURES.map((feature) => (
              <TabsTrigger
                key={feature.title}
                value={feature.title}
                className={cn(
                  'text-foreground h-full min-h-36 w-full min-w-[200px] flex-1 items-start justify-start rounded-none px-4 py-3 text-start whitespace-normal transition-colors duration-300',
                  'border-r border-r-transparent last:border-none',
                  'data-[state=active]:text-foreground data-[state=active]:bg-secondary data-[state=active]:shadow-none',
                  'dark:data-[state=active]:text-foreground lg:p-8 dark:text-gray-300',
                )}
              >
                <div className="flex h-full w-full justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="text-foreground mt-2 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <feature.icon className="size-4" />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {FEATURES.map((feature) => (
            <TabsContent
              key={feature.title}
              value={feature.title}
              className="bg-obsidian m-0 grid grid-cols-2 overflow-hidden"
            >
              <div className="flex flex-col justify-center gap-4 border-r border-r-transparent p-6 lg:p-8">
                <h4 className="text-foreground text-2xl font-semibold lg:text-4xl">
                  {feature.content.title}
                </h4>
                <p className="text-mid-gray">{feature.content.description}</p>
                <div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={feature.content.button.href}>
                      {feature.content.button.text}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex h-[235px] items-center justify-center p-8 md:h-[434px]">
                <div className="bg-overlay-gray rounded-sm p-2 sm:p-3 md:p-4 lg:flex-1">
                  <div className="relative aspect-[501/351] w-full overflow-hidden rounded-sm p-4">
                    <Image
                      src={feature.content.image}
                      alt={feature.title}
                      fill
                      className="rounded-sm object-cover"
                    />
                  </div>
                </div>
                <div className="group pointer-events-none absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                  <Image
                    src="/images/homepage/features-tabs/bg-small.webp"
                    alt={`tabs background`}
                    fill
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/*  MOBILE  */}
        <div className="block lg:hidden">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-obsidian m-0 overflow-hidden"
            >
              <div className="flex flex-col justify-center gap-4 border-b border-b-transparent px-6 py-12">
                <h4 className="text-foreground text-2xl font-semibold lg:text-4xl">
                  {feature.content.title}
                </h4>
                <p className="text-mid-gray">{feature.content.description}</p>
                <div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={feature.content.button.href}>
                      {feature.content.button.text}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex h-auto items-center justify-center border-b border-b-transparent p-6">
                <div className="bg-overlay-gray flex-1 rounded-sm p-2 sm:p-3 md:p-4">
                  <div className="relative aspect-[501/351] w-full overflow-hidden rounded-sm p-4">
                    <Image
                      src={feature.content.image}
                      alt={feature.title}
                      fill
                      className="rounded-sm object-cover"
                    />
                  </div>
                </div>
                <div className="group pointer-events-none absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                  <Image
                    src="/images/homepage/features-tabs/bg-small.webp"
                    alt={`tabs background`}
                    fill
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
