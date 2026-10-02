"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const Header = dynamic(() => import("@/sections/Header").then((m) => m.Header));
const HeroSection = dynamic(() => import("@/sections/Hero").then((m) => m.HeroSection));
const ProjectsSection = dynamic(() => import("@/sections/Projects").then((m) => m.ProjectsSection));
const LogoCloud = dynamic(() => import("@/sections/logo-cloud").then((m) => m.LogoCloud));
const GitHubActivitySection = dynamic(() => import("@/sections/GitHubActivitySection").then((m) => m.GitHubActivitySection));
const Footer = dynamic(() => import("@/sections/Footer").then((m) => m.Footer));

const logos = [
  {
    src: "https://svgl.app/library/jwt.svg",
    alt: "jwt Logo",
  },
  {
    src: "https://svgl.app/library/nextjs_icon_dark.svg",
    alt: "nextjs Logo",
  },
  {
    src: "https://svgl.app/library/react_dark.svg",
    alt: "Reactjs Logo",
  },
  // {
  //   src: "https://svgl.app/library/vitejs.svg",
  //   alt: "Vite Logo",
  // },
  {
    src: "https://svgl.app/library/typescript.svg",
    alt: "TypeScript Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_dark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/redux.svg",
    alt: "Redux Logo",
  },
  {
    src: "https://svgl.app/library/javascript.svg",
    alt: "JavaScript Logo",
  },
  {
    src: "https://svgl.app/library/tailwindcss.svg",
    alt: "Tailwindcss Logo",
  },
  {
    src: "https://svgl.app/library/expressjs_dark.svg",
    alt: "Express.js Logo",
  },
  {
    src: "https://svgl.app/library/mongodb-icon-dark.svg",
    alt: "MongoDB Logo",
  },
  {
    src: "https://svgl.app/library/nodejs.svg",
    alt: "Node.js Logo",
  },
  {
    src: "https://svgl.app/library/vscode.svg",
    alt: "VSCode Logo",
  },
  {
    src: "https://svgl.app/library/daisyui.svg",
    alt: "DaisyUI Logo",
  },
  {
    src: "https://svgl.app/library/postman.svg",
    alt: "Postman Logo",
  },
  {
    src: "https://svgl.app/library/npm.svg",
    alt: "NPM Logo",
  },
  {
    src: "https://svgl.app/library/git.svg",
    alt: "Git Logo",
  },
];

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleReplay = useCallback(() => {
    setShowPreloader(true);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {!showPreloader && (
        <div className="relative min-h-screen">
          <motion.div
            className="relative z-10 min-h-screen overflow-x-clip text-white rounded-b-[2.5rem] md:rounded-b-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.85)] bg-[#111714]"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            {/* Seamless, continuous Canopy gradient canvas across Hero and Projects - zero lines, zero edges */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              {/* Primary top glow (Hero & Nav) */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[900px]"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 55% at 50% 0%, rgba(79, 209, 150, 0.28) 0%, rgba(61, 158, 110, 0.16) 35%, rgba(10, 46, 26, 0.06) 65%, transparent 85%)",
                }}
              />

              {/* Ambient depth behind project cards */}
              <div
                className="absolute top-[1600px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1200px]"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 65% at 50% 40%, rgba(79, 209, 150, 0.14) 0%, rgba(61, 158, 110, 0.08) 45%, rgba(10, 46, 26, 0.02) 75%, transparent 90%)",
                }}
              />
            </div>

            <Header />
            <HeroSection />

            {/* High-Fidelity Symmetrical Bell-Curve Gradient Transition Bridge */}
            <div
              className="relative w-full h-72 sm:h-80 md:h-[26rem] -my-36 sm:-my-40 md:-my-52 pointer-events-none z-0 flex items-center justify-center overflow-visible"
              aria-hidden="true"
            >
              {/* Layer 1: Symmetrical Bell-Curve Linear Fade (Low -> Peak -> Low) */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(61, 158, 110, 0) 0%,
                    rgba(61, 158, 110, 0.02) 12%,
                    rgba(61, 158, 110, 0.08) 26%,
                    rgba(79, 209, 150, 0.16) 38%,
                    rgba(79, 209, 150, 0.24) 50%,
                    rgba(79, 209, 150, 0.16) 62%,
                    rgba(61, 158, 110, 0.08) 74%,
                    rgba(61, 158, 110, 0.02) 88%,
                    rgba(61, 158, 110, 0) 100%
                  )`,
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 100% at 50% 50%, #000 25%, transparent 95%)",
                  maskImage:
                    "radial-gradient(ellipse 75% 100% at 50% 50%, #000 25%, transparent 95%)",
                }}
              />

              {/* Layer 2: Core Luminous Elliptical Bloom centered at the transition */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full"
                style={{
                  background: `radial-gradient(
                    ellipse 70% 60% at 50% 50%,
                    rgba(79, 209, 150, 0.20) 0%,
                    rgba(61, 158, 110, 0.12) 30%,
                    rgba(20, 65, 38, 0.05) 55%,
                    transparent 80%
                  )`,
                }}
              />
            </div>

            <ProjectsSection />
            <div className="flex justify-center w-full px-4 my-6">
              <div
                className="dot-div-band w-full max-w-4xl"
                style={{
                  height: "3.5rem",
                  backgroundImage: "radial-gradient(var(--dot-color) 0.75px, transparent 0.75px)",
                  backgroundSize: "7px 7px",
                  backgroundPosition: "center top",
                  WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                  maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                }}
              />
            </div>
            <LogoCloud logos={logos} className="lg:mx-40 md:mx-12 sm:mx-12" />
            <div className="flex justify-center w-full px-4 my-4">
              <div
                className="dot-div-band w-full max-w-4xl"
                style={{
                  height: "3.5rem",
                  backgroundImage: "radial-gradient(var(--dot-color) 0.75px, transparent 0.75px)",
                  backgroundSize: "7px 7px",
                  backgroundPosition: "center top",
                  WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                  maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                }}
              />
            </div>
            <GitHubActivitySection />
          </motion.div>
          <Footer />
        </div>
      )}
    </>
  );
}