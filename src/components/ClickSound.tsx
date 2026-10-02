"use client";

import { useEffect, useRef } from "react";

/**
 * Plays /audio/Click.mp3 whenever the user clicks an interactive element
 * (nav bar links, buttons, and any other <a> links).
 * Mounted globally in the root layout, next to ClickEffects.
 */
export default function ClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/Click.mp3");
    audio.preload = "auto";
    audio.volume = 0.3;
    audioRef.current = audio;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Only play for buttons / links (includes nav bar & footer links)
      if (!target?.closest?.("a, button")) return;
      // Restart from the beginning so quick successive clicks stay snappy
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Browser may block playback before the first user gesture; ignore
      });
    };

    // Capture phase so the sound plays even if a handler stops propagation
    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
