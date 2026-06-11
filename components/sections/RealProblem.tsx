"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Waveform from "@/components/primitives/Waveform";

const ACTIONS = [
  "Type clinical notes",
  "Type prescription",
  "Switch tab",
  "Update patient record",
  "Schedule follow-up",
  "Update billing",
];
const ROWS = [...ACTIONS, ...ACTIONS, ...ACTIONS];
const DONE = ["Notes", "Prescription", "Procedure", "Follow-up", "Billing"];

function CursorGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 18 18" aria-hidden>
      <path d="M2 2l5.5 13 2-5.2 5.2-2L2 2z" fill="#161616" />
    </svg>
  );
}

function ActionRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline bg-white/80 px-4 py-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-card">
        <CursorGlyph />
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="ml-auto h-1.5 w-16 rounded-full bg-ink/10 sm:w-24" />
    </div>
  );
}

function MicResult() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-ink text-paper shadow-float">
        <span className="absolute inset-0 animate-ping rounded-full bg-ink/15" />
        <Waveform bars={9} className="h-7 w-10 text-paper" />
      </div>
      <p className="rp-caption mt-6 font-display text-2xl font-bold tracking-tight text-ink">
        Speak. Everything updates.
      </p>
      <div className="rp-pills mt-5 flex flex-wrap justify-center gap-2">
        {DONE.map((d) => (
          <span
            key={d}
            className="inline-flex items-center gap-1.5 rounded-full border border-done/30 bg-done/10 px-3 py-1 text-xs font-medium text-done"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-done" />
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RealProblem() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      if (prefersReducedMotion()) {
        // Clean resolved composition: the pile gives way to one voice.
        gsap.set(q(".rp-list"), { autoAlpha: 0 });
        gsap.set(q(".rp-mic"), { autoAlpha: 1, scale: 1 });
        gsap.set(q(".rp-caption, .rp-pills > *"), { autoAlpha: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const q = gsap.utils.selector(root);
        const counter = q(".rp-counter")[0] as HTMLElement;
        const proxy = { v: 0 };

        gsap.set(q(".rp-mic"), { autoAlpha: 0, scale: 0.2 });
        gsap.set(q(".rp-caption"), { autoAlpha: 0, y: 16 });
        gsap.set(q(".rp-pills > *"), { autoAlpha: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".rp-stage")[0],
            start: "top top",
            end: "+=190%",
            scrub: 0.6,
            pin: q(".rp-pin")[0],
            anticipatePin: 1,
          },
        });

        // repetition scrolls endlessly upward; the toll climbs
        tl.fromTo(
          q(".rp-list"),
          { yPercent: 4 },
          { yPercent: -48, ease: "none", duration: 0.55 },
          0,
        );
        tl.to(
          proxy,
          {
            v: 312,
            duration: 0.55,
            ease: "none",
            onUpdate: () => {
              if (counter)
                counter.textContent = `${Math.round(proxy.v)} fields re-entered today`;
            },
          },
          0,
        );

        // collapse the pile into one voice
        tl.to(
          q(".rp-list"),
          {
            scale: 0.05,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
            ease: "power2.in",
            duration: 0.28,
          },
          0.55,
        );
        tl.set(counter, { textContent: "One voice command" }, 0.72);
        tl.to(
          q(".rp-mic"),
          { autoAlpha: 1, scale: 1, ease: "power3.out", duration: 0.22 },
          0.66,
        );
        tl.to(
          q(".rp-caption"),
          { autoAlpha: 1, y: 0, duration: 0.18 },
          0.78,
        );
        tl.to(
          q(".rp-pills > *"),
          { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.16 },
          0.84,
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="problem"
      ref={root}
      className="relative scroll-mt-20 bg-warmgrey text-ink"
    >
      {/* ---------- Desktop: pinned scrubbed collapse ---------- */}
      <div className="rp-stage hidden md:block">
        <div className="rp-pin flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 items-center gap-12 px-8">
            <div>
              <p className="kicker text-ink-faint">The real problem</p>
              <h2 className="display-xl mt-5 text-ink">
                The consultation takes minutes.
                <span className="mt-2 block text-ink-soft">
                  The documentation takes hours.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft measure">
                The pain was never paper. It is the same handful of actions,
                repeated after every single patient.
              </p>
              <p className="tnum rp-counter mt-8 inline-block rounded-full border border-hairline bg-white/70 px-4 py-2 text-sm font-medium text-ink">
                0 fields re-entered today
              </p>
            </div>

            <div className="relative h-[80vh]">
              {/* the repeating pile */}
              <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                <div className="rp-list space-y-3 will-change-transform">
                  {ROWS.map((label, i) => (
                    <ActionRow key={i} label={label} />
                  ))}
                </div>
              </div>
              {/* the collapse target */}
              <div className="rp-mic absolute inset-0 flex items-center justify-center">
                <MicResult />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: static, no pin ---------- */}
      <div className="px-5 py-24 md:hidden">
        <p className="kicker text-ink-faint">The real problem</p>
        <h2 className="display-lg mt-4 text-ink">
          The consultation takes minutes.
          <span className="mt-1 block text-ink-soft">
            The documentation takes hours.
          </span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          The pain was never paper. It is the same handful of actions, repeated
          after every patient.
        </p>
        <div className="mt-7 space-y-2.5">
          {ACTIONS.map((label) => (
            <ActionRow key={label} label={label} />
          ))}
        </div>
        <div className="mt-7 flex justify-center text-ink-faint">↓</div>
        <div className="mt-7 rounded-2xl border border-hairline bg-white/70 p-7">
          <MicResult />
        </div>
      </div>
    </section>
  );
}
