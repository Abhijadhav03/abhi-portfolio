// src/app/layout.tsx
import type { Metadata } from "next";
import { Calistoga, Instrument_Serif, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const MusicToggle = dynamic(() => import("@/components/MusicToggle"), { ssr: false });
const OnekoCat = dynamic(() => import("@/components/onekocat"), { ssr: false });
const ClickEffects = dynamic(() => import("@/components/ClickEffects"), { ssr: false });
const ClickSound = dynamic(() => import("@/components/ClickSound"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: "400" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Abhi's Portfolio",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description: "Abhi's portfolio website",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* No oneko.js script here; loaded client-side by OnekoCat */}
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
      </head>
      <body
        className={twMerge(
          inter.variable,
          instrumentSerif.variable,
          calistoga.variable,
          "bg-[#111714] text-white antialiased font-sans min-h-screen selection:bg-[#3d9e6e]/30 selection:text-[#86cea8]"
        )}
      >
        <SmoothScroll />
        {children}
        <OnekoCat />
        <ClickEffects />
        <ClickSound />
        <div className="fixed bottom-6 right-6 z-[10000]">
          <MusicToggle />
        </div>
        <Analytics />
      </body>
    </html>
  );
}