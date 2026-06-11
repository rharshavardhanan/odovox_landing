import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://odovox.com"),
  title: "Odovox — Dentistry, not data entry.",
  description:
    "Odovox is a voice-first dental operating system that does your clinical admin. Speak naturally during a consultation and the records write themselves: diagnosis, prescription, procedure, follow-up, billing.",
  openGraph: {
    title: "Odovox — Dentistry, not data entry.",
    description:
      "The voice-first dental OS that does your clinical admin. Complete records before the patient leaves the chair.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
