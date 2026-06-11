import type { CSSProperties } from "react";

type Props = {
  bars?: number;
  className?: string;
  /** When false, bars rest low and still (idle mic). */
  active?: boolean;
  color?: string;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Recurring voice motif. CSS-driven (cheap, pauses under prefers-reduced-motion
 * via the global rule). All dynamic values flow through CSS custom properties so
 * the server and client markup match exactly. Heights/timings vary per bar for a
 * calm, organic amplitude rather than a uniform EQ.
 */
export default function Waveform({
  bars = 28,
  className = "",
  active = true,
  color,
}: Props) {
  const seeds = Array.from({ length: bars }, (_, i) => {
    const t = bars > 1 ? i / (bars - 1) : 0.5;
    const env = Math.sin(t * Math.PI); // taller toward the middle
    const jitter = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
    return {
      dur: round(0.85 + jitter * 0.9),
      delay: round(-((jitter * 1.6) % 1.6)),
      base: round(0.22 + env * 0.7),
    };
  });

  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {seeds.map((s, i) => (
        <span
          key={i}
          className="wave-bar"
          data-idle={!active}
          style={
            {
              "--wb-base": s.base,
              "--wb-dur": `${s.dur}s`,
              "--wb-delay": `${s.delay}s`,
              ...(color ? { "--wb-color": color } : {}),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
