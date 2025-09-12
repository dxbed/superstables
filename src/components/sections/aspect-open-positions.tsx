import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const openPositions = [
  {
    position: 'Senior Full-Stack Engineer',
    description:
      'Build and maintain end-to-end features—from React dashboards to Python data pipelines—and work closely with product and design to ship polished releases every week.',
    link: '#',
  },
  {
    position: 'UX/UI Designer',
    description:
      'Own the product experience from wireframes to final visuals and ensure every pixel speaks our brand language while staying highly usable.',
    link: '#',
  },
  {
    position: 'Customer Success Specialist',
    description:
      'Be the front line for our customers, guiding them to success with onboarding, proactive outreach, and fast, friendly support.',
    link: '#',
  },
  {
    position: 'DevOps & Site Reliability Engineer',
    description:
      'Keep our cloud infrastructure scalable, secure, and blazing-fast. Automate CI/CD pipelines and champion reliability across the stack.',
    link: '#',
  },
];

export default function AspectOpenPositions() {
  return (
    <section
      id="aspect-open-positions"
      className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0"
    >
      <div className="border-l-dark-gray border-r-dark-gray relative container border-r border-l px-0">
        <div className="flex flex-col md:flex-row">
          <div className="border-b-dark-gray md:border-r-dark-gray w-full border-b px-8 py-8 md:w-1/3 md:border-r md:px-6">
            <h2 className="text-foreground mb-4 text-3xl font-medium tracking-tight md:text-4xl">
              We’re hiring
            </h2>
            <p className="text-mid-gray">
              Join a tight-knit crew building the future of fintech. See an
              opening that fits? We’d love to chat.
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <Accordion type="single" collapsible className="text-foreground">
              {openPositions.map((role, i) => (
                <AccordionItem
                  key={i}
                  value={`pos-${i}`}
                  className="border-b-dark-gray data-[state=open]:bg-jet border-b p-6"
                >
                  <AccordionTrigger className="text-xl">
                    {role.position}
                  </AccordionTrigger>
                  <AccordionContent className="text-mid-gray text-base">
                    <p className="mb-4">{role.description}</p>
                    <Button asChild size="sm" variant="secondary">
                      <Link href={role.link}>Apply now</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
