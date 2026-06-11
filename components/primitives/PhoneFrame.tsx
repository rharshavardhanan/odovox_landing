type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Children render as an overlay inside the screen (e.g. captions, glow). */
  children?: React.ReactNode;
};

/**
 * Premium thin-bezel phone holding a real Odovox screenshot. The screenshot is
 * shown at its natural aspect ratio (no cropping), so different screens are not
 * distorted. The bezel is the only frame.
 */
export default function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
  children,
}: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      <div className="rounded-[2.5rem] bg-ink p-[7px] shadow-float">
        <div className="relative overflow-hidden rounded-[2.05rem] bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="block h-auto w-full"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
