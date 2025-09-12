import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type Category = 'Support' | 'Account' | 'Features' | 'Security' | 'Other';

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const categories: { name: Category; description: string }[] = [
  {
    name: 'Support',
    description:
      'Need help using Aspect? Our team, docs, and community are ready to assist.',
  },
  {
    name: 'Account',
    description:
      'Everything related to creating, managing, and securing your Aspect account.',
  },
  {
    name: 'Features',
    description:
      'Discover what Aspect can do and learn how to tailor the platform to your workflow.',
  },
  {
    name: 'Security',
    description:
      'We take security seriously. These FAQs explain how we keep your data safe.',
  },
  {
    name: 'Other',
    description:
      'Pricing, integrations, export options, and anything else that doesn’t fit above.',
  },
];

const faqItems: FAQItem[] = [
  {
    category: 'Account',
    question: 'How do I sign up for Aspect?',
    answer:
      'Click “Get Started” on our homepage, choose a plan, and follow the on-screen steps. The whole process takes under two minutes and requires only your work email.',
  },
  {
    category: 'Account',
    question: 'Which banks and financial institutions are supported?',
    answer:
      'Aspect connects to 12,000+ banks and fintech platforms across North America and Europe via Plaid and Salt Edge. If yours isn’t listed, let us know and we’ll add it.',
  },
  {
    category: 'Account',
    question: 'How do I add or remove users from my organization?',
    answer:
      'In **Settings ▸ Team** click “Invite” to add a colleague, or the trash-can icon to revoke access. Only users with the Admin role can manage seats.',
  },
  {
    category: 'Support',
    question: 'How do I contact customer support?',
    answer:
      'Open the in-app chat (bottom-right), email support@aspect.finance, or call +1-628-246-3000. We reply within one business hour on paid plans.',
  },
  {
    category: 'Support',
    question: 'Where can I find product documentation?',
    answer:
      'All docs live at **docs.aspect.finance**. You can also press **⌘ / Ctrl + K** in the app to search without leaving your dashboard.',
  },
  {
    category: 'Support',
    question: 'Can I request a live demo or training session?',
    answer:
      'Absolutely—book a 30-minute Zoom session from **aspect.finance/demo**. Training is free for teams of up to ten users.',
  },
  {
    category: 'Support',
    question: 'What are your support hours?',
    answer:
      'Live chat and phone: Monday–Friday 08:00–20:00 UTC. Email tickets are monitored 24 / 7.',
  },
  {
    category: 'Support',
    question: 'How can I report a bug or submit feedback?',
    answer:
      'Hit the **“Feedback”** button in the sidebar or email us. Every submission is reviewed by the product team within 48 hours.',
  },
  {
    category: 'Features',
    question: 'Which banks and platforms can I connect?',
    answer:
      'Any institution supported by Plaid, Salt Edge, or Open Banking. That includes most major retail and business banks, plus Stripe, PayPal, and Wise.',
  },
  {
    category: 'Features',
    question: 'Can I customize my dashboard?',
    answer:
      'Yes—drag & drop widgets, create custom KPIs, and save multiple layouts for different roles.',
  },
  {
    category: 'Features',
    question: 'How do recurring transfers work?',
    answer:
      'Set the source, destination, amount, and schedule. Aspect will initiate the transfer automatically and notify you on success or failure.',
  },
  {
    category: 'Features',
    question: 'Can I set up custom alerts and notifications?',
    answer:
      'Go to **Settings ▸ Alerts** and define thresholds (balance, incoming amount, etc.). Choose email, SMS, Slack, or push notifications.',
  },
  {
    category: 'Security',
    question: 'How is my data protected?',
    answer:
      'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our infrastructure runs in ISO 27001-certified data centers.',
  },
  {
    category: 'Security',
    question: 'Do you support multi-factor authentication (MFA)?',
    answer:
      'Yes—TOTP, WebAuthn security keys, and Okta SSO are available on every plan, including Free.',
  },
  {
    category: 'Security',
    question: 'Are my banking credentials stored on Aspect servers?',
    answer:
      'No. OAuth tokens are stored with our banking aggregator and are never exposed to our network or databases.',
  },
  {
    category: 'Other',
    question: 'What is your pricing model?',
    answer:
      'Aspect offers a free Starter plan, a Team plan at $25/user/mo, and an Enterprise plan with volume discounts. See aspect.finance/pricing.',
  },
  {
    category: 'Other',
    question: 'Do you offer an API?',
    answer:
      'Yes—the Aspect REST & Webhook API is included in the Team plan and above. API keys can be generated in **Settings ▸ Developers**.',
  },
  {
    category: 'Other',
    question: 'Can I export my data if I decide to cancel?',
    answer:
      'Of course. Export to CSV, JSON, or directly to S3. Your data is retained for 30 days post-cancellation, then permanently deleted.',
  },
];

export const AspectFAQPage = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container px-0">
        <div className="bg-jet border-dark-gray border border-t-0">
          <div className="px-6 py-12 text-center md:py-32">
            <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance">
              Find quick answers to common questions about getting started with
              Aspect, managing your account, exploring features, and
              understanding our security practices.
            </p>
          </div>
        </div>
        <div className="border-r-dark-gray border-l-dark-gray border-b-dark-gray container h-20 border-r border-b border-l"></div>

        {categories.map((cat) => {
          const items = faqItems.filter((f) => f.category === cat.name);
          return (
            <div
              key={cat.name}
              className="border-r-dark-gray border-l-dark-gray border-r border-l px-0"
            >
              <div className="flex flex-col md:flex-row">
                <div className="border-b-dark-gray md:border-r-dark-gray w-full border-b px-8 py-8 md:w-1/3 md:border-r md:px-6">
                  <h2 className="text-foreground mb-4 text-3xl font-medium tracking-tight md:text-4xl">
                    {cat.name}
                  </h2>
                  <p className="text-mid-gray">{cat.description}</p>
                </div>

                <div className="w-full md:w-2/3">
                  <Accordion
                    type="single"
                    collapsible
                    className="text-foreground"
                  >
                    {items.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`${cat.name}-${i}`}
                        className="border-b-dark-gray data-[state=open]:bg-jet border-b p-6"
                      >
                        <AccordionTrigger className="text-xl">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-mid-gray text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="border-b-dark-gray container h-20 border-b"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
