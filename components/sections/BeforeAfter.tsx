import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import Waveform from "@/components/primitives/Waveform";

const BEFORE = [
  "Type clinical notes",
  "Switch between tabs",
  "Update the patient record",
  "Create the next appointment",
  "Write the prescription",
  "Update the billing",
];

const AFTER = ["Notes", "Prescription", "Procedure", "Appointment", "Billing", "Follow-up"];

export default function BeforeAfter() {
  return (
    <Section id="before-after" surface="warmgrey">
      <SectionHeading
        kicker="Before / after"
        title="The same five minutes, spent two ways."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* Before */}
        <Reveal y={20} className="rounded-[1.5rem] border border-hairline bg-paper p-7 sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-ink-faint">
            Before
          </p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-soft">
            Six jobs after every patient.
          </p>
          <ul className="mt-6 space-y-2.5">
            {BEFORE.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-card px-4 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-ink-faint">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm text-ink-soft">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* After */}
        <Reveal y={20} delay={0.08} className="flex flex-col rounded-[1.5rem] bg-ink p-7 text-paper sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-paper/45">
            After
          </p>
          <div className="mt-2 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
              <Waveform bars={7} className="h-5 w-7 text-ink" />
            </span>
            <p className="font-display text-2xl font-bold tracking-tight">
              Speak once.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {AFTER.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-done" />
                {a}
              </span>
            ))}
          </div>

          <p className="mt-auto pt-8 text-lg leading-relaxed text-paper/70">
            Everything updates together. The documentation is done before the
            chair is empty.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
