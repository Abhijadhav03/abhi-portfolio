"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: React.ReactNode;
  /** Pixels per second */
  speed?: number;
  /** Pixels per second on hover */
  speedOnHover?: number;
  /** Gap in pixels between repeated items */
  gap?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  className?: string;
}

const SLIDER_CSS = `
@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-1 * var(--slider-width, 50%))); }
}
`;

export function InfiniteSlider({
  children,
  speed = 30,
  speedOnHover,
  gap = 40,
  direction = "left",
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeSpeed =
    isHovered && speedOnHover !== undefined ? speedOnHover : speed;

  // Measure the width of one set of children
  const measure = useCallback(() => {
    if (innerRef.current) {
      const firstSet = innerRef.current.children[0] as HTMLElement | undefined;
      if (firstSet) {
        setContentWidth(firstSet.offsetWidth + gap);
      }
    }
  }, [gap]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Calculate animation duration from speed and width
  const duration = contentWidth > 0 ? contentWidth / activeSpeed : 0;

  const trackStyle: React.CSSProperties = useMemo(() => {
    if (contentWidth === 0) return { display: "flex", width: "max-content" };
    return {
      display: "flex",
      width: "max-content",
      animation: `infinite-scroll ${duration}s linear infinite ${
        direction === "left" ? "normal" : "reverse"
      }`,
      ["--slider-width" as string]: `${contentWidth}px`,
    };
  }, [contentWidth, duration, direction]);

  const itemsStyle: React.CSSProperties = {
    display: "flex",
    flexShrink: 0,
    gap,
  };

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style dangerouslySetInnerHTML={{ __html: SLIDER_CSS }} />
      <div ref={innerRef} style={trackStyle}>
        {/* Original items */}
        <div style={itemsStyle}>{children}</div>
        {/* Duplicated items for seamless loop */}
        <div style={{ ...itemsStyle, marginLeft: gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
