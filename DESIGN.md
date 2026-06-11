# Design

Visual system for the Odovox marketing site. Warm-paper, editorial, operational. The design
IS the product here (brand register). Source-of-truth palette is the brand's given hex;
OKLCH equivalents are noted for in-CSS use. Never `#fff` or `#000`; every neutral is tinted
warm toward the paper hue.

## Theme

Light by default, warm paper. One dramatic exception: **Consult Mode** (Section 5) inverts
to dark charcoal so "the world disappears and only the patient remains." Dark is used once,
on purpose, as narrative punctuation, not as a global theme.

Scene sentence: a dentist in a sunlit clinic at midday, calm, just finished a consultation,
looking at warm paper and natural light, not a glowing screen.

## Color

Strategy: **Full palette.** A warm-paper base (60%) with soft section surfaces that rotate
per section (30%), and meaning-only accents (10%). This is deliberate, not Restrained:
section color is part of the editorial rhythm.

### Base (60%)
| Role | Hex | OKLCH (approx) | Use |
|---|---|---|---|
| Paper (page bg) | `#F8F7F4` | `oklch(0.972 0.004 85)` | Default background |
| Paper-alt | `#F6F2EA` | `oklch(0.962 0.008 80)` | Subtle warm shift |
| Card | `#ECEBE8` | `oklch(0.937 0.004 85)` | Raised surfaces, tiles |
| Ink (text) | `#161616` | `oklch(0.205 0.002 0)` | Primary text (near-black, tinted) |
| Ink-soft | `#5B5954` | `oklch(0.46 0.006 80)` | Secondary text, captions |
| Hairline | `#DDD9D2` | `oklch(0.885 0.006 85)` | 1px borders, rules |

### Section surfaces (30%, rotate per section)
| Name | Hex | Section |
|---|---|---|
| Sage | `#DDE8DD` | Voice-first clinic |
| Warm Peach | `#F5D5BC` | Reception flow |
| Soft Mustard | `#F3E6A8` | Billing & payments |
| Dusty Blue | `#DCE8F7` | Smart appointments |
| Warm Grey | `#ECE8E2` | The real problem |
| Charcoal | `#1A1A19` | Consult mode (dark) |

### Accent (10%, meaning only)
| Color | Hex | Meaning |
|---|---|---|
| Blue | `#3B6FD4` | Appointments |
| Green | `#3F8F5B` | Completed |
| Amber | `#D8943A` | Waiting |
| Red | `#C0492F` | Urgent |

Accents are reserved for status semantics (queue, billing, recalls). Never decorative.

## Typography

Two families, both on Google Fonts, loaded via `next/font`. Neither is on the reflex-reject
list. Editorial warmth without the display-serif cliché.

- **Display / headlines: Bricolage Grotesque.** Warm, slightly irregular grotesque. Carries
  the big emotional headlines ("You became a dentist."). Weights 600–800, tight tracking,
  `clamp()` fluid scale.
- **Body / UI / labels: Hanken Grotesk.** Humanist, calm, highly legible small. Weights
  400/500/600. Tabular numerals for the consult timeline (00:00 → 00:45) and billing.

Alternate direction on the table (pending confirmation): swap display to a warm serif
(**Spectral**) for a softer print/paper feel. Default is Bricolage Grotesque.

Scale: modular, ratio ≥ 1.25 between steps. Hero display up to ~`clamp(2.75rem, 7vw, 6.5rem)`.
Body measure capped 65–75ch. Headlines left-aligned, asymmetric; no centered icon-title stacks.

## Layout

- Asymmetric, left-aligned, editorial. Generous whitespace; vary spacing for rhythm (tight
  groupings inside generous separations). Fluid `clamp()` spacing.
- Split layouts (headline left / interactive visual right) for the hero and several sections.
- Avoid card-grid monotony. Use cards only when they are the right affordance (reception
  queue, quick-tools). No nested cards. No side-stripe borders.
- Full-bleed section color bands create the per-section "visual world."

## Elevation

Mostly flat on paper. Raised surfaces use soft, low, warm shadows
(`0 1px 2px rgba(22,22,22,.04), 0 8px 24px rgba(22,22,22,.06)`), never hard drop shadows.
The dark consult card and consult mode use subtle inner glow / light, not neon.

## Motion

Engine: **GSAP + ScrollTrigger + Lenis** smooth scroll. Philosophy: engineered, calm,
deliberate, physical. No bounce, no elastic, no float. Ease-out exponential (expo/quart).

Signature moments (scroll-scrubbed, pinned):
- **Hero**: typing/clicking workflow plays, then freezes; a microphone appears; on speak,
  every field fills itself. "Stop typing."
- **The real problem**: each action duplicates (typing, typing, typing), then all duplicates
  collapse into one microphone, one voice command. Satisfying collapse.
- **45-second consultation**: scrubbed timeline 00:00→00:45; diagnosis, prescription,
  procedure, follow-up, billing appear in real time as the doctor speaks.
- **Patient timeline / multi-visit**: the timeline draws itself as you scroll.
- **Reception queue**: cards flow smoothly between Waiting → In consultation → Billing → Done.

Reduced motion: all scrubbed sequences resolve to a clear final static state; reveals become
instant. The story survives without motion.

## Components

- **Voice waveform**: recurring motif; builds records as it animates. Calm amplitude, not a
  jittery EQ.
- **App device frame**: real Odovox screenshots/video inside a clean phone frame (assets in
  `public_asssets/`). Not generic mockups.
- **Status pill**: small, semantic-accent colored (appointments/completed/waiting/urgent).
- **Queue card**: large, readable from a distance (reception).
- **Timeline node**: connected diagnosis → x-ray → procedure → prescription → payment → recall.
- **Section kicker**: used sparingly, not above every heading (avoid AI scaffolding grammar).

## Assets (real, in `public_asssets/`)

- `image.png_202606111222.jpeg` — Odovox app home screen (real UI).
- `iPhone_screen_showing_voice_auto….mp4` — voice auto-fill screen recording (10s).
- `stree_scene_1.mp4` — clinic scene video (30s) for the product-film section.

## Bans (project-specific, on top of impeccable's)

Pure white/black; blue-button SaaS look; dashboard-screenshot grids; identical feature-card
grids; gradient text; glassmorphism-by-default; em dashes in copy; fake stats/reviews/counts;
bouncy or floating startup motion.
