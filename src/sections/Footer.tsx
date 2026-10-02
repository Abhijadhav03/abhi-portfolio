"use client";

import { Signature } from "@/components/signature";
import { SpotifyCard } from "@/components/spotify-card";
import { ParallaxFooter } from "@/components/effects/parallax-footer";
import grainimage from "@/assets/images/grain.jpg";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ParallaxFooter
      id="footer"
      footerClassName="w-full text-white border-t border-emerald-500/20 shadow-[0_-25px_60px_rgba(0,0,0,0.7)] rounded-t-[2.5rem] md:rounded-t-[3rem] overflow-hidden"
      footerStyle={{ backgroundColor: "#111714" }}
    >
      <div
        className="relative w-full min-h-[70vh] md:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 pt-12 pb-2 md:pt-16 md:pb-3 text-white rounded-t-[2.5rem] md:rounded-t-[3rem]"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 100%, #1c5936 0%, #0e3520 40%, #0b2518 75%, #111714 100%)",
        }}
      >
        {/* Grain overlay 1: Analog film grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay bg-repeat"
          style={{
            backgroundImage: `url(${grainimage.src})`,
            backgroundSize: "220px 220px",
          }}
        />

        {/* Grain overlay 2: High-density tactile noise */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient bottom glow */}
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-0"
        />

        {/* Top/Main Content Area - Centered & Refined Font Size */}
        <div className="relative z-10 my-auto max-w-3xl mx-auto flex flex-col items-center text-center py-6 md:py-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-instrument-serif text-[#f4efe6] tracking-tight leading-relaxed max-w-xl mx-auto">
            if you&apos;ve made it this far, we&apos;re either meant to work together, or you&apos;re just really into footers!
          </h2>

          <div className="mt-7 md:mt-9 flex items-center justify-center">
            <a
              href="mailto:jadhavabhishek53366@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#f4efe6] text-[#092215] font-medium text-sm sm:text-base hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-emerald-950/40 group cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Spotify card, Signature & Links */}
        <div className="relative z-10 pt-10 mt-8 border-t border-emerald-400/15 text-sm">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 md:grid md:grid-cols-3 md:items-center md:gap-6">
            {/* Left: On repeat */}
            <div className="col-start-1 row-start-1 flex w-full max-w-[320px] flex-col items-start gap-3 md:col-auto md:row-auto md:w-auto md:max-w-none md:justify-self-start">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/60">
                Last Played
              </h3>
              <div className="w-full max-w-[320px]">
                <SpotifyCard />
              </div>
            </div>

            {/* Center: Signature */}
            <div className="col-start-1 row-start-2 flex items-center justify-start md:col-auto md:row-auto md:w-auto md:justify-self-center md:justify-center">
              <Signature
                className="inline-block align-middle"
                fontSize={20}
                color="#eef2ec"
                text="Abhishek"
                inView={true}
              />
            </div>

            {/* Right: Social & Back-to-top */}
            <div className="col-start-2 row-start-1 row-span-2 flex flex-col items-end justify-center gap-y-2 text-xs text-emerald-100/75 md:col-auto md:row-auto md:flex-row md:items-center md:justify-self-end md:gap-x-6 md:text-sm">
              <a
                href="https://www.linkedin.com/in/abhijadhav03"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Abhijadhav03"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="/resume"
                className="hover:text-white transition-colors"
              >
                Resume
              </a>
              <button
                onClick={scrollToTop}
                className="hover:text-white transition-colors flex items-center gap-1 group cursor-pointer ml-0 md:ml-2"
                aria-label="Scroll to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom Copyright Line */}
          <div className="mt-4 pt-4 flex items-center justify-center text-center text-xs text-emerald-100/50">
            <span>
              &copy; {new Date().getFullYear()} Abhishek Jadhav&nbsp;&nbsp;●&nbsp;&nbsp;Created with lots of Procrastination 🥲 &amp; Inspiration ☕️
            </span>
          </div>
        </div>
      </div>
    </ParallaxFooter>
  );
};