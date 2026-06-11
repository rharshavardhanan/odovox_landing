import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadSans } from "@remotion/google-fonts/HankenGrotesk";

const { fontFamily: DISPLAY } = loadDisplay("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const { fontFamily: SANS } = loadSans("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

const C = {
  paper: "#F8F7F4",
  paperAlt: "#F1EEE6",
  ink: "#161616",
  inkSoft: "#5B5954",
  inkFaint: "#94908620",
  card: "#ECEBE8",
  hair: "#E4E0D7",
  charcoal: "#17170F",
  charcoal2: "#201F1A",
  panel: "#24231D",
  done: "#3F8F5B",
  appt: "#3B6FD4",
  waiting: "#D8943A",
  sage: "#DDE8DD",
  peach: "#F5D5BC",
  dusty: "#DCE8F7",
  mustard: "#F3E6A8",
};

const smooth = (frame, fps, delay = 0, cfg = { damping: 200 }) =>
  spring({ frame: frame - delay, fps, config: cfg });

const scurve = (frame, a, b) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

const sceneFade = (frame, total, fadeIn = 16, fadeOut = 16) =>
  interpolate(
    frame,
    [0, fadeIn, total - fadeOut, total],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

/* ---------- atoms ---------- */
function Mark({ size = 64, bg = C.ink, fg = C.paper }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill={bg} />
      <g fill={fg}>
        <rect x="8" y="13" width="2.6" height="6" rx="1.3" />
        <rect x="12.7" y="9.5" width="2.6" height="13" rx="1.3" />
        <rect x="17.4" y="6.5" width="2.6" height="19" rx="1.3" />
        <rect x="22.1" y="11.5" width="2.6" height="9" rx="1.3" />
      </g>
    </svg>
  );
}

function Waveform({ frame, color = C.paper, bars = 8, bw = 9, gap = 6, maxH = 64 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap, height: maxH }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = (0.26 + 0.74 * Math.abs(Math.sin(frame * 0.16 + i * 0.8))) * maxH;
        return <div key={i} style={{ width: bw, height: h, borderRadius: bw, background: color }} />;
      })}
    </div>
  );
}

function Check({ size = 24, color = C.done }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stroke = (color) => ({ fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" });
function Icon({ name, color, size = 26 }) {
  const p = stroke(color);
  const c = { width: size, height: size, viewBox: "0 0 24 24" };
  if (name === "notes")
    return (<svg {...c}><path d="M6 3h9l4 4v14H6z" {...p} /><path d="M9 9h7M9 13h7M9 17h4" {...p} /></svg>);
  if (name === "rx")
    return (<svg {...c}><rect x="13" y="11" width="8" height="8" rx="4" {...p} /><path d="M17 13.5v3M15.5 15h3" {...p} /><rect x="4" y="4" width="9" height="9" rx="4.5" {...p} /></svg>);
  if (name === "calendar")
    return (<svg {...c}><rect x="4" y="5" width="16" height="15" rx="3" {...p} /><path d="M4 9h16M8 3v4M16 3v4" {...p} /></svg>);
  if (name === "billing")
    return (<svg {...c}><path d="M8 7h8M8 11h8M14 7c0 4-3 4-6 4l5 6" {...p} /></svg>);
  if (name === "records")
    return (<svg {...c}><path d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4" {...p} /></svg>);
  if (name === "chart")
    return (<svg {...c}><path d="M5 19V5M5 19h14M9 19v-6M13 19v-9M17 19v-4" {...p} /></svg>);
  return null;
}

/* ---------- premium cards ---------- */
function AdminCard({ icon, label, tint, fg, w = 392 }) {
  return (
    <div style={{ width: w, background: "#FFFFFF", borderRadius: 26, padding: "24px 26px", border: `1px solid ${C.hair}`, boxShadow: "0 36px 70px rgba(22,22,22,0.12)", display: "flex", gap: 20, alignItems: "center" }}>
      <div style={{ width: 58, height: 58, borderRadius: 17, background: tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name={icon} color={fg} size={28} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 31, color: C.ink, letterSpacing: "-0.015em" }}>{label}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          <div style={{ height: 9, borderRadius: 9, background: "#ECE8E0", width: "88%" }} />
          <div style={{ height: 9, borderRadius: 9, background: "#F1EDE5", width: "58%" }} />
        </div>
      </div>
    </div>
  );
}

function RecordCard({ tag, value, color, frame, delay }) {
  const { fps } = useVideoConfig();
  const s = smooth(frame, fps, delay);
  const chk = smooth(frame, fps, delay + 6, { damping: 14 });
  return (
    <div style={{ opacity: s, transform: `translateX(${(1 - s) * 46}px)`, filter: `blur(${(1 - s) * 6}px)`, display: "flex", gap: 20, alignItems: "center", background: C.panel, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 22, padding: "22px 26px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
      <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(63,143,91,0.18)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${chk})` }}>
        <Check size={26} color={C.done} />
      </div>
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{tag}</div>
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 31, color: C.paper, marginTop: 4 }}>{value}</div>
      </div>
    </div>
  );
}

function Glow({ frame, color, x, y, size = 900 }) {
  const dx = Math.sin(frame * 0.012) * 50;
  const dy = Math.cos(frame * 0.01) * 40;
  return <div style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: 999, background: color, filter: "blur(150px)", pointerEvents: "none" }} />;
}

/* ---------- Scene 1 — Hook ---------- */
function SceneHook({ total }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = smooth(frame, fps, 12);
  const b = smooth(frame, fps, 36);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, opacity: sceneFade(frame, total) }}>
      <Glow frame={frame} color="rgba(221,232,221,0.6)" x={1050} y={-200} />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 170 }}>
        <div style={{ opacity: smooth(frame, fps, 2) }}><Mark size={58} /></div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 138, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.ink, marginTop: 46, opacity: a, transform: `translateY(${(1 - a) * 44}px)`, filter: `blur(${(1 - a) * 8}px)` }}>
          You became a dentist.
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 138, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.inkSoft, opacity: b, transform: `translateY(${(1 - b) * 44}px)`, filter: `blur(${(1 - b) * 8}px)` }}>
          Not a data&#8209;entry operator.
        </div>
      </AbsoluteFill>
      <Sequence from={14}><Audio src={staticFile("vo1.mp3")} /></Sequence>
    </AbsoluteFill>
  );
}

/* ---------- Scene 2 — Burden then collapse ---------- */
const ADMIN = [
  { icon: "notes", label: "Clinical notes", tint: C.sage, fg: "#2f6b46" },
  { icon: "rx", label: "Prescription", tint: C.peach, fg: "#b25a2a" },
  { icon: "billing", label: "Billing", tint: C.mustard, fg: "#9a7a14" },
  { icon: "calendar", label: "Scheduling", tint: C.dusty, fg: "#2f5bb0" },
  { icon: "records", label: "Patient record", tint: C.sage, fg: "#2f6b46" },
  { icon: "chart", label: "Charting", tint: C.dusty, fg: "#2f5bb0" },
];

function SceneBurden({ total }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const conv = scurve(frame, 238, 292);
  const micIn = smooth(frame, fps, 266);
  const ask = smooth(frame, fps, 286);
  const cap = smooth(frame, fps, 8);

  return (
    <AbsoluteFill style={{ backgroundColor: C.paperAlt, opacity: sceneFade(frame, total) }}>
      <Glow frame={frame} color="rgba(245,213,188,0.45)" x={-200} y={500} />
      <div style={{ position: "absolute", left: 170, top: 300, width: 560, opacity: cap * (1 - conv), transform: `translateY(${(1 - cap) * 24}px)` }}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: C.inkSoft }}>After every patient</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.03em", color: C.ink, marginTop: 18 }}>The paperwork piles up.</div>
      </div>

      <div style={{ position: "absolute", left: 980, top: 150 }}>
        {ADMIN.map((cardData, i) => {
          const inS = smooth(frame, fps, 26 + i * 26);
          const baseX = (i % 2) * 36;
          const baseY = i * 132;
          const x = interpolate(conv, [0, 1], [baseX, 230]);
          const y = interpolate(conv, [0, 1], [baseY, 360]);
          const scale = (0.9 + inS * 0.1) * (1 - conv * 0.95);
          const op = inS * (1 - scurve(frame, 262, 292));
          const rot = (i % 2 ? 1.5 : -1.5) * (1 - conv);
          return (
            <div key={cardData.label} style={{ position: "absolute", transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`, opacity: op, filter: `blur(${(1 - inS) * 10}px)` }}>
              <AdminCard {...cardData} />
            </div>
          );
        })}
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "absolute", opacity: micIn, transform: `scale(${0.6 + micIn * 0.4})` }}>
          <div style={{ position: "absolute", inset: -40, borderRadius: 999, border: `2px solid rgba(22,22,22,0.10)`, transform: `scale(${1 + micIn * 0.4})`, opacity: 1 - micIn * 0.6 }} />
          <div style={{ width: 176, height: 176, borderRadius: 999, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 40px 90px rgba(22,22,22,0.3)" }}>
            <Waveform frame={frame} color={C.paper} bars={7} bw={11} gap={7} maxH={74} />
          </div>
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 140, textAlign: "center", opacity: ask, transform: `translateY(${(1 - ask) * 24}px)` }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 80, letterSpacing: "-0.03em", color: C.ink }}>What if you just said it?</div>
      </div>

      <Sequence from={14}><Audio src={staticFile("vo2.mp3")} /></Sequence>
      <Sequence from={246}><Audio src={staticFile("vo3.mp3")} /></Sequence>
    </AbsoluteFill>
  );
}

/* ---------- Scene 3 — The app ---------- */
const RECORDS = [
  { tag: "Diagnosis", value: "Irreversible pulpitis · 36", color: C.appt, delay: 78 },
  { tag: "Prescription", value: "Ibuprofen 400mg · 3 days", color: C.appt, delay: 110 },
  { tag: "Procedure", value: "RCT started · 36", color: C.appt, delay: 160 },
  { tag: "Next visit", value: "Review · Tuesday", color: C.done, delay: 200 },
];
const SPOKEN = "Root canal thirty-six. Pain reduced. Review Tuesday.";

function SceneApp({ total }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = smooth(frame, fps, 14);
  const head = smooth(frame, fps, 6);
  const voice = smooth(frame, fps, 30);
  const chars = Math.floor(interpolate(frame, [44, 150], [0, SPOKEN.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ backgroundColor: C.charcoal, opacity: sceneFade(frame, total) }}>
      <Glow frame={frame} color="rgba(255,255,255,0.05)" x={420} y={120} size={760} />

      <div style={{ position: "absolute", top: 96, left: 150, right: 150, opacity: head, transform: `translateY(${(1 - head) * 18}px)` }}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(248,247,244,0.5)" }}>Odovox listens</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 66, letterSpacing: "-0.03em", color: C.paper, marginTop: 12 }}>and writes it all.</div>
      </div>

      <div style={{ position: "absolute", left: 220, top: 330, opacity: phone, transform: `translateY(${(1 - phone) * 70}px) scale(${0.96 + phone * 0.04})`, filter: `blur(${(1 - phone) * 8}px)` }}>
        <div style={{ width: 332, padding: 10, borderRadius: 58, background: "#0c0c0b", boxShadow: "0 60px 130px rgba(0,0,0,0.55)" }}>
          <Img src={staticFile("app-home.jpg")} style={{ width: "100%", borderRadius: 48, display: "block" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 700, top: 300, right: 150, display: "flex", alignItems: "center", gap: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: "16px 26px", opacity: voice }}>
        <div style={{ width: 46, height: 46, borderRadius: 999, background: C.paper, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Waveform frame={frame} color={C.ink} bars={6} bw={5} gap={4} maxH={26} />
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 27, color: C.paper }}>
          {SPOKEN.slice(0, chars)}
          <span style={{ opacity: frame % 20 < 10 ? 0.6 : 0 }}>|</span>
        </div>
      </div>

      <div style={{ position: "absolute", left: 700, right: 150, top: 400, display: "flex", flexDirection: "column", gap: 18 }}>
        {RECORDS.map((r) => (
          <RecordCard key={r.tag} {...r} frame={frame} />
        ))}
      </div>

      <div style={{ position: "absolute", left: 700, bottom: 96, fontFamily: SANS, fontWeight: 500, fontSize: 27, color: "rgba(248,247,244,0.6)", opacity: smooth(frame, fps, 250) }}>
        Done before the patient leaves the chair.
      </div>

      <Sequence from={14}><Audio src={staticFile("vo4.mp3")} /></Sequence>
    </AbsoluteFill>
  );
}

/* ---------- Scene 4 — Payoff ---------- */
function ScenePayoff({ total }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = smooth(frame, fps, 6);
  const line = smooth(frame, fps, 28);
  const url = smooth(frame, fps, 52);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "center", opacity: sceneFade(frame, total) }}>
      <Glow frame={frame} color="rgba(220,232,247,0.5)" x={760} y={-150} />
      <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: logo, transform: `scale(${0.92 + logo * 0.08})`, filter: `blur(${(1 - logo) * 6}px)` }}>
        <Mark size={92} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 118, letterSpacing: "-0.03em", color: C.ink }}>Odovox</div>
      </div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 58, letterSpacing: "-0.02em", color: C.inkSoft, marginTop: 30, opacity: line, transform: `translateY(${(1 - line) * 24}px)` }}>
        Dentistry, not data entry.
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 30, color: C.inkFaint, marginTop: 40, opacity: url }}>
        odovox.com
      </div>
      <Sequence from={12}><Audio src={staticFile("vo5.mp3")} /></Sequence>
    </AbsoluteFill>
  );
}

export const OdovoxFilm = () => {
  const S1 = 150, S2 = 350, S3 = 365, S4 = 170;
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <Sequence durationInFrames={S1}><SceneHook total={S1} /></Sequence>
      <Sequence from={138} durationInFrames={S2}><SceneBurden total={S2} /></Sequence>
      <Sequence from={476} durationInFrames={S3}><SceneApp total={S3} /></Sequence>
      <Sequence from={829} durationInFrames={S4}><ScenePayoff total={S4} /></Sequence>
    </AbsoluteFill>
  );
};
