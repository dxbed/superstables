'use client';

import Privacy from './terms.mdx';

const Page = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="border-b-dark-gray border-l-dark-gray border-r-dark-gray relative container border px-4 py-16 md:px-28 md:py-28 lg:px-32 lg:py-32">
        <article className="prose prose-lg dark:prose-invert prose-h1:!text-foreground">
          <Privacy />
        </article>
      </div>
    </section>
  );
};

export default Page;
