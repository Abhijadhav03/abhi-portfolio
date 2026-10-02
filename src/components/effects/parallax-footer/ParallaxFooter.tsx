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
  const [clipPathValue, setClipPathValue] = useState<string>("inset(0px 0px 0px 0px round 2.5rem 2.5rem 0px 0px)");

  useEffect(() => {
    if (typeof window !== "undefined" && window.CSS && CSS.supports) {
      if (CSS.supports("clip-path", "inset(0px 0px 0px 0px round 2.5rem 2.5rem 0px 0px)")) {
        setClipPathValue("inset(0px 0px 0px 0px round 2.5rem 2.5rem 0px 0px)");
      } else {
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
      className={`w-full relative z-0 rounded-t-[2.5rem] md:rounded-t-[3rem] overflow-hidden ${outerClassName}`}
      style={{
        height: height > 1 ? height : undefined,
        clipPath: clipPathValue,
        WebkitClipPath: clipPathValue,
      }}
    >
      <footer
        ref={footerRef}
        className={`w-full fixed bottom-0 left-0 rounded-t-[2.5rem] md:rounded-t-[3rem] overflow-hidden ${footerClassName}`}
        style={footerStyle}
      >
        {children}
      </footer>
    </div>
  );
};

export default ParallaxFooter;
