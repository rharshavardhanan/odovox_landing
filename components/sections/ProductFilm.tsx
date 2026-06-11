import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import BrandFilm from "@/components/primitives/BrandFilm";

export default function ProductFilm() {
  return (
    <Section id="film" surface="charcoal">
      <SectionHeading
        onDark
        kicker="Product film"
        title="The whole story, in thirty seconds."
        intro="The admin pile-up after every patient, collapsed into one voice, and the records writing themselves. Tap for sound."
      />

      <Reveal y={28} className="mt-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-float">
          <div className="pointer-events-none absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2 text-xs font-medium text-paper/85 backdrop-blur-[2px]">
            <span className="h-1.5 w-1.5 rounded-full bg-done" />
            Odovox · film
          </div>
          <BrandFilm
            src="/media/odovox-film.mp4"
            poster="/media/odovox-film-poster.jpg"
            className="aspect-video w-full"
          />
        </div>
      </Reveal>
    </Section>
  );
}
