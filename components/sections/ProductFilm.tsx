import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

function Film({
  src,
  poster,
  caption,
  className = "",
}: {
  src: string;
  poster: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-float">
        <video
          className="aspect-video w-full"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
        />
      </div>
      <figcaption className="mt-3 text-sm text-paper/55">{caption}</figcaption>
    </figure>
  );
}

export default function ProductFilm() {
  return (
    <Section id="film" surface="charcoal">
      <SectionHeading
        onDark
        kicker="Product film"
        title="Watch a day run on speech."
        intro="No feature tour. Just the work: a consultation captured by voice, and the documentation that used to take the rest of the afternoon."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <Reveal y={24}>
          <Film
            src="/media/voice-autofill.mp4"
            poster="/media/voice-autofill-poster.jpg"
            caption="A new patient captured by voice. Name, complaint and history filled while the dentist talks."
          />
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <Film
            src="/media/clinic-scene.mp4"
            poster="/media/clinic-scene-poster.jpg"
            caption="The alternative: the part of the day no one trained for."
          />
        </Reveal>
      </div>
    </Section>
  );
}
