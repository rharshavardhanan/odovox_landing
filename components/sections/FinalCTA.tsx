import CTAButton from "@/components/primitives/CTAButton";
import Reveal from "@/components/primitives/Reveal";
import Waveform from "@/components/primitives/Waveform";
import { CTA_HREF } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-paper"
    >
      <div className="mx-auto flex min-h-[78vh] max-w-[1100px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
        <Reveal stagger>
          <span
            data-reveal
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper"
          >
            <Waveform bars={7} className="h-5 w-7 text-paper" />
          </span>

          <h2 data-reveal className="display-hero mt-9 text-ink">
            You became a dentist.
            <span className="mt-2 block text-ink-soft">Not a typist.</span>
          </h2>

          <p
            data-reveal
            className="mx-auto mt-7 max-w-xl text-xl leading-relaxed text-ink-soft"
          >
            Odovox does the clinical admin by voice, so the rest of your day
            belongs to dentistry again.
          </p>

          <div
            data-reveal
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <CTAButton href={CTA_HREF} arrow className="px-7 py-3.5 text-base">
              Watch the film
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
