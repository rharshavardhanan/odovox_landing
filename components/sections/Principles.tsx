import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import Waveform from "@/components/primitives/Waveform";
import { Mark } from "@/components/primitives/Logo";

const PRINCIPLES = [
  { k: "Built around consultations", d: "The product begins where dentistry begins: the patient in the chair.", dot: "bg-appt" },
  { k: "Built around workflow", d: "Every release removes steps. We never add them.", dot: "bg-done" },
  { k: "Built around reception", d: "The front desk sees the whole clinic without asking anyone.", dot: "bg-waiting" },
  { k: "Built around continuity of care", d: "Each visit remembers the last, so the dentist never re-reads a file.", dot: "bg-appt" },
  { k: "Built around speech", d: "You talk the way you already do. The records keep up.", dot: "bg-done" },
];

export default function Principles() {
  return (
    <Section id="principles" surface="paper">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Left — message + voice panel */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="kicker text-ink-faint">Product principles</p>
          <h2 className="display-lg mt-5 text-ink">
            No fake reviews. No invented numbers.
            <span className="block text-ink-soft">Only the workflow.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft measure">
            We will not pad this page with five-star quotes or imaginary dentist
            counts. The case for Odovox is the day it gives back.
          </p>

          <div className="mt-9 overflow-hidden rounded-[1.5rem] bg-charcoal p-8 text-paper shadow-float">
            <div className="flex items-center gap-3 text-paper">
              <Mark className="h-7 w-7" />
              <span className="font-display text-lg font-bold tracking-tight">
                Built on speech
              </span>
            </div>
            <div className="mt-8 flex h-24 items-center">
              <Waveform bars={52} className="h-full w-full text-paper/85" />
            </div>
            <p className="mt-7 text-paper/65 measure">
              Every part of Odovox answers one question: does this give the
              dentist their time back?
            </p>
          </div>
        </Reveal>

        {/* Right — the principles */}
        <div className="divide-y divide-hairline border-t border-hairline">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.k}
              y={16}
              className="flex items-start gap-5 py-7 sm:gap-7"
            >
              <span className="tnum mt-1 font-display text-xl font-bold text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                  {p.k}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
