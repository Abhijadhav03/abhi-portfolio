
// src/app/page.tsx
import { HeroSection } from '@/sections/Hero';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { ProjectsSection } from '@/sections/Projects';
import {LogoCloud} from '@/sections/logo-cloud'

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
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_dark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_dark.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-dark.svg",
    alt: "Clerk Logo",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800">
      <Header />
      <HeroSection />
    
      <ProjectsSection />
        <LogoCloud logos={logos} className=" lg:mx-20 md:mx-12 sm:mx-12" />
      <Footer />
    </div>
  );
}