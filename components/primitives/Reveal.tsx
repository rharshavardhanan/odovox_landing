"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** Stagger any descendants marked with data-reveal instead of the wrapper. */
  stagger?: boolean;
  start?: string;
};

/**
 * Calm enter motion: a short rise + fade, eased out, once. If the wrapper holds
 * elements marked [data-reveal], those stagger in. Reduced motion = no motion.
 */
export default function Reveal({
  children,
  className,
  y = 22,
  delay = 0,
  stagger = false,
  start = "top 84%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current)
        : [ref.current];

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
