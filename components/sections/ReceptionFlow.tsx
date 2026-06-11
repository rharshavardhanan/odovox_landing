import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

type Patient = { name: string; meta: string; sub: string; live?: boolean };
type Column = {
  title: string;
  dot: string;
  ring: string;
  patients: Patient[];
};

const COLUMNS: Column[] = [
  {
    title: "Waiting",
    dot: "bg-waiting",
    ring: "border-waiting/30",
    patients: [
      { name: "Anita R.", meta: "10:15", sub: "New patient" },
      { name: "Vikram S.", meta: "10:30", sub: "RCT review" },
    ],
  },
  {
    title: "In consultation",
    dot: "bg-appt",
    ring: "border-appt/30",
    patients: [{ name: "Meera K.", meta: "now", sub: "Crown prep", live: true }],
  },
  {
    title: "Billing",
    dot: "bg-ink",
    ring: "border-hairline",
    patients: [{ name: "Rahul T.", meta: "", sub: "₹3,200 to collect" }],
  },
  {
    title: "Completed",
    dot: "bg-done",
    ring: "border-done/30",
    patients: [{ name: "Sana P.", meta: "09:40", sub: "Scaling done" }],
  },
];

export default function ReceptionFlow() {
  return (
    <Section id="reception" surface="peach">
      <SectionHeading
        kicker="Reception flow"
        title="The front desk reads the room from across it."
        intro="One glance shows who is waiting, who is in the chair, who owes what, and who is done. Big, calm, unmistakable."
      />

      <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div
            key={col.title}
            data-reveal
            className="rounded-2xl border border-ink/10 bg-peach/50 p-3"
          >
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <span className="text-sm font-semibold text-ink">{col.title}</span>
              </div>
              <span className="text-xs text-ink-faint">{col.patients.length}</span>
            </div>

            <div className="space-y-2.5">
              {col.patients.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-xl border bg-paper px-4 py-4 shadow-soft ${col.ring}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg font-bold tracking-tight text-ink">
                      {p.name}
                    </p>
                    {p.live ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-appt">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-appt/60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-appt" />
                        </span>
                        live
                      </span>
                    ) : (
                      p.meta && (
                        <span className="tnum text-xs text-ink-faint">{p.meta}</span>
                      )
                    )}
                  </div>
                  <p className="tnum mt-1 text-sm text-ink-soft">{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
