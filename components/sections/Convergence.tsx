"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const Scene3D = dynamic(() => import("./convergence/Scene3D"), { ssr: false });

export default function Convergence() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const early = useRef<HTMLDivElement>(null);
  const late = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const setHeadlines = (p: number) => {
        if (early.current)
          early.current.style.opacity = String(
            1 - gsap.utils.clamp(0, 1, (p - 0.34) / 0.18),
          );
        if (late.current)
          late.current.style.opacity = String(
            gsap.utils.clamp(0, 1, (p - 0.52) / 0.18),
          );
        if (hint.current)
          hint.current.style.opacity = String(
            1 - gsap.utils.clamp(0, 1, p / 0.12),
          );
      };

      if (prefersReducedMotion()) {
        progress.current.value = 0.86;
        setHeadlines(0.86);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=320%",
        scrub: 0.5,
        pin: ".cv-stage",
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current.value = self.progress;
          setHeadlines(self.progress);
        },
      });

      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section
      id="converge"
      ref={root}
      className="relative scroll-mt-20 bg-charcoal text-paper"
    >
      <div className="cv-stage relative h-screen w-full overflow-hidden">
        {/* 3D scene */}
        <Scene3D progress={progress} />

        {/* legibility scrims */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/90 to-transparent" />

        {/* headline overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-24 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[1240px]">
            <p className="kicker text-paper/50">After the chair</p>
            <div className="relative mt-5 h-[8.5rem] sm:h-[9.5rem]">
              <div ref={early} className="absolute inset-0">
                <h2 className="display-xl max-w-2xl text-paper">
                  Eight jobs after every patient.
                </h2>
                <p className="mt-4 max-w-md text-paper/65">
                  Notes, prescriptions, appointments, billing, follow-ups,
                  records, charting, tabs.
                </p>
              </div>
              <div ref={late} className="absolute inset-0" style={{ opacity: 0 }}>
                <h2 className="display-xl max-w-2xl text-paper">
                  One app that hears all of them.
                </h2>
                <p className="mt-4 max-w-md text-paper/65">
                  Speak once. Every record updates itself.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div
          ref={hint}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-paper/55"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to converge</span>
          <span className="h-8 w-[1px] animate-pulse bg-paper/40" />
        </div>
      </div>
    </section>
  );
}
