import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import Waveform from "@/components/primitives/Waveform";

function ToothXray() {
  return (
    <svg viewBox="0 0 220 260" className="h-full w-full" role="img" aria-label="Periapical x-ray of tooth 36 showing periapical pathology">
      <defs>
        <radialGradient id="xr" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#3a3a34" />
          <stop offset="100%" stopColor="#1d1d1a" />
        </radialGradient>
        <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfc6b2" />
          <stop offset="100%" stopColor="#8f8775" />
        </linearGradient>
      </defs>
      <rect width="220" height="260" rx="10" fill="url(#xr)" />
      {/* faint bone grid */}
      <g stroke="#ffffff" strokeOpacity="0.04">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="10" y1={y} x2="210" y2={y} />
        ))}
      </g>
      {/* crown */}
      <path
        d="M70 70c0-16 16-26 40-26s40 10 40 26c0 14-10 22-10 34 0 0-6 6-30 6s-30-6-30-6c0-12-10-20-10-34z"
        fill="url(#bone)"
        opacity="0.92"
      />
      {/* two roots */}
      <path d="M92 108c-6 30-10 56-16 78-3 11-12 10-13-1-2-26 5-58 12-79z" fill="url(#bone)" opacity="0.85" />
      <path d="M128 108c6 30 10 56 16 78 3 11 12 10 13-1 2-26-5-58-12-79z" fill="url(#bone)" opacity="0.85" />
      {/* periapical lesion highlight */}
      <circle cx="146" cy="196" r="13" fill="#d8943a" fillOpacity="0.28" />
      <circle cx="146" cy="196" r="13" stroke="#d8943a" strokeOpacity="0.7" fill="none" />
    </svg>
  );
}

export default function ConsultMode() {
  return (
    <Section id="consult-mode" surface="charcoal" className="overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative">
        <SectionHeading
          onDark
          kicker="Consult mode"
          align="center"
          titleClassName="display-xl"
          title={
            <>
              Focus on the patient.
              <span className="block text-paper/45">Not the software.</span>
            </>
          }
          intro="One tap and the world goes quiet. No menus, no tabs, no forms. Only what is in front of you, and your voice."
        />

        <Reveal y={26} className="mx-auto mt-14 max-w-3xl">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-charcoal-soft shadow-float">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-done" />
                <span className="text-sm font-medium text-paper">
                  Tooth 36 · Lower left first molar
                </span>
              </div>
              <span className="text-xs text-paper/45">Visit 1 of 2</span>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[160px_1fr] sm:gap-8">
              <div className="aspect-[220/260] overflow-hidden rounded-xl">
                <ToothXray />
              </div>

              <div className="flex flex-col">
                <div className="space-y-5">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-paper/40">
                      Diagnosis
                    </p>
                    <p className="mt-1 text-lg font-medium text-paper">
                      Irreversible pulpitis with apical periodontitis
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-paper/40">
                      Treatment
                    </p>
                    <p className="mt-1 text-lg font-medium text-paper">
                      Root canal therapy · access &amp; cleaning today
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
                    <Waveform bars={6} className="h-4 w-6 text-ink" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-paper">Listening</p>
                    <p className="text-xs text-paper/50">
                      “Pain reduced. Review next Tuesday.”
                    </p>
                  </div>
                  <span className="tnum ml-auto text-xs text-paper/40">00:31</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
