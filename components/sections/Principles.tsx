import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

const PRINCIPLES = [
  { k: "Built around consultations", d: "The product begins where dentistry begins: the patient in the chair." },
  { k: "Built around workflow", d: "Every release removes steps. We never add them." },
  { k: "Built around reception", d: "The front desk sees the whole clinic without asking anyone." },
  { k: "Built around continuity of care", d: "Each visit remembers the last, so the dentist never re-reads a file." },
  { k: "Built around speech", d: "You talk the way you already do. The records keep up." },
];

export default function Principles() {
  return (
    <Section id="principles" surface="paper">
      <SectionHeading
        kicker="Product principles"
        title={
          <>
            No fake reviews. No invented numbers.
            <span className="block text-ink-soft">Only the workflow.</span>
          </>
        }
        intro="We will not pad this page with five-star quotes or imaginary dentist counts. The case for Odovox is the day it gives back."
      />

      <div className="mt-14 divide-y divide-hairline border-y border-hairline">
        {PRINCIPLES.map((p, i) => (
          <Reveal
            key={p.k}
            y={16}
            className="grid grid-cols-[auto_1fr] items-baseline gap-5 py-6 sm:grid-cols-[auto_0.9fr_1.1fr] sm:gap-8"
          >
            <span className="tnum font-display text-lg font-bold text-ink-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {p.k}
            </h3>
            <p className="col-start-2 text-base leading-relaxed text-ink-soft sm:col-start-3 sm:text-lg">
              {p.d}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
