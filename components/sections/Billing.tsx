import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import PhoneFrame from "@/components/primitives/PhoneFrame";

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

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        {/* The real money screen */}
        <Reveal y={28} className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/45 blur-3xl" />
          <PhoneFrame
            src="/media/app-money.png"
            alt="The Odovox money screen: collections, pending payments and outstanding balances"
            className="relative max-w-[260px]"
          />
        </Reveal>

        {/* Flow + reconciliation */}
        <div>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {STAGES.map((s) => (
              <div
                key={s.label}
                data-reveal
                className="rounded-2xl border border-ink/10 bg-paper p-5 shadow-soft"
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
              </div>
            ))}
          </Reveal>

          <Reveal
            y={16}
            className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-ink/10 bg-paper/60 px-6 py-5"
          >
            {SUMMARY.map((s) => (
              <div key={s.k} className="flex items-baseline gap-2">
                <span className="text-sm text-ink-soft">{s.k}</span>
                <span className={`tnum font-display text-lg font-bold ${s.tone}`}>
                  {s.v}
                </span>
              </div>
            ))}
            <span className="w-full text-sm text-ink-soft sm:ml-auto sm:w-auto">
              Reconciled the moment you finish speaking.
            </span>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
