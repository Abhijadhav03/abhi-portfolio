"use client";
import { useState, useEffect, useRef } from "react";
import { Music, Pause } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("musicPlaying") === "true";
    }
    return false;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/background-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 1.0;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) setIsPlaying(false);

    if (isPlaying && !isReducedMotion) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    }

    localStorage.setItem("musicPlaying", isPlaying.toString());

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying((prev) => {
      if (audioRef.current) {
        if (!prev) {
          audioRef.current.play().catch((error) => console.error(error));
        } else {
          audioRef.current.pause();
        }
      }
      return !prev;
    });
  };

  return (
    <div className="fixed bottom-5 left-5 z-[2147483648]">
      <button
        onClick={toggleMusic}
        className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 shadow-md ${
          isPlaying
            ? "bg-lime-400/20 border-lime-400/40 hover:bg-lime-400/30"
            : "bg-white/10 border-white/20 hover:bg-white/20"
        }`}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-lime-400" />
        ) : (
          <Music className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
