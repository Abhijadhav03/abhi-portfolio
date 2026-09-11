import React from "react";
import { cn } from "@/lib/utils";

interface NeonGlowProps {
  side?: "left" | "right";
  position?: "top" | "bottom" | "center";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const NeonGlow = ({
  side = "left",
  position = "center",
  className,
  size = "md",
}: NeonGlowProps) => {
  const sizeClasses = {
    sm: "w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] blur-[80px]",
    md: "w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] blur-[100px] md:blur-[140px]",
    lg: "w-[450px] h-[450px] sm:w-[620px] sm:h-[620px] lg:w-[800px] lg:h-[800px] blur-[110px] md:blur-[160px]",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 select-none overflow-visible",
        side === "left"
          ? "-left-40 sm:-left-56 md:-left-72 lg:-left-80"
          : "-right-40 sm:-right-56 md:-right-72 lg:-right-80",
        position === "top" && "-top-24 sm:-top-36 md:-top-48",
        position === "bottom" && "-bottom-24 sm:-bottom-36 md:-bottom-48",
        position === "center" && "top-1/2 -translate-y-1/2",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full opacity-70 transition-opacity duration-700",
          "bg-[radial-gradient(circle_at_center,rgba(194,248,79,0.22)_0%,rgba(163,230,53,0.12)_35%,rgba(74,222,128,0.04)_55%,transparent_70%)]",
          sizeClasses[size],
        )}
      />
    </div>
  );
};
