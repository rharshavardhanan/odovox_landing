import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Children render as an overlay inside the screen (e.g. captions, glow). */
  children?: React.ReactNode;
};

/**
 * Premium thin-bezel phone holding a real Odovox screenshot. The screenshot
 * carries its own status bar/island; the bezel just gives it weight.
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
        <div
          className="relative overflow-hidden rounded-[2.05rem] bg-paper"
          style={{ aspectRatio: "418 / 887" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="300px"
            className="object-cover object-top"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
