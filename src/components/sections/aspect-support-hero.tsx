import Image from 'next/image';

const AspectSupportHero = () => {
  return (
    <section
      id="aspect-hero"
      className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0"
    >
      <div className="border-r-dark-gray border-l-dark-gray border-b-dark-gray relative container border px-5">
        <div className="grid gap-12 py-12 lg:grid-cols-[1fr_auto] lg:py-20 lg:pl-12">
          <div className="flex flex-col items-start justify-center gap-5 lg:gap-8">
            <h1 className="text-2xl tracking-tight text-balance text-white md:text-4xl lg:text-5xl">
              Real-Time In-App Messaging Support
            </h1>

            <p className="text-mid-gray max-w-lg text-base">
              Get answers without breaking your flow. Our built-in chat connects
              you directly to FinSight specialists who can troubleshoot issues,
              guide new workflows, and share best-practice tips—all from inside
              the dashboard and typically within minutes.
            </p>
          </div>
          <div className="bg-overlay-gray rounded-sm p-2 sm:p-3 md:p-4 lg:rounded-md">
            <div className="relative aspect-[522/572] size-full overflow-hidden rounded-sm lg:min-h-[572px] lg:min-w-[522px] lg:rounded-md">
              <Image
                src="/images/homepage/features-tabs/5.webp"
                alt={`Aspect product interface showing connected banks`}
                fill
                className="object-cover object-left-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectSupportHero;
