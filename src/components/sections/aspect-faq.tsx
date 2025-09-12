import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const questions = [
  {
    question: 'What is Streamline?',
    answer:
      'Streamline is a modern financial dashboard that aggregates all your bank accounts, subsidiaries, and currencies into one unified, real-time view—complete with analytics, alerts, and custom reporting.',
  },
  {
    question: 'How is Streamline different from Linear and Jira?',
    answer:
      'Unlike Linear and Jira, which focus on issue tracking and project management, Streamline is built specifically for financial operations—bringing real-time banking data, cash-flow insights, and compliance tools into a single platform.',
  },
  {
    question: 'How do I update my account?',
    answer:
      'Head over to your Account Settings → Profile, where you can update your email, password, notification preferences, and connected institutions at any time.',
  },
  {
    question: 'Is support free, or do I need to Google everything?',
    answer:
      'All users receive complimentary email support and access to our knowledge base. Professional and Enterprise plans include 24/7 live chat and phone support.',
  },
  {
    question: 'Are you going to be subsumed by AI?',
    answer:
      'We leverage AI for smart alerts and insights, but rest assured, Streamline remains a human-driven platform—no plan to replace your finance team with a chatbot!',
  },
  {
    question: 'How do I connect my bank accounts and subsidiaries?',
    answer:
      'Simply navigate to the Integrations tab, select your bank or financial institution, and authorize access with your online banking credentials. Once connected, all accounts under that legal entity—subsidiaries and branches included—will automatically appear in your dashboard.',
  },
  {
    question: 'Which banks and financial institutions are supported?',
    answer:
      'We support thousands of institutions worldwide—including major banks like JPMorgan Chase, Bank of America, HSBC, Barclays, Deutsche Bank, and hundreds more. Visit the Integrations page in-app for the full list.',
  },
];

const AspectFaq = () => {
  return (
    <section
      id="aspect-faq"
      className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0"
    >
      <div className="border-l-dark-gray border-r-dark-gray border-t-dark-gray relative container border px-0">
        <div className="border-b-dark-gray border-b px-6 py-8 lg:px-8 lg:py-20">
          <div className="flex max-w-lg flex-col gap-4 lg:gap-6">
            <h1 className="text-foreground text-3xl tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-mid-gray text-base">
              Browse our most common user questions and discover practical tips
              for getting the most out of our platform.
            </p>
            <div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/faq">Read more</Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Accordion type="single" collapsible className="text-foreground">
            {questions.map((item, i) => (
              <AccordionItem
                key={i}
                value={`left-${i}`}
                className="border-b-dark-gray data-[state=open]:bg-jet border-b p-6"
              >
                <AccordionTrigger className="text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-mid-gray text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AspectFaq;
