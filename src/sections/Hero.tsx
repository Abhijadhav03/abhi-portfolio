"use client";

import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import handwave from "@/assets/images/hand_wave.png";
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import memojiImage from "@/assets/images/memoji-computer.png";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import grainimage from "@/assets/images/grain.jpg";
import { TextAnimate } from "@/components/ui/text-animate";
import { Highlighter } from "@/components/ui/highlighter"
export const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col justify-center items-center text-center py-32 text-white overflow-hidden z-0 after:pointer-events-none">
      <div className="absolute inset-0 [mask-image:radial-gradient(closest-side,transparent,black)] z-0 pointer-events-none"></div>
      <div
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${grainimage.src})` }}
      ></div>

      <div className="container flex flex-col items-center gap-8 max-w-3xl mx-auto">
        {/* Profile Image & Availability Badge */}
        <div className="flex flex-col items-center">
          {/* Uncomment if you want to show memoji */}
          {/* <Image
            src={memojiImage}
            alt="Memoji at Computer"
            className="w-20 h-20 md:w-40 md:h-40 drop-shadow-xl"
            priority
          /> */}
          <Status
            className="gap-3 rounded-full px-4 py-1 text-sm bg-lime-400/5 border border-white/20 text-white/80 backdrop-blur-md"
            status="online"
            variant="outline"
          >
            <StatusIndicator />
            <span>Available for opportunities</span>
          </Status>
        </div>

        {/* Headline */}
      <h1 className="text-center leading-tight">
  <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2">
    <TextAnimate
      animation="blurInUp"
      by="character"
      className="inline-block text-3xl sm:text-4xl md:text-5xl font-instrument-serif tracking-tight text-white"
    >
      Hey there, I&apos;m Abhishek
      <Image
      src={handwave}
      alt="Hand Wave"
      className="inline-block w-6 h-6 sm:w-8 sm:h-8 animate-wave-smooth origin-bottom-right"
    />
    </TextAnimate>
  </div>
</h1>


        {/* Subtext */}
        <p className="text-white/70 max-w-xl text-base sm-text-l md:text-lg">
          <Highlighter action="underline" color="#FF9800">A Frontend Engineer
            </Highlighter> and coffee enthusiast 🍵. I build modern web
          experiences that feel natural, fast, and delightful.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
        <a
  href="#projects"
  className="flex items-center gap-2 bg-white hover:bg-lime-600 text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
>
  <span>Explore My Work</span>
  <ArrowDown className="w-4 h-4" />
</a>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-lime-400/10 text-white border border-white/20 hover:bg-lime-600/10 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
          >
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>📄</span>
              <span>Resume / CV</span>
            </a>
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
};