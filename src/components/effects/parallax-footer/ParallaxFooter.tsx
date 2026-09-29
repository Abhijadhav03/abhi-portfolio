"use client";

import React, { useRef, useState, useEffect } from "react";

export interface ParallaxFooterProps {
  children?: React.ReactNode;
  id?: string;
  outerClassName?: string;
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
}

export const ParallaxFooter: React.FC<ParallaxFooterProps> = ({
  children,
  id = "footer",
  outerClassName = "",
  footerClassName = "",
  footerStyle,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<number>(1);
  const [clipPathValue, setClipPathValue] = useState<string>("rect(0px, 100%, 100%, 0px)");

  useEffect(() => {
    // Check if rect() syntax is supported, fallback to inset() if needed
    if (typeof window !== "undefined" && window.CSS && CSS.supports) {
      if (!CSS.supports("clip-path", "rect(0px, 100%, 100%, 0px)")) {
        setClipPathValue("inset(0px 0px 0px 0px)");
      }
    }
  }, []);

  useEffect(() => {
    let animId: number;
    const updateHeight = () => {
      const el = footerRef.current;
      if (el) {
        animId = requestAnimationFrame(() => {
          setHeight(el.getBoundingClientRect().height);
        });
      }
    };

    updateHeight();
    const el = footerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [children]);

  return (
    <div
      id={id}
      className={`w-full relative z-0 ${outerClassName}`}
      style={{
        height: height > 1 ? height : undefined,
        clipPath: clipPathValue,
        WebkitClipPath: clipPathValue,
      }}
    >
      <footer
        ref={footerRef}
        className={`w-full fixed bottom-0 left-0 ${footerClassName}`}
        style={footerStyle}
      >
        {children}
      </footer>
    </div>
  );
};

export default ParallaxFooter;
