import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import Waveform from "@/components/primitives/Waveform";

const EXAMPLES = [
  {
    say: "Crown prep on thirty-six, cement next visit.",
    out: ["Procedure · Crown prep 36", "Next visit · Cementation", "Billing updated"],
  },
  {
    say: "Start ortho, upper and lower, review every month.",
    out: ["Treatment plan · Orthodontics", "Recall · Monthly review"],
  },
  {
    say: "Amoxicillin five hundred, thrice daily, five days.",
    out: ["Prescription · Amoxicillin 500mg", "1-1-1 · 5 days"],
  },
];

export default function VoiceFirst() {
  return (
    <Section id="voice" surface="sage">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            kicker="Voice-first clinic"
            title={
              <>
                The clinic already runs on speech.
                <span className="block text-ink/55">Your software should too.</span>
              </>
            }
            intro="No commands. No prompts. No training. You speak the way you already do with your assistant, and the records keep up."
          />

          <Reveal
            className="mt-9 flex items-center gap-4 rounded-2xl border border-ink/10 bg-sage/60 px-5 py-4"
            y={16}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
              <Waveform bars={6} className="h-4 w-6 text-paper" />
            </span>
            <p className="text-sm font-medium text-ink">
              Natural language only. The software stays out of the way.
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="space-y-3.5">
          {EXAMPLES.map((ex) => (
            <div
              key={ex.say}
              data-reveal
              className="rounded-2xl border border-ink/10 bg-paper px-5 py-5 shadow-soft"
            >
              <p className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                “{ex.say}”
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ex.out.map((o) => (
                  <span
                    key={o}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-xs font-medium text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-done" />
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
