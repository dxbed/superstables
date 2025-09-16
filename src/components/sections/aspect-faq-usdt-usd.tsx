import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I send USDT directly to a U.S. dollar bank account?',
    answer:
      'Yes. We convert USDT → USD and pay out to your corporate USD account via wire/SWIFT (and ACH where supported). Timing is shown before you confirm.',
  },
  {
    question: 'Do you support USD → USDT as well?',
    answer:
      'Yes. Two-way is available where supported. If a direct route isn\'t policy-approved in your region, we\'ll offer a compliant alternative (e.g., via USDC).',
  },
  {
    question: 'How fast is USDT → USD?',
    answer:
      'Typically same day or next business day for supported corridors. You\'ll see the expected posting time at checkout.',
  },
  {
    question: 'What are the fees?',
    answer:
      'We quote the best net rate up front, including fees, gas, and expected slippage—so your team can reconcile easily.',
  },
  {
    question: 'Which networks are supported for USDT?',
    answer:
      'Support varies by region and venue. The app shows supported networks for your account at quote time.',
  },
  {
    question: 'Can I convert USDT to USDC instead of cashing out?',
    answer:
      'Yes. You can select USDT to USDC for on-chain settlement in a USD-denominated stablecoin.',
  },
];

const AspectFaqUsdtUsd = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 py-16 lg:px-0 md:py-24">
      <div className="container border border-transparent p-0">
        <div className="px-6 md:px-16">
          <h2 className="text-foreground mb-12 text-3xl font-bold md:text-6xl">
            FAQs <span className="text-[#cbff00]">(USDT → USD)</span>
          </h2>
          <Accordion type="multiple">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-2 rounded-md border-b-0 bg-muted px-5 py-2 md:mb-4"
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AspectFaqUsdtUsd;
