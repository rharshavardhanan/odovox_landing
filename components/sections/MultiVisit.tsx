import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

type Journey = {
  name: string;
  meta: string;
  dot: string;
  steps: string[];
};

const JOURNEYS: Journey[] = [
  {
    name: "Root canal",
    meta: "Multi-session",
    dot: "bg-appt",
    steps: ["Visit 1 · Access", "Visit 2 · Obturation", "Crown fitted", "Review"],
  },
  {
    name: "Implant",
    meta: "Staged over months",
    dot: "bg-done",
    steps: ["Consult", "Placement", "Healing", "Final restoration"],
  },
  {
    name: "Orthodontics",
    meta: "Month by month",
    dot: "bg-waiting",
    steps: ["Month 1", "Month 3", "Month 6", "Month 12"],
  },
];

export default function MultiVisit() {
  return (
    <Section id="multivisit" surface="paper-alt">
      <SectionHeading
        kicker="Multi-visit dentistry"
        title={
          <>
            Most software treats every visit as a stranger.
            <span className="block text-ink-soft">
              Odovox remembers the treatment.
            </span>
          </>
        }
        intro="Dentistry happens across visits, not in one. Each appointment knows what came before it and what comes next."
      />

      <div className="mt-14 space-y-5">
        {JOURNEYS.map((j) => (
          <Reveal
            key={j.name}
            y={18}
            className="rounded-2xl border border-hairline bg-paper p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${j.dot}`} />
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                {j.name}
              </h3>
              <span className="text-sm text-ink-faint">· {j.meta}</span>
            </div>

            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {j.steps.map((s, i) => (
                <li
                  key={s}
                  className="relative flex items-center gap-3 rounded-xl bg-card px-4 py-3"
                >
                  <span className="tnum flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-semibold text-ink-soft">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-ink">{s}</span>
                  {i < j.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-hairline lg:block"
                    >
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
