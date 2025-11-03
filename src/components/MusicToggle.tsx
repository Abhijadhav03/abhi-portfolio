"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("musicPlaying") === "true";
    }
    return false;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bars = 5;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

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

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
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
      <motion.button
        onClick={toggleMusic}
        initial={{ padding: "14px 14px" }}
        whileHover={{ padding: "18px 22px" }}
        whileTap={{ padding: "18px 22px" }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className={`cursor-pointer rounded-full backdrop-blur-md border transition-all duration-300 shadow-md ${
          isPlaying
            ? "bg-lime-400/20 border-lime-400/40 hover:bg-lime-400/30"
            : "bg-white/10 border-white/20 hover:bg-white/20"
        }`}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="flex h-[18px] w-full items-center gap-1 rounded-full"
        >
          {heights.map((height, index) => (
            <motion.div
              key={index}
              className={`w-[1px] rounded-full ${
                isPlaying ? "bg-lime-400" : "bg-white"
              }`}
              initial={{ height: 1 }}
              animate={{
                height: Math.max(4, height * 14),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            />
          ))}
        </motion.div>
      </motion.button>
    </div>
  );
}










// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Music, Pause } from "lucide-react";

// export default function MusicToggle() {
//   const [isPlaying, setIsPlaying] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("musicPlaying") === "true";
//     }
//     return false;
//   });
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     audioRef.current = new Audio("/audio/background-music.mp3");
//     audioRef.current.loop = true;
//     audioRef.current.volume = 1.0;

//     const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (isReducedMotion) setIsPlaying(false);

//     if (isPlaying && !isReducedMotion) {
//       audioRef.current
//         .play()
//         .catch((error) => console.error("Audio playback failed:", error));
//     }

//     localStorage.setItem("musicPlaying", isPlaying.toString());

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, [isPlaying]);

//   const toggleMusic = () => {
//     setIsPlaying((prev) => {
//       if (audioRef.current) {
//         if (!prev) {
//           audioRef.current.play().catch((error) => console.error(error));
//         } else {
//           audioRef.current.pause();
//         }
//       }
//       return !prev;
//     });
//   };

//   return (
//     <div className="fixed bottom-5 left-5 z-[2147483648]">
//       <button
//         onClick={toggleMusic}
//         className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 shadow-md ${
//           isPlaying
//             ? "bg-lime-400/20 border-lime-400/40 hover:bg-lime-400/30"
//             : "bg-white/10 border-white/20 hover:bg-white/20"
//         }`}
//         aria-label={isPlaying ? "Pause background music" : "Play background music"}
//       >
//         {isPlaying ? (
//           <Pause className="w-5 h-5 text-lime-400" />
//         ) : (
//           <Music className="w-5 h-5 text-white" />
//         )}
//       </button>
//     </div>
//   );
// }
