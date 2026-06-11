"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import PhoneFrame from "@/components/primitives/PhoneFrame";

const Scene3D = dynamic(() => import("./convergence/Scene3D"), { ssr: false });

const TASKS = [
  "Clinical notes",
  "Prescription",
  "Appointment",
  "Billing",
  "Follow-up",
  "Patient record",
  "Charting",
  "Tab switching",
];

export default function Convergence() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const early = useRef<HTMLDivElement>(null);
  const late = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const [show3d, setShow3d] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // WebGL only on large screens; phones/tablets get a static fallback.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !isDesktop) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow3d(entry.isIntersecting),
      { rootMargin: "150% 0px 150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isDesktop]);

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

      if (!isDesktop) return;

      if (prefersReducedMotion()) {
        progress.current.value = 0.86;
        setHeadlines(0.86);
        return;
      }

      // Non-pinned: just read scroll progress across the tall track. The stage
      // stays in view via CSS `position: sticky` (no ScrollTrigger pin, so it
      // can never create a pin-spacer that collides with the next section).
      const st = ScrollTrigger.create({
        trigger: track.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progress.current.value = self.progress;
          setHeadlines(self.progress);
        },
      });

      return () => st.kill();
    },
    { dependencies: [isDesktop], scope: root },
  );

  return (
    <section
      id="converge"
      ref={root}
      className="relative scroll-mt-20 bg-charcoal text-paper"
    >
      {/* ---------- Desktop: tall track + sticky 3D stage ---------- */}
      <div ref={track} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {show3d && isDesktop && <Scene3D progress={progress} />}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/90 to-transparent" />

          <div className="pointer-events-none absolute inset-x-0 top-0 px-8 pt-28">
            <div className="mx-auto max-w-[1240px]">
              <p className="kicker text-paper/50">After the chair</p>
              <div className="relative mt-5 h-[9.5rem]">
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

          <div
            ref={hint}
            className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-paper/55"
          >
            <span className="text-xs uppercase tracking-[0.2em]">
              Scroll to converge
            </span>
            <span className="h-8 w-[1px] animate-pulse bg-paper/40" />
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet: static fallback ---------- */}
      <div className="px-5 py-20 sm:px-8 lg:hidden">
        <p className="kicker text-paper/50">After the chair</p>
        <h2 className="display-lg mt-4 text-paper">
          Eight jobs after every patient.
        </h2>
        <div className="mt-7 grid grid-cols-2 gap-2.5">
          {TASKS.map((t) => (
            <span
              key={t}
              className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-paper/85"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="text-paper/40">↓</span>
          <p className="text-center font-display text-2xl font-bold tracking-tight text-paper">
            One app that hears all of them.
          </p>
        </div>

        <div className="mt-8">
          <PhoneFrame
            src="/media/app-home.jpg"
            alt="The Odovox app: every record in one place"
            className="max-w-[240px]"
          />
        </div>
      </div>
    </section>
  );
}
