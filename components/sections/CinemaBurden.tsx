import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import BrandFilm from "@/components/primitives/BrandFilm";

export default function CinemaBurden() {
  return (
    <Section id="burden" surface="charcoal">
      <SectionHeading
        onDark
        kicker="After the chair"
        title={
          <>
            Minutes of treatment.
            <span className="block text-paper/55">Hours of typing.</span>
          </>
        }
        intro="The real work of dentistry keeps getting interrupted by the work of documenting it. Same screen, same forms, every single patient."
      />

      <Reveal y={28} className="mt-12">
        <figure>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-float">
            <BrandFilm
              src="/media/clinic-scene.mp4"
              poster="/media/clinic-scene-poster.jpg"
              className="aspect-video w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-paper/55">
            The part of the day no one trained for. Tap for sound.
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
