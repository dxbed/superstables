import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formFields = [
  {
    label: 'Full name',
    name: 'fullName',
    placeholder: 'Full name',
    type: 'text',
  },
  {
    label: 'Work email address',
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
  {
    label: 'Phone',
    name: 'phone',
    placeholder: 'Phone Number',
    type: 'text',
    optional: true,
  },
  {
    label: 'Company name',
    name: 'company',
    placeholder: 'Company name',
    type: 'text',
    optional: true,
  },
  {
    label: 'Your message',
    name: 'message',
    placeholder: 'Message',
    type: 'textarea',
  },
];

export default function AspectContactForm() {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container px-0">
        <div className="border-b-dark-gray border-r-dark-gray border-l-dark-gray border-r border-b border-l">
          <div className="md:grid md:grid-cols-[80px_minmax(0,1fr)_80px]">
            <div className="border-r-dark-gray hidden w-[80px] border-r md:block"></div>

            <div>
              <form className="grid md:grid-cols-2">
                {formFields.map((field, idx) => {
                  const isTextarea = field.type === 'textarea';
                  const isFirstCol = idx % 2 === 0; // col-1 at ≥md
                  const wrapperClasses = cn(
                    'border-b border-b-dark-gray', // bottom for all
                    !isTextarea &&
                      isFirstCol &&
                      'md:border-r md:border-r-dark-gray',
                    isTextarea && 'md:col-span-2', // textarea full row
                  );

                  return (
                    <div key={field.name} className={wrapperClasses}>
                      {isTextarea ? (
                        <Textarea
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          className="focus:placeholder:text-muted-foreground text-foreground placeholder:text-foreground h-60 w-full resize-none rounded-none border-0 bg-transparent placeholder-white shadow-none focus-visible:ring-0"
                        />
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="focus:placeholder:text-muted-foreground text-foreground placeholder:text-foreground h-20 w-full rounded-none border-0 bg-transparent placeholder-white shadow-none focus-visible:ring-0"
                        />
                      )}
                    </div>
                  );
                })}

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="border-dark-gray h-20 w-full rounded-none border"
                  >
                    Send message
                  </Button>
                </div>
              </form>
            </div>

            <div className="border-l-dark-gray hidden w-[80px] border-l md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
