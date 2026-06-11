type Surface =
  | "paper"
  | "paper-alt"
  | "sage"
  | "peach"
  | "mustard"
  | "dusty"
  | "warmgrey"
  | "charcoal";

const bg: Record<Surface, string> = {
  paper: "bg-paper text-ink",
  "paper-alt": "bg-paper-alt text-ink",
  sage: "bg-sage text-ink",
  peach: "bg-peach text-ink",
  mustard: "bg-mustard text-ink",
  dusty: "bg-dusty text-ink",
  warmgrey: "bg-warmgrey text-ink",
  charcoal: "bg-charcoal text-paper",
};

export default function Section({
  id,
  surface = "paper",
  className = "",
  innerClassName = "",
  container = true,
  children,
}: {
  id?: string;
  surface?: Surface;
  className?: string;
  innerClassName?: string;
  container?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 ${bg[surface]} ${className}`}
    >
      {container ? (
        <div
          className={`mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32 ${innerClassName}`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
