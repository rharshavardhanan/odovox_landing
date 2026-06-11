import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

const STAGES = [
  { label: "Treatment", detail: "RCT · crown · 36", amt: "₹8,500" },
  { label: "Lab", detail: "Zirconia crown", amt: "₹2,500" },
  { label: "Invoice", detail: "GST included", amt: "₹11,000" },
  { label: "Payment", detail: "₹9,000 received", amt: "₹2,000 due", due: true },
];

const SUMMARY = [
  { k: "Treated", v: "₹11,000", tone: "text-ink" },
  { k: "Collected", v: "₹9,000", tone: "text-done" },
  { k: "Outstanding", v: "₹2,000", tone: "text-waiting" },
];

export default function Billing() {
  return (
    <Section id="billing" surface="mustard">
      <SectionHeading
        kicker="Billing & payments"
        title={
          <>
            What was treated. What was billed.
            <span className="block text-ink/55">What is still owed.</span>
          </>
        }
        intro="Every procedure, lab order, invoice and payment stays connected. No spreadsheets, no guessing at month-end."
      />

      <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            className="relative rounded-2xl border border-ink/10 bg-paper p-5 shadow-soft"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-ink-faint">
              {s.label}
            </p>
            <p className="mt-3 text-sm text-ink-soft">{s.detail}</p>
            <p
              className={`tnum mt-1 font-display text-xl font-bold tracking-tight ${
                s.due ? "text-waiting" : "text-ink"
              }`}
            >
              {s.amt}
            </p>
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-ink/25 lg:block"
              >
                →
              </span>
            )}
          </div>
        ))}
      </Reveal>

      <Reveal
        y={16}
        className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 rounded-2xl border border-ink/10 bg-paper/60 px-6 py-5"
      >
        {SUMMARY.map((s) => (
          <div key={s.k} className="flex items-baseline gap-2">
            <span className="text-sm text-ink-soft">{s.k}</span>
            <span className={`tnum font-display text-lg font-bold ${s.tone}`}>
              {s.v}
            </span>
          </div>
        ))}
        <span className="ml-auto text-sm text-ink-soft">
          Reconciled the moment you finish speaking.
        </span>
      </Reveal>
    </Section>
  );
}
