import Reveal from "./Reveal";

/**
 * Editorial section heading. Kicker is optional and intentionally not stamped on
 * every section (avoids AI-scaffolding grammar). Left-aligned by default.
 */
export default function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  onDark = false,
  className = "",
  titleClassName = "display-xl",
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      stagger
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {kicker && (
        <p
          data-reveal
          className={`kicker mb-5 ${onDark ? "text-paper/55" : "text-ink-faint"}`}
        >
          {kicker}
        </p>
      )}
      <h2 data-reveal className={`${titleClassName} ${onDark ? "text-paper" : "text-ink"}`}>
        {title}
      </h2>
      {intro && (
        <div
          data-reveal
          className={`mt-6 text-lg leading-relaxed measure-wide ${
            align === "center" ? "mx-auto" : ""
          } ${onDark ? "text-paper/70" : "text-ink-soft"}`}
        >
          {intro}
        </div>
      )}
    </Reveal>
  );
}
