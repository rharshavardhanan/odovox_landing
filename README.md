# Odovox — marketing site

A voice-first dental operating system. Marketing site built with Next.js (App
Router), Tailwind v4, GSAP + Lenis for scroll motion, and React Three Fiber for
the 3D convergence scene.

## Workspace layout

```
odovox_landing/
├─ app/                      # Next.js App Router (the main landing page)
├─ components/
│  ├─ sections/              # one component per page section
│  ├─ primitives/            # Reveal, PhoneFrame, BrandFilm, CTAButton, …
│  └─ providers/             # SmoothScroll (Lenis ↔ GSAP bridge)
├─ lib/                      # gsap setup, site constants
├─ public/media/             # app screenshots, posters, and the three videos
├─ my-video/                 # Remotion project that renders the brand film
├─ dentai-landing/           # git submodule — the "Field Study" zone (served at /study)
├─ tools/shot.mjs            # dev-only screenshot helper (puppeteer-core)
├─ PRODUCT.md / DESIGN.md    # brand + visual system (see also docs/superpowers)
└─ public_asssets/           # original source assets (not shipped)
```

## Run locally

The site and the Field Study are two Next.js apps (a multi-zone setup). Run both:

```bash
# 1. main site  → http://localhost:3001
npm install
PORT=3001 npm run dev

# 2. field study zone → proxied at http://localhost:3001/study
cd dentai-landing
npm install
PORT=3002 npm run dev
```

`/study`, `/study/clinics`, `/study/workflow`, `/study/pilot` are proxied to the
dentai-landing app via `rewrites()` in `next.config.mjs`.

### Submodule

`dentai-landing` is its own repository
(`github.com/jayavarsan-r/denist-landing`). After cloning:

```bash
git submodule update --init --recursive
```

## The brand film (Remotion)

The film lives in `my-video/` and renders to `public/media/odovox-film.mp4`.

```bash
cd my-video
npm install
npx remotion studio                      # preview/edit
npx remotion render OdovoxFilm out/odovox-film.mp4 --port=7782
cp out/odovox-film.mp4 ../public/media/   # then refresh a poster if needed
```

Voiceover clips are `my-video/public/vo1.mp3 … vo5.mp3`. Replace them with a real
voice (or add a `music.mp3` track) and re-render to upgrade the audio.

## Deploy

- **Main site**: deploy this app (Vercel or any Node host).
- **Field study**: deploy `dentai-landing` separately, then set `DENTAI_URL`
  on the main site to its URL. The `/study` rewrites will proxy to it.
