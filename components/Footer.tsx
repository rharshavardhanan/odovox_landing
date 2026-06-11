import Logo from "@/components/primitives/Logo";
import CTAButton from "@/components/primitives/CTAButton";
import { CTA_HREF } from "@/lib/site";

const builtAround = [
  "consultations",
  "workflow",
  "reception",
  "continuity of care",
  "speech",
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper-alt">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-md">
            <Logo className="text-ink" />
            <p className="mt-5 text-lg leading-snug text-ink-soft measure">
              A voice-first dental operating system. Speak while you work; the
              records write themselves.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <CTAButton href={CTA_HREF} arrow>
              Watch the film
            </CTAButton>
            <a
              href="mailto:hello@odovox.com"
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              hello@odovox.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint">
          <span className="text-ink-soft">Built around</span>
          {builtAround.map((b, i) => (
            <span key={b}>
              <span className="text-ink">{b}</span>
              {i < builtAround.length - 1 && (
                <span className="px-2 text-hairline">/</span>
              )}
            </span>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-7 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Odovox. Dentistry, not data entry.</p>
          <p className="flex gap-5">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
