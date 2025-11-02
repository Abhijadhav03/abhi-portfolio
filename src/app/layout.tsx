// src/app/layout.tsx
import type { Metadata } from "next";
import { Calistoga, Instrument_Serif, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import MusicToggle from "@/components/MusicToggle";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: "400" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  icons: "/logo.png",
  description: "abhi's portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Oneko script – runs once */}
        <script src="/oneko/oneko.js" defer></script>
      </head>
 
      <body
        className={twMerge(
          inter.variable,
          instrumentSerif.variable,
          calistoga.variable,
          "bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 text-white antialiased font-sans min-h-screen"
        )}
      >
    
        {children}
      
        {/* Only MusicToggle remains */}
        <div className="fixed bottom-6 right-6 z-[9999]">
          <MusicToggle />
        </div>
      </body>
      
    </html>
  );
}