type Status = "appt" | "done" | "waiting" | "urgent" | "neutral";

const dot: Record<Status, string> = {
  appt: "bg-appt",
  done: "bg-done",
  waiting: "bg-waiting",
  urgent: "bg-urgent",
  neutral: "bg-ink-faint",
};

export default function StatusPill({
  status = "neutral",
  children,
  className = "",
  onDark = false,
}: {
  status?: Status;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        onDark
          ? "border-white/15 bg-white/5 text-paper"
          : "border-hairline bg-paper text-ink"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {children}
    </span>
  );
}
