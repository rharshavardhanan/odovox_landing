"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/primitives/SectionHeading";

const NODES = [
  { label: "Diagnosis", detail: "Pulpitis · 36" },
  { label: "X-rays", detail: "2 periapicals" },
  { label: "Procedures", detail: "RCT · crown" },
  { label: "Prescriptions", detail: "Amox · ibuprofen" },
  { label: "Implants", detail: "46 · healing" },
  { label: "Payments", detail: "₹18,200 cleared" },
  { label: "Recalls", detail: "6-month review" },
];

function NodeCard({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-white px-3.5 py-2.5 shadow-soft">
      <p className="text-[0.82rem] font-semibold text-ink">{label}</p>
      <p className="tnum mt-0.5 text-[0.72rem] text-ink-soft">{detail}</p>
    </div>
  );
}

export default function PatientMemory() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();

      const setActive = (node: Element) => {
        gsap.set(node.querySelector(".pm-dot"), {
          backgroundColor: "#161616",
          borderColor: "#161616",
          scale: 1,
        });
        gsap.set(node.querySelector(".pm-card"), { autoAlpha: 1, y: 0 });
      };

      if (reduced) {
        gsap.set(q(".pm-fill"), { scaleX: 1 });
        gsap.set(q(".pm-vfill"), { scaleY: 1 });
        q(".pm-node").forEach(setActive);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(q(".pm-card"), { autoAlpha: 0, y: 12 });
        gsap.set(q(".pm-dot"), { scale: 0.8 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".pm-track")[0],
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.6,
          },
        });
        tl.to(q(".pm-fill"), { scaleX: 1, ease: "none", duration: 1 }, 0);
        q(".pm-node").forEach((node, i) => {
          const pos = i / (NODES.length - 1);
          tl.to(node.querySelector(".pm-dot"), {
            backgroundColor: "#161616",
            borderColor: "#161616",
            scale: 1,
            duration: 0.05,
          }, pos * 0.92 + 0.02);
          tl.to(node.querySelector(".pm-card"), {
            autoAlpha: 1,
            y: 0,
            duration: 0.06,
          }, pos * 0.92 + 0.02);
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(q(".pm-card"), { autoAlpha: 0, y: 12 });
        gsap.set(q(".pm-dot"), { scale: 0.8 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".pm-vtrack")[0],
            start: "top 78%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        });
        tl.to(q(".pm-vfill"), { scaleY: 1, ease: "none", duration: 1 }, 0);
        q(".pm-vnode .pm-node").forEach((node, i) => {
          const pos = i / (NODES.length - 1);
          tl.to(node.querySelector(".pm-dot"), {
            backgroundColor: "#161616",
            borderColor: "#161616",
            scale: 1,
            duration: 0.05,
          }, pos * 0.9 + 0.02);
          tl.to(node.querySelector(".pm-card"), {
            autoAlpha: 1,
            y: 0,
            duration: 0.06,
          }, pos * 0.9 + 0.02);
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="memory" ref={root} className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          kicker="Patient memory"
          title={
            <>
              Every visit remembered.
              <span className="block text-ink-soft">
                So the dentist doesn&apos;t have to be.
              </span>
            </>
          }
          intro="Diagnoses, x-rays, procedures, prescriptions, implants, payments and recalls, connected on one continuous patient story."
        />

        {/* Desktop — horizontal self-drawing timeline */}
        <div className="pm-track relative mt-20 hidden h-[300px] md:block">
          <div className="absolute left-[3%] right-[3%] top-1/2 h-[2px] -translate-y-1/2 bg-hairline">
            <div
              className="pm-fill absolute inset-y-0 left-0 w-full origin-left bg-ink"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          {NODES.map((n, i) => {
            const left = 3 + (i / (NODES.length - 1)) * 94;
            const above = i % 2 === 0;
            return (
              <div
                key={n.label}
                className="pm-node absolute top-1/2 w-[150px] -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <span className="pm-dot absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-hairline bg-paper" />
                <div
                  className={`pm-card absolute left-1/2 -translate-x-1/2 ${
                    above ? "bottom-[18px]" : "top-[18px]"
                  }`}
                >
                  <NodeCard {...n} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile — vertical self-drawing timeline */}
        <div className="pm-vtrack relative mt-12 md:hidden">
          <div className="absolute bottom-2 left-[7px] top-2 w-[2px] bg-hairline">
            <div
              className="pm-vfill absolute inset-x-0 top-0 h-full origin-top bg-ink"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          {NODES.map((n) => (
            <div key={n.label} className="pm-vnode">
              <div className="pm-node relative pb-6 pl-10">
                <span className="pm-dot absolute left-[1px] top-1 h-4 w-4 rounded-full border-2 border-hairline bg-paper" />
                <div className="pm-card">
                  <NodeCard {...n} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
