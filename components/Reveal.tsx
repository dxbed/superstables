"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fades content in when it scrolls into view. Never leaves content hidden if observation stalls. */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(true)),
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    const safety = window.setTimeout(() => setOn(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={`rv ${on ? "in" : ""} ${className}`.trim()}>
      {children}
    </Comp>
  );
}
