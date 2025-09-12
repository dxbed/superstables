import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const contactInfo = [
  {
    label: 'General Inquiries',
    value: 'contact@finsight.example.com',
    href: 'mailto:contact@finsight.example.com',
  },
  {
    label: 'Support',
    value: 'support@finsight.example.com',
    href: 'mailto:support@finsight.example.com',
  },
  {
    label: 'Phone',
    value: '+386 1 234 5678',
    href: 'tel:+38612345678',
  },
  {
    label: 'Address',
    value: 'FinSight HQ, Trg republike 3, 1000 Ljubljana, Slovenia',
    href: 'https://maps.google.com?q=FinSight+HQ,+Trg+republike+3,+1000+Ljubljana,+Slovenia',
  },
];

export default function AspectContactHero() {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container px-0">
        <div className="border-b-dark-gray border-r-dark-gray border-l-dark-gray grid grid-cols-1 border-r border-b border-l lg:grid-cols-2">
          <div className="lg:border-r-dark-gray border-b-dark-gray items-center border-b px-6 py-8 lg:border-r lg:border-b-0 lg:px-16 lg:py-16">
            <h2 className="text-foreground mb-2.5 text-3xl font-medium tracking-tight lg:text-4xl">
              Let’s Connect
            </h2>
            <p className="text-muted-foreground leading-relaxed lg:text-lg">
              Whether you have a question, feedback, or need support, our team
              is here to help. Drop us a line below or use any of the contact
              methods listed.
            </p>
          </div>

          <div className="bg-jet">
            <div className="px-6 py-8 lg:px-16 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                  <div className="flex flex-col gap-10">
                    {contactInfo.map((item, index) => (
                      <div key={index}>
                        <p className="text-foreground font-semibold">
                          {item.label}
                        </p>
                        <Link
                          href={item.href}
                          className="text-muted-foreground mt-2.5 text-sm font-medium tracking-tight"
                        >
                          {item.value}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 lg:mt-0">
                  <div className="flex lg:w-full lg:items-end lg:justify-end">
                    <p className="text-foreground mb-2.5 font-semibold lg:text-right">
                      Socials
                    </p>
                  </div>
                  <div className="flex w-full items-end gap-2 lg:justify-end">
                    <Link
                      href="#"
                      className="hover:text-muted-foreground text-foreground"
                    >
                      <Facebook className="size-4" />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-muted-foreground text-foreground"
                    >
                      <Twitter className="size-4" />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-muted-foreground text-foreground"
                    >
                      <Linkedin className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
