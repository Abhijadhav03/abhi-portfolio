"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/sections/Hero";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { ProjectsSection } from "@/sections/Projects";
import { LogoCloud } from "@/sections/logo-cloud";
import Preloader from "@/components/Preloader";

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
  {
    src: "https://svgl.app/library/vitejs.svg",
    alt: "Vite Logo",
  },
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
        <motion.div
          className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <Header />
          <HeroSection />
          <ProjectsSection />
          <LogoCloud logos={logos} className="lg:mx-20 md:mx-12 sm:mx-12" />
          
          <Footer />
        </motion.div>
      )}
    </>
  );
}