export default function NotFound() {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="border-b-dark-gray border-l-dark-gray border-r-dark-gray relative container flex flex-col items-center justify-center border px-4 py-16 md:px-28 md:py-60 lg:px-32 lg:py-60">
        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="from-foreground to-foreground/70 relative mb-6 bg-linear-to-br bg-clip-text py-2 text-6xl font-medium text-white sm:text-7xl lg:text-9xl">
            404
          </h1>

          <p className="mb-10 text-xl text-white md:text-3xl">
            Page does not exist
          </p>
        </div>
      </div>
    </section>
  );
}
