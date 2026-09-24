"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface SmoothScrollProps {
  /**
   * Lerp damping factor (between 0.01 and 0.2).
   * Lower values make the scroll feel heavier/floatier; higher values make it snappier.
   * 0.085 is the golden sweet-spot for "smooth as butter" momentum feel.
   */
  lerp?: number;
  /**
   * Multiplier applied to mouse wheel scrolling.
   * Default: 1
   */
  wheelMultiplier?: number;
}

export default function SmoothScroll({
  lerp = 0.085,
  wheelMultiplier = 1,
}: SmoothScrollProps) {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return;

    // Disable CSS smooth scroll to prevent conflicts with GSAP ticker interpolation
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;

    const getMaxScroll = () => {
      return Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const tick = () => {
      // Interpolate current scroll towards target with buttery ease
      currentY += (targetY - currentY) * lerp;

      window.scrollTo(0, Math.round(currentY * 100) / 100);

      // Stop the ticker once close enough to save CPU/battery
      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        gsap.ticker.remove(tick);
        isRunning = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Allow native behavior inside elements with their own scrolling or inputs
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "textarea, input, select, [data-no-smooth-scroll], [data-lenis-prevent]"
        )
      ) {
        return;
      }

      // Check if inside a nested scrollable element that hasn't reached its scroll boundary
      let el: HTMLElement | null = target;
      while (el && el !== document.body && el !== document.documentElement) {
        const overflowY = window.getComputedStyle(el).overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          const atTop = el.scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
          if (!atTop && !atBottom) {
            return; // Let nested container scroll naturally
          }
        }
        el = el.parentElement;
      }

      e.preventDefault();

      let delta = e.deltaY * wheelMultiplier;
      // Normalize Firefox / lines mode
      if (e.deltaMode === 1) {
        delta *= 40;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      const maxScroll = getMaxScroll();
      targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

      if (!isRunning) {
        isRunning = true;
        gsap.ticker.add(tick);
      }
    };

    // Keep target synchronized when the user drags the native scrollbar
    const onScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    // Smooth keyboard scrolling (Arrow keys, Page Up/Down, Spacebar, Home, End)
    const onKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        /^(input|textarea|select|button)$/i.test(activeEl.tagName)
      ) {
        return;
      }

      let delta = 0;
      if (e.key === "ArrowDown") delta = 100;
      else if (e.key === "ArrowUp") delta = -100;
      else if (e.key === "PageDown" || (e.key === " " && !e.shiftKey))
        delta = window.innerHeight * 0.85;
      else if (e.key === "PageUp" || (e.key === " " && e.shiftKey))
        delta = -window.innerHeight * 0.85;
      else if (e.key === "Home") delta = -targetY;
      else if (e.key === "End") delta = getMaxScroll() - targetY;

      if (delta !== 0) {
        e.preventDefault();
        const maxScroll = getMaxScroll();
        targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

        if (!isRunning) {
          isRunning = true;
          gsap.ticker.add(tick);
        }
      }
    };

    // Smooth handling for anchor links (e.g. /#projects, #about, etc.)
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      let targetId = "";
      if (href.startsWith("#") && href.length > 1) {
        targetId = href.substring(1);
      } else if (href.startsWith("/#") && href.length > 2) {
        targetId = href.substring(2);
      }

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          const rect = el.getBoundingClientRect();
          const newTarget = Math.max(0, window.scrollY + rect.top - 80);
          const maxScroll = getMaxScroll();
          targetY = Math.min(maxScroll, newTarget);

          if (!isRunning) {
            isRunning = true;
            gsap.ticker.add(tick);
          }
        }
      }
    };

    // Add listeners
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick, { capture: true });
      gsap.ticker.remove(tick);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [lerp, wheelMultiplier]);

  return null;
}
