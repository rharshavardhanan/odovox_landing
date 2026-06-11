import Link from "next/link";

type Variant = "primary" | "ghost" | "onDark" | "ghostDark";

const base =
  "group inline-flex items-center gap-2 rounded-full text-[0.95rem] font-medium transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/40 active:translate-y-px";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-paper px-6 py-3 hover:bg-[#2a2a2a] shadow-soft",
  ghost:
    "text-ink px-2 py-1 hover:opacity-60",
  onDark:
    "bg-paper text-ink px-6 py-3 hover:bg-white shadow-soft focus-visible:ring-paper/50 focus-visible:ring-offset-charcoal",
  ghostDark:
    "text-paper px-2 py-1 hover:opacity-60 focus-visible:ring-paper/50 focus-visible:ring-offset-charcoal",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
  external = false,
}: Props) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  const cls = `${base} ${styles[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto")) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
