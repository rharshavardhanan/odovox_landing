type Props = {
  className?: string;
  showWordmark?: boolean;
};

/** Odovox mark: a squircle holding a calm four-bar voice signature. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Odovox"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <g fill="var(--color-paper)">
        <rect x="8" y="13" width="2.6" height="6" rx="1.3" />
        <rect x="12.7" y="9.5" width="2.6" height="13" rx="1.3" />
        <rect x="17.4" y="6.5" width="2.6" height="19" rx="1.3" />
        <rect x="22.1" y="11.5" width="2.6" height="9" rx="1.3" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "", showWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-7 w-7" />
      {showWordmark && (
        <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]">
          Odovox
        </span>
      )}
    </span>
  );
}
