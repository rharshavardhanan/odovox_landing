import HeroWorkflow from "./hero/HeroWorkflow";
import CTAButton from "@/components/primitives/CTAButton";
import Reveal from "@/components/primitives/Reveal";
import { CTA_HREF } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-28"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left — the message */}
        <Reveal stagger className="max-w-xl">
          <p
            data-reveal
            className="kicker text-ink-faint"
          >
            Voice-first dental operating system
          </p>

          <h1 data-reveal className="display-hero mt-6 text-ink">
            You became a dentist.
            <span className="mt-2 block text-ink-soft">
              Not a data&#8209;entry operator.
            </span>
          </h1>

          <div data-reveal className="mt-8 max-w-md">
            <p className="text-lg font-medium leading-snug text-ink">
              Consultations. Prescriptions. Appointments. Billing. Follow-ups.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              Still taking longer than the treatment itself. Odovox records the
              clinic while you work.
            </p>
          </div>

          <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
            <CTAButton href={CTA_HREF} arrow>
              Watch the film
            </CTAButton>
            <CTAButton href="#converge" variant="ghost">
              See how it works
            </CTAButton>
          </div>
        </Reveal>

        {/* Right — the proof in motion */}
        <Reveal className="w-full" y={28} delay={0.15}>
          <div className="relative mx-auto max-w-[420px]">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.4rem] bg-sage/40 blur-2xl" />
            <HeroWorkflow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
