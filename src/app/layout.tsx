import type { Metadata } from "next";
import { Calistoga, Instrument_Serif, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import OnekoCat from "@/components/onekocat";
import "./globals.css";
import CatToggle from "@/components/CatToggle";
import MusicToggle from "@/components/MusicToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: "400" });

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400",],
  variable: "--font-instrument-serif",
});
export const metadata: Metadata = {
  title: "My Portfolio",
  icons: "/logo.png",
  description: "abhi's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(inter.variable, instrumentSerif.variable, calistoga.variable, "bg-emerald-900 light:bg-white text-white antialiased font-sans")}>
        {children}
        {/* <CatToggle /> */}
       <MusicToggle />
        <OnekoCat />
      </body>
    </html>
  );
}
