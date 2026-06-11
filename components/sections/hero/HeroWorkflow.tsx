"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Waveform from "@/components/primitives/Waveform";

/** Row = one record field. Some fill slowly by typing, the rest only complete on voice. */
const ROWS = [
  { id: "notes", label: "Clinical notes", words: [38, 64, 52, 30], phase: "type" },
  { id: "rx", label: "Prescription", words: [44, 58, 26], phase: "type" },
  { id: "followup", label: "Follow-up", words: [40, 30], phase: "voice", chip: "Tue, next week" },
  { id: "billing", label: "Billing", words: [34, 22], phase: "voice", chip: "₹4,500" },
] as const;

const PILLS = ["Diagnosis", "Prescription", "Procedure", "Follow-up", "Billing"];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroWorkflow() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const q = gsap.utils.selector(el);
      const words = q(".hw-word");
      const checks = q(".hw-check");
      const pillDots = q(".hw-pill-dot");
      const pillChecks = q(".hw-pill-check");
      const timer = q(".hw-timer")[0] as HTMLElement;

      const setEnd = () => {
        // Resting state: a clean, completed record. The voice overlay has
        // already done its work and receded ("the software is invisible").
        gsap.set(words, { scaleX: 1 });
        gsap.set(checks, { scale: 1, autoAlpha: 1 });
        gsap.set(q(".hw-voice"), { autoAlpha: 0, scale: 1 });
        gsap.set(q(".hw-caption"), { autoAlpha: 0, y: 0 });
        gsap.set(q(".hw-complete"), { autoAlpha: 1, y: 0 });
        gsap.set(pillDots, { backgroundColor: "#3f8f5b" });
        gsap.set(pillChecks, { autoAlpha: 1 });
        if (timer) timer.textContent = "00:45";
      };

      if (prefersReducedMotion()) {
        setEnd();
        gsap.set(q(".hw-cursor"), { autoAlpha: 0 });
        return;
      }

      gsap.set(words, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(checks, { scale: 0, autoAlpha: 0, transformOrigin: "center" });
      gsap.set(q(".hw-voice"), { autoAlpha: 0, scale: 0.84 });
      gsap.set(q(".hw-caption"), { autoAlpha: 0, y: 10 });
      gsap.set(q(".hw-complete"), { autoAlpha: 0, y: 8 });
      gsap.set(q(".hw-cursor"), { autoAlpha: 0 });

      const typeWords = q('.hw-word[data-phase="type"]');
      const voiceWords = q('.hw-word[data-phase="voice"]');
      const typeRows = q('.hw-row[data-phase="type"]');

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.4,
        defaults: { ease: "power2.out" },
      });

      // proxy for the climbing "wasted time" clock
      const clock = { t: 0 };
      const fmt = (s: number) =>
        `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
          Math.floor(s % 60),
        ).padStart(2, "0")}`;

      // --- BURDEN: slow, laborious typing on the first two fields ---
      tl.to(q(".hw-cursor"), { autoAlpha: 1, duration: 0.3 }, 0);
      tl.to(
        clock,
        {
          t: 138,
          duration: 3.2,
          ease: "none",
          onUpdate: () => {
            if (timer) timer.textContent = fmt(clock.t);
          },
        },
        0,
      );

      typeRows.forEach((row, i) => {
        const rowWords = row.querySelectorAll<HTMLElement>(".hw-word");
        tl.to(
          q(".hw-cursor"),
          { y: (row as HTMLElement).offsetTop + 8, duration: 0.45 },
          i === 0 ? 0.3 : ">-0.1",
        );
        // a "tab switch" flicker before each field
        tl.to(q(".hw-stage"), { opacity: 0.78, duration: 0.12 }, "<")
          .to(q(".hw-stage"), { opacity: 1, duration: 0.2 }, ">");
        tl.to(rowWords, {
          scaleX: 1,
          duration: 0.22,
          stagger: 0.16,
          ease: "none",
        });
      });

      // --- FREEZE ---
      tl.to(q(".hw-cursor"), { autoAlpha: 0, duration: 0.3 }, ">0.1");
      tl.to(q(".hw-stage"), { opacity: 0.55, duration: 0.5 }, "<");
      tl.addLabel("voice", ">0.25");

      // --- VOICE: speak once, everything completes ---
      tl.to(q(".hw-stage"), { opacity: 1, duration: 0.5 }, "voice");
      tl.to(
        q(".hw-voice"),
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" },
        "voice",
      );
      tl.to(
        q(".hw-caption"),
        { autoAlpha: 1, y: 0, duration: 0.5 },
        "voice+=0.25",
      );
      tl.to(timer ? { v: 0 } : {}, {
        duration: 0.4,
        onStart: () => {
          if (timer) timer.textContent = "00:45";
        },
      });
      tl.to(
        voiceWords,
        { scaleX: 1, duration: 0.18, stagger: 0.04, ease: "power1.out" },
        "voice+=0.55",
      );
      tl.to(
        checks,
        { scale: 1, autoAlpha: 1, duration: 0.34, stagger: 0.07, ease: "back.out(1.4)" },
        "voice+=0.7",
      );
      tl.to(
        pillDots,
        { backgroundColor: "#3f8f5b", duration: 0.25, stagger: 0.06 },
        "voice+=0.8",
      );
      tl.to(
        pillChecks,
        { autoAlpha: 1, duration: 0.2, stagger: 0.06 },
        "voice+=0.85",
      );
      tl.to(
        q(".hw-complete"),
        { autoAlpha: 1, y: 0, duration: 0.4 },
        "voice+=1.0",
      );
      // voice recedes, leaving the clean completed record
      tl.to(
        q(".hw-voice"),
        { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" },
        "voice+=1.35",
      );

      // hold, then reset for the loop
      tl.to({}, { duration: 2.0 });
      tl.to(q(".hw-stage, .hw-voice, .hw-caption, .hw-complete"), {
        autoAlpha: 0,
        duration: 0.5,
      });
      tl.add(() => {
        gsap.set(words, { scaleX: 0 });
        gsap.set(checks, { scale: 0, autoAlpha: 0 });
        gsap.set(q(".hw-voice"), { scale: 0.84 });
        gsap.set(q(".hw-caption"), { y: 10 });
        gsap.set(q(".hw-complete"), { y: 8 });
        gsap.set(pillDots, { backgroundColor: "#cfccc4" });
        gsap.set(pillChecks, { autoAlpha: 0 });
        if (timer) timer.textContent = "00:00";
      });
      tl.to(q(".hw-stage"), { autoAlpha: 1, duration: 0.4 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative w-full select-none">
      {/* the record card */}
      <div className="relative overflow-hidden rounded-[1.6rem] border border-hairline bg-white shadow-float">
        {/* card chrome */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-hairline" />
            <span className="text-sm font-medium text-ink">
              Patient record · 36, RCT
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-faint">
            <span>typing</span>
            <span className="tnum hw-timer rounded-md bg-card px-1.5 py-0.5 text-ink-soft">
              00:00
            </span>
          </div>
        </div>

        <div className="hw-stage relative px-5 py-5">
          {/* moving cursor */}
          <div className="hw-cursor pointer-events-none absolute left-3 top-0 z-20">
            <svg width="18" height="18" viewBox="0 0 18 18" className="drop-shadow">
              <path
                d="M2 2l5.5 13 2-5.2 5.2-2L2 2z"
                fill="#161616"
                stroke="#fff"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="space-y-4">
            {ROWS.map((row) => (
              <div
                key={row.id}
                data-phase={row.phase}
                className="hw-row flex items-start gap-3"
              >
                <span className="hw-check mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-done/12 text-done">
                  <Check className="h-3 w-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                      {row.label}
                    </span>
                    {"chip" in row && row.chip && (
                      <span className="tnum rounded-md bg-card px-1.5 py-0.5 text-[0.7rem] text-ink-soft">
                        {row.chip}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {row.words.map((w, j) => (
                      <span
                        key={j}
                        data-phase={row.phase}
                        className="hw-word h-[9px] origin-left rounded-full bg-ink/[0.17]"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* voice cluster */}
          <div className="hw-voice pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center">
            <div className="hw-caption mb-3 max-w-[18rem] rounded-2xl bg-ink px-4 py-2.5 text-center text-[0.82rem] leading-snug text-paper shadow-float">
              “Root canal thirty-six. Pain reduced. Review next Tuesday.”
            </div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-float">
              <span className="absolute inset-0 animate-ping rounded-full bg-ink/20" />
              <Waveform bars={7} className="h-5 w-7 text-paper" />
            </div>
          </div>
        </div>

        {/* status footer */}
        <div className="flex flex-wrap items-center gap-2 border-t border-hairline bg-paper-alt px-5 py-3">
          {PILLS.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-2.5 py-1 text-[0.72rem] text-ink"
            >
              <span
                className="hw-pill-dot h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#cfccc4" }}
              />
              {p}
              <span className="hw-pill-check text-done" style={{ opacity: 0 }}>
                <Check className="h-2.5 w-2.5" />
              </span>
            </span>
          ))}
          <span className="hw-complete tnum ml-auto rounded-full bg-done/12 px-2.5 py-1 text-[0.72rem] font-semibold text-done">
            00:45 · Complete
          </span>
        </div>
      </div>
    </div>
  );
}
