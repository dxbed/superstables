import { ArrowRight, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const data = [
  {
    team: "Superstables",
    logo: "/favicon/favicon-96x96.png",
    date: "14 September 2025",
    title: "Introducing Superstables - Stablecoin and fiat swaps for institutions.",
    link: "/blog/introducing-superstables-stablecoin-and-fiat-swaps-for-institutions",
    categories: [
      {
        name: "Stablecoins",
        link: "#",
      },
      {
        name: "Infrastructure",
        link: "#",
      },
      {
        name: "Institutional",
        link: "#",
      },
    ],
  },
];

const AspectBlog16 = () => {
  return (
    <section className="bg-obsidian relative overflow-hidden px-2.5 lg:px-0">
      <div className="container border border-transparent p-0">
        <div className="border-b-transparent flex flex-col gap-8 overflow-hidden border-b px-6 py-12 md:px-16 md:py-20 md:pt-32">
          <h1 className="text-foreground max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
            <span className="text-muted-foreground">Blog.</span>
            <br />
            Latest insights & updates
          </h1>
        </div>
        <div className="bg-obsidian border-b-transparent border-t-transparent flex flex-col items-start justify-start overflow-x-auto rounded-none border-t border-b p-0">
          <div className="w-full">
            <Separator className="bg-gray-300 dark:bg-gray-400/30" />
            <div className="">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="grid grid-cols-1 gap-6 border-b border-b-transparent px-6 py-8 lg:grid-cols-4 lg:px-8">
                    <div className="hidden items-center gap-3 self-start lg:flex">
                      <img
                        src={item.logo}
                        alt={item.team}
                        className="h-auto w-11"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground font-semibold">{item.team}</span>
                        <span className="text-mid-gray text-sm">
                          Team
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 max-w-xl">
                      <span className="text-mid-gray mb-2 text-sm font-medium">
                        {item.date}
                        <span className="inline lg:hidden"> - {item.team}</span>
                      </span>
                      <h3 className="text-foreground text-2xl font-bold hover:underline lg:text-3xl">
                        <a href={item.link}>{item.title}</a>
                      </h3>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.categories.map((category, index) => (
                          <a
                            key={index}
                            href={category.link}
                            className="text-foreground hover:text-[#cbff00] flex items-center gap-1.5 rounded-full border border-[#cbff00]/20 px-3 py-1.5 text-sm font-medium transition-colors hover:border-[#cbff00]/40"
                          >
                            {category.name}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      asChild
                      size="icon"
                      className="border-[#cbff00]/30 hover:border-[#cbff00]/60 hover:text-[#cbff00] ml-auto hidden lg:flex transition-colors"
                    >
                      <a href={item.link}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Read more</span>
                      </a>
                    </Button>
                  </div>
                  <Separator className="bg-gray-300 dark:bg-gray-400/30" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectBlog16;
