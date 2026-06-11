"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import PhoneFrame from "@/components/primitives/PhoneFrame";

type Node = {
  t: string;
  sec: number;
  label: string;
  tag: string;
  body: string;
  tone: "ink" | "appt" | "waiting" | "done";
};

const NODES: Node[] = [
  { t: "00:00", sec: 0, label: "Record", tag: "Voice", body: "Capture begins. The doctor just talks.", tone: "ink" },
  { t: "00:08", sec: 8, label: "Diagnosis", tag: "Diagnosis", body: "Irreversible pulpitis · tooth 36", tone: "appt" },
  { t: "00:15", sec: 15, label: "Prescription", tag: "Prescription", body: "Ibuprofen 400mg · 1-1-1 · 3 days", tone: "appt" },
  { t: "00:22", sec: 22, label: "Treatment", tag: "Procedure", body: "RCT started · 36 · access opened", tone: "appt" },
  { t: "00:32", sec: 32, label: "Billing", tag: "Billing", body: "₹4,500 · ₹2,000 received", tone: "waiting" },
  { t: "00:45", sec: 45, label: "Complete", tag: "Follow-up", body: "Review · Tuesday next week", tone: "done" },
];

const TONE: Record<Node["tone"], { dot: string; tag: string }> = {
  ink: { dot: "#161616", tag: "bg-ink/10 text-ink" },
  appt: { dot: "#3b6fd4", tag: "bg-appt/12 text-appt" },
  waiting: { dot: "#d8943a", tag: "bg-waiting/14 text-waiting" },
  done: { dot: "#3f8f5b", tag: "bg-done/12 text-done" },
};

function Timeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-2 left-[15px] top-2 w-[2px] bg-hairline">
        <div
          className="cs-fill absolute inset-x-0 top-0 h-full origin-top bg-ink"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {NODES.map((n, i) => (
        <div key={i} className="cs-node relative pb-7 pl-12 last:pb-0" data-i={i}>
          <span
            className="cs-dot absolute left-[8px] top-1 h-3.5 w-3.5 rounded-full border-2 border-hairline bg-paper"
            style={{ transform: "scale(0.85)" }}
          />
          <div className="flex items-baseline gap-3">
            <span className="cs-time tnum text-sm font-semibold text-ink-faint">
              {n.t}
            </span>
            <span className="cs-label text-sm font-semibold text-ink-faint">
              {n.label}
            </span>
          </div>
          <div className="cs-card mt-2 rounded-xl border border-hairline bg-white px-4 py-3 shadow-soft">
            <span
              className={`inline-block rounded-md px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide ${TONE[n.tone].tag}`}
            >
              {n.tag}
            </span>
            <p className="mt-1.5 text-[0.92rem] font-medium text-ink">{n.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Consultation45() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const clock = q(".cs-clock")[0] as HTMLElement;
      const reduced = prefersReducedMotion();

      const activate = (node: Element) => {
        const i = Number((node as HTMLElement).dataset.i);
        const tone = TONE[NODES[i].tone];
        return { i, tone };
      };

      if (reduced) {
        q(".cs-node").forEach((node) => {
          const { tone } = activate(node);
          gsap.set(node.querySelector(".cs-dot"), {
            backgroundColor: tone.dot,
            borderColor: tone.dot,
            scale: 1.1,
          });
          gsap.set(node.querySelectorAll(".cs-time, .cs-label"), { color: "#161616" });
        });
        gsap.set(q(".cs-fill"), { scaleY: 1 });
        if (clock) clock.textContent = "00:45";
        return;
      }

      const mm = gsap.matchMedia();

      const buildSequence = (pin: boolean) => {
        const nodes = q(".cs-node");
        gsap.set(q(".cs-card"), { autoAlpha: 0, y: 14 });

        const proxy = { v: 0 };
        const fmt = (s: number) => `00:${String(Math.round(s)).padStart(2, "0")}`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin ? q(".cs-pin")[0] : q(".cs-seq")[0],
            start: pin ? "top top" : "top 70%",
            end: pin ? "+=230%" : "bottom 60%",
            scrub: 0.6,
            pin: pin ? q(".cs-pin")[0] : false,
            anticipatePin: pin ? 1 : 0,
          },
        });

        tl.to(q(".cs-fill"), { scaleY: 1, ease: "none", duration: 1 }, 0);
        tl.to(
          proxy,
          {
            v: 45,
            ease: "none",
            duration: 1,
            onUpdate: () => {
              if (clock) clock.textContent = fmt(proxy.v);
            },
          },
          0,
        );

        nodes.forEach((node) => {
          const { i, tone } = activate(node);
          const pos = Math.max(0.001, NODES[i].sec / 45);
          tl.to(node.querySelector(".cs-dot"), {
            backgroundColor: tone.dot,
            borderColor: tone.dot,
            scale: 1.1,
            duration: 0.06,
          }, pos);
          tl.to(node.querySelectorAll(".cs-time, .cs-label"), {
            color: "#161616",
            duration: 0.06,
          }, pos);
          tl.to(node.querySelector(".cs-card"), {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
          }, pos);
        });

        return tl;
      };

      mm.add("(min-width: 768px)", () => {
        buildSequence(true);
      });
      mm.add("(max-width: 767px)", () => {
        buildSequence(false);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="consult-45" ref={root} className="relative scroll-mt-20 bg-paper">
      <div className="cs-pin">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 md:py-0">
          <div className="md:flex md:min-h-screen md:items-center md:py-20">
            <div className="grid w-full gap-12 md:grid-cols-[0.92fr_1.08fr] md:gap-14">
              {/* Left — anchor: clock, spoken line, real app */}
              <div>
                <p className="kicker text-ink-faint">The 45-second consultation</p>
                <h2 className="display-xl mt-5 max-w-md text-ink">
                  Complete records before the patient leaves the chair.
                </h2>

                <div className="mt-8 flex items-center gap-5">
                  <span className="cs-clock tnum font-display text-5xl font-bold tracking-tight text-ink">
                    00:00
                  </span>
                  <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-ink-soft">
                    one continuous sentence
                  </span>
                </div>

                <div className="mt-6 max-w-sm rounded-2xl bg-ink px-5 py-4 text-paper shadow-float">
                  <p className="text-[0.7rem] uppercase tracking-wider text-paper/50">
                    The doctor says
                  </p>
                  <p className="mt-1 text-[0.98rem] leading-snug">
                    “Root canal thirty-six. Pain reduced. Review next Tuesday.”
                  </p>
                </div>

                <div className="mt-8 hidden lg:block">
                  <PhoneFrame
                    src="/media/app-home.jpg"
                    alt="Odovox home screen: start a consultation, queue is clear"
                    className="!mx-0 max-w-[220px]"
                  />
                </div>
              </div>

              {/* Right — the records writing themselves */}
              <div className="cs-seq">
                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
