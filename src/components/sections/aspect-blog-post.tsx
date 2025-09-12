'use client';

import Image from 'next/image';

export interface AspectBlogPostProps {
  tagline: string;
  title: string;
  intro: string;
  image: string;
  author: string;
  published: string;
  link?: string;
  children: React.ReactNode;
}

export default function AspectBlogPost({
  tagline,
  title,
  intro,
  image,
  author,
  published,
  children,
}: AspectBlogPostProps) {
  return (
    <article className="bg-obsidian text-foreground px-2.5 lg:px-0">
      <div className="border-dark-gray bg-jet container border border-t-0 p-0">
        <header className="flex flex-col items-center">
          <div className="text-foreground w-full px-6 py-12 md:px-16 md:py-20">
            <p className="mb-4 text-sm">{tagline}</p>
            <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="text-muted-foreground mb-8">{intro}</p>
          </div>

          <div className="border-b-dark-gray border-t-dark-gray w-full border-t border-b">
            <Image
              src={image}
              alt={title}
              width={1280}
              height={720}
              className="aspect-video w-full object-cover"
              priority
            />
          </div>

          <div className="text-foreground w-full px-6 pt-12 pb-6 md:px-16 md:pt-20 md:pb-6">
            <div className="text-muted-foreground mb-8 flex flex-wrap gap-6 text-sm">
              <div>
                <strong className="text-foreground mb-1">
                  Written&nbsp;by:
                </strong>{' '}
                <p>{author}</p>
              </div>
              <div>
                <strong className="text-foreground mb-1">Published:</strong>{' '}
                <p>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(published))}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* MDX body */}
        <section className="prose prose-lg dark:prose-invert px-6 pb-16 [--tw-prose-body:var(--color-foreground)] [--tw-prose-bold:var(--color-foreground)] [--tw-prose-headings:var(--color-foreground)] [--tw-prose-links:var(--color-foreground)] md:px-16">
          {' '}
          {children}
        </section>
      </div>
    </article>
  );
}
