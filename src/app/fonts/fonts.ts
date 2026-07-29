import { Instrument_Serif, Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  preload: false,
  fallback: ["serif"],
  variable: "--font-instrument-serif",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-inter",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  preload: false,
  fallback: ["monospace"],
  variable: "--font-roboto-mono",
});

export const satoshi = localFont({
  src: "./satoshi-variable.woff2",
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-satoshi",
});
