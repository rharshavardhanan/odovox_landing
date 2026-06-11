// Dev-only screenshot helper. Drives the locally-installed Chrome via
// puppeteer-core (no browser download). Not part of the shipped site.
//
// Usage:
//   node tools/shot.mjs --url=http://localhost:3001/ --out=/tmp/a.png \
//     [--width=1440] [--height=1000] [--dpr=2] [--wait=1200] \
//     [--full] [--reduced] [--selector="#consult-45"]
import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const {
  url = "http://localhost:3001/",
  out = "/tmp/shot.png",
  width = "1440",
  height = "1000",
  dpr = "2",
  wait = "1200",
  full = false,
  reduced = false,
  selector,
} = args;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--enable-webgl",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--ignore-gpu-blocklist",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
  ],
  defaultViewport: {
    width: +width,
    height: +height,
    deviceScaleFactor: +dpr,
  },
});

const page = await browser.newPage();
await page.bringToFront();
if (reduced) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
try {
  await page.evaluate(() => document.fonts && document.fonts.ready);
} catch {}
if (args.scrollto !== undefined) {
  await page.evaluate((y) => {
    const w = window;
    if (w.__lenis && w.__lenis.scrollTo) w.__lenis.scrollTo(y, { immediate: true });
    else w.scrollTo(0, y);
  }, +args.scrollto);
  await new Promise((r) => setTimeout(r, 350));
}
if (selector) {
  await page.$eval(selector, (el) =>
    el.scrollIntoView({ block: "center" }),
  );
}
await new Promise((r) => setTimeout(r, +wait));

if (selector) {
  const el = await page.$(selector);
  if (!el) throw new Error(`selector not found: ${selector}`);
  await el.screenshot({ path: out });
} else {
  await page.screenshot({
    path: out,
    fullPage: full === true || full === "true",
  });
}

await browser.close();
console.log("shot:", out);
