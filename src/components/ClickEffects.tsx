"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type InteractionMode =
  | "wavy"
  | "rings"
  | "burst"
  | "particles"
  | "crosshair"
  | "sniper";

export interface ClickEffectsProps {
  /**
   * Color of the effect.
   * Default: "#a3e635" (Lime-400 matching Abhishek's portfolio theme)
   */
  color?: string;
  /**
   * Type of animation effect or "auto" to show wavy majorly with others sprinkled in.
   * Default: "auto"
   */
  interactionMode?: InteractionMode | "auto";
  /**
   * Frequency of wavy effect (between 0 and 1).
   * Default: 0.75 (75% wavy, 25% other effects)
   */
  wavyRatio?: number;
  /**
   * Duration of the animation in seconds.
   * Default: 0.7
   */
  duration?: number;
  /**
   * Stroke width in pixels.
   * Default: 3
   */
  strokeWidth?: number;
  /**
   * Size of the effect bounding box in pixels.
   * Default: 85
   */
  effectSize?: number;
  /**
   * Base rotation angle in degrees.
   * Default: 0
   */
  rotation?: number;
  /**
   * Z-index of the container layer.
   * Default: 99999
   */
  zIndex?: number;
}

interface EffectItem {
  id: string;
  x: number;
  y: number;
}

interface ParticleItem {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

const SECONDARY_MODES: InteractionMode[] = [
  "particles",
  "burst",
  "rings",
  "crosshair",
  "sniper",
];

export default function ClickEffects({
  color = "#a3e635", // Portfolio accent lime-400
  interactionMode = "auto",
  wavyRatio = 0.75, // 75% wavy, 25% secondary effects
  duration = 0.7,
  strokeWidth = 3,
  effectSize = 85,
  rotation = 0,
  zIndex = 99999,
}: ClickEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Counters for cadence: ensures wavy is major, but other effects reliably appear
  const wavyStreakRef = useRef(0);
  const secondaryIndexRef = useRef(0);

  const [rings, setRings] = useState<EffectItem[]>([]);
  const [bursts, setBursts] = useState<EffectItem[]>([]);
  const [particles, setParticles] = useState<ParticleItem[]>([]);
  const [crosshairs, setCrosshairs] = useState<EffectItem[]>([]);
  const [wavyItems, setWavyItems] = useState<EffectItem[]>([]);
  const [snipers, setSnipers] = useState<EffectItem[]>([]);

  // Click listener with capture: true to trigger anywhere on the page
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      // Determine the active mode for this click
      let selectedMode: InteractionMode = "wavy";

      if (interactionMode === "auto") {
        // Wavy is shown major of the time:
        // After 3 wavy clicks (or based on wavyRatio), trigger a secondary effect
        const requiredWavyCount = Math.max(1, Math.round(wavyRatio / (1 - wavyRatio))); // e.g. 0.75 -> 3
        if (wavyStreakRef.current >= requiredWavyCount) {
          // Show the next secondary effect so user gets to notice all of them
          selectedMode = SECONDARY_MODES[secondaryIndexRef.current];
          secondaryIndexRef.current =
            (secondaryIndexRef.current + 1) % SECONDARY_MODES.length;
          wavyStreakRef.current = 0;
        } else {
          selectedMode = "wavy";
          wavyStreakRef.current += 1;
        }
      } else {
        selectedMode = interactionMode;
      }

      // Dispatch to state
      if (selectedMode === "wavy") {
        setWavyItems((prev) => [...prev, { id, x, y }]);
      } else if (selectedMode === "rings") {
        setRings((prev) => [...prev, { id, x, y }]);
      } else if (selectedMode === "burst") {
        setBursts((prev) => [...prev, { id, x, y }]);
      } else if (selectedMode === "particles") {
        const count = 8;
        const newParticles: ParticleItem[] = Array.from({ length: count }, (_, i) => ({
          id: `${id}-${i}`,
          x,
          y,
          angle: i * 45 * (Math.PI / 180),
          distance: effectSize * 0.2 + effectSize * 0.3 * Math.random(),
        }));
        setParticles((prev) => [...prev, ...newParticles]);
      } else if (selectedMode === "crosshair") {
        setCrosshairs((prev) => [...prev, { id, x, y }]);
      } else if (selectedMode === "sniper") {
        setSnipers((prev) => [...prev, { id, x, y }]);
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [interactionMode, wavyRatio, effectSize]);

  // Glow filter matching the portfolio theme
  const glowFilter = `drop-shadow(0 0 6px ${color}80)`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex,
        overflow: "hidden",
      }}
    >
      {/* 1. WAVY EFFECT (Jackie Zhang's exact click animation - Primary) */}
      {wavyItems.map((item) => (
        <svg
          key={item.id}
          style={{
            position: "absolute",
            left: item.x - effectSize / 2,
            top: item.y - effectSize / 2,
            width: effectSize,
            height: effectSize,
            pointerEvents: "none",
            overflow: "visible",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
            filter: glowFilter,
          }}
          ref={(el) => {
            if (el && !el.dataset.animated) {
              el.dataset.animated = "true";
              el.querySelectorAll("path").forEach((path) => {
                const len = path.getTotalLength();
                gsap.set(path, {
                  strokeDasharray: `1, ${len}`,
                  strokeDashoffset: 0,
                  strokeWidth,
                });
                gsap
                  .timeline()
                  .to(path, {
                    strokeDasharray: `${len}, ${len}`,
                    strokeDashoffset: -len,
                    duration,
                    ease: "power1.out",
                  })
                  .to(
                    path,
                    {
                      strokeWidth: 0,
                      duration: duration * 0.4,
                      ease: "linear",
                    },
                    duration * 0.6
                  );
              });
              gsap.delayedCall(duration, () => {
                setWavyItems((prev) => prev.filter((it) => it.id !== item.id));
              });
            }
          }}
        >
          {[45, 90, 135, 180].map((angleDeg, idx) => {
            const r = effectSize / 2;
            const a = effectSize / 2;
            const s = effectSize * 0.1;
            const c = effectSize * 0.5;
            const rad = (angleDeg * Math.PI) / 180;
            const u = r + s * Math.cos(rad);
            const d = a - s * Math.sin(rad);
            const f = r + c * Math.cos(rad);
            const p = a - c * Math.sin(rad);
            const m = (u + f) / 2;
            const h = (d + p) / 2;
            const g = effectSize * 0.05;
            const dAttr = `M ${u} ${d} Q ${
              m + g * Math.cos(rad + Math.PI / 2)
            } ${h - g * Math.sin(rad + Math.PI / 2)} ${m} ${h} T ${f} ${p}`;

            return (
              <path
                key={idx}
                d={dAttr}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>
      ))}

      {/* 2. RINGS EFFECT */}
      {rings.map((item) => (
        <svg
          key={item.id}
          style={{
            position: "absolute",
            left: item.x - effectSize / 2,
            top: item.y - effectSize / 2,
            width: effectSize,
            height: effectSize,
            pointerEvents: "none",
            overflow: "visible",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
            filter: glowFilter,
          }}
          ref={(el) => {
            if (el && !el.dataset.animated) {
              el.dataset.animated = "true";
              const tl = gsap.timeline();
              gsap.set(el, { scale: 0.5, opacity: 1 });
              const circle = el.querySelector("circle");
              if (circle) gsap.set(circle, { strokeWidth });

              tl.to(
                el,
                {
                  scale: 2,
                  duration,
                  ease: "power3.out",
                  onComplete: () => {
                    setRings((prev) => prev.filter((it) => it.id !== item.id));
                  },
                },
                0
              )
                .to(
                  circle,
                  {
                    strokeWidth: 0,
                    duration,
                    ease: "power3.out",
                  },
                  0
                )
                .to(
                  el,
                  {
                    opacity: 0,
                    duration: duration * 0.2,
                    ease: "linear",
                  },
                  duration * 0.8
                );
            }
          }}
        >
          <circle
            cx={effectSize / 2}
            cy={effectSize / 2}
            r={effectSize / 4}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </svg>
      ))}

      {/* 3. BURST EFFECT */}
      {bursts.map((item) => (
        <svg
          key={item.id}
          style={{
            position: "absolute",
            left: item.x - effectSize / 2,
            top: item.y - effectSize / 2,
            width: effectSize,
            height: effectSize,
            pointerEvents: "none",
            overflow: "visible",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
            filter: glowFilter,
          }}
          ref={(el) => {
            if (el && !el.dataset.animated) {
              el.dataset.animated = "true";
              const lines = el.querySelectorAll("line");
              lines.forEach((line, r) => {
                const angles = [45, 80, 115, 150];
                const a = angles[r] * (Math.PI / 180);
                const s = effectSize / 2;
                const c = effectSize / 2;
                const l = s + effectSize * 0.1 * Math.cos(a);
                const u = c - effectSize * 0.1 * Math.sin(a);
                const d = s + effectSize * 0.25 * Math.cos(a);
                const f = c - effectSize * 0.25 * Math.sin(a);

                gsap.set(line, {
                  attr: { x1: l, y1: u, x2: d, y2: f },
                  strokeWidth,
                });
                gsap
                  .timeline()
                  .to(line, {
                    attr: { x1: d, y1: f, x2: d, y2: f },
                    translateX: (effectSize / 4) * Math.cos(a),
                    translateY: (-effectSize / 4) * Math.sin(a),
                    duration,
                    ease: "power2.out",
                    onComplete: () => {
                      setBursts((prev) => prev.filter((it) => it.id !== item.id));
                    },
                  })
                  .to(
                    line,
                    {
                      strokeWidth: 0,
                      duration: duration * 0.4,
                      ease: "linear",
                    },
                    duration * 0.6
                  );
              });
            }
          }}
        >
          {[45, 80, 115, 150].map((_, n) => {
            const r = effectSize / 2;
            const a = effectSize / 2;
            return (
              <line
                key={n}
                x1={r}
                y1={a}
                x2={r}
                y2={a}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="square"
              />
            );
          })}
        </svg>
      ))}

      {/* 4. PARTICLES EFFECT */}
      {particles.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            transformOrigin: "center",
            left: item.x - strokeWidth / 2,
            top: item.y - strokeWidth / 2,
            width: strokeWidth,
            height: strokeWidth,
            backgroundColor: color,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: `rotate(${rotation}deg)`,
            boxShadow: `0 0 8px ${color}`,
          }}
          ref={(el) => {
            if (el && !el.dataset.animated) {
              el.dataset.animated = "true";
              const targetX = item.x + Math.cos(item.angle) * item.distance;
              const targetY = item.y + Math.sin(item.angle) * item.distance;

              gsap.set(el, {
                left: item.x - strokeWidth / 2,
                top: item.y - strokeWidth / 2,
                width: 0,
                height: 0,
              });

              gsap
                .timeline()
                .to(el, {
                  width: strokeWidth,
                  height: strokeWidth,
                  duration: duration * 0.2,
                  ease: "power1.out",
                })
                .to(
                  el,
                  {
                    left: targetX - strokeWidth / 2,
                    top: targetY - strokeWidth / 2,
                    duration: duration * 0.4,
                    ease: "power1.out",
                  },
                  duration * 0.2
                )
                .to(
                  el,
                  {
                    width: 0,
                    height: 0,
                    left: targetX,
                    top: targetY,
                    duration: duration * 0.4,
                    ease: "linear",
                    onComplete: () => {
                      setParticles((prev) => prev.filter((it) => it.id !== item.id));
                    },
                  },
                  duration * 0.6
                );
            }
          }}
        />
      ))}

      {/* 5. CROSSHAIR EFFECT */}
      {crosshairs.map((item) => (
        <svg
          key={item.id}
          style={{
            position: "absolute",
            left: item.x - effectSize / 2,
            top: item.y - effectSize / 2,
            width: effectSize,
            height: effectSize,
            pointerEvents: "none",
            overflow: "visible",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
            filter: glowFilter,
          }}
          ref={(el) => {
            if (el && !el.dataset.animated) {
              el.dataset.animated = "true";
              const lines = el.querySelectorAll("line");
              lines.forEach((line, r) => {
                const angles = [0, 90, 180, 270];
                const a = angles[r] * (Math.PI / 180);
                const s = effectSize / 2;
                const c = effectSize / 2;
                const l = effectSize * 0.3;
                const u = s + 20 * Math.cos(a);
                const d = c - 20 * Math.sin(a);
                const f = s + (20 + l) * Math.cos(a);
                const p = c - (20 + l) * Math.sin(a);

                gsap.set(line, {
                  attr: { x1: u, y1: d, x2: s, y2: c },
                  strokeWidth,
                });
                gsap
                  .timeline()
                  .to(line, {
                    attr: { x1: f, y1: p, x2: f, y2: p },
                    duration: duration * 0.8,
                    ease: "power1.out",
                  })
                  .to(
                    line,
                    {
                      strokeWidth: 0,
                      duration: duration * 0.6,
                      ease: "linear",
                      onComplete: () => {
                        setCrosshairs((prev) => prev.filter((it) => it.id !== item.id));
                      },
                    },
                    duration * 0.4
                  );
              });
            }
          }}
        >
          {[0, 90, 180, 270].map((_, n) => {
            const r = effectSize / 2;
            const a = effectSize / 2;
            return (
              <line
                key={n}
                x1={r}
                y1={a}
                x2={r}
                y2={a}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="square"
              />
            );
          })}
        </svg>
      ))}

      {/* 6. SNIPER EFFECT */}
      {snipers.map((item) => (
        <div key={item.id}>
          <svg
            style={{
              position: "absolute",
              left: item.x - effectSize / 2,
              top: item.y - effectSize / 2,
              width: effectSize,
              height: effectSize,
              pointerEvents: "none",
              overflow: "visible",
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center",
              filter: glowFilter,
            }}
            ref={(el) => {
              if (el && !el.dataset.animated) {
                el.dataset.animated = "true";
                const lines = el.querySelectorAll("line");
                lines.forEach((line, t) => {
                  const r = [0, 90, 180, 270][t] * (Math.PI / 180);
                  const a = effectSize / 2;
                  const s = effectSize / 2;
                  const c = effectSize * 0.2;
                  const l = a + 5 * Math.cos(r);
                  const u = s - 5 * Math.sin(r);
                  const d = a + (5 + c) * Math.cos(r);
                  const f = s - (5 + c) * Math.sin(r);

                  gsap.set(line, {
                    attr: { x1: l, y1: u, x2: d, y2: f },
                    strokeWidth,
                  });
                  gsap
                    .timeline()
                    .to(line, {
                      attr: { x1: d, y1: f, x2: d, y2: f },
                      translateX: (5 + c) * Math.cos(r),
                      translateY: -(5 + c) * Math.sin(r),
                      duration,
                      ease: "power2.out",
                    })
                    .to(
                      line,
                      {
                        strokeWidth: 0,
                        duration: duration * 0.4,
                        ease: "linear",
                      },
                      duration * 0.6
                    );
                });
              }
            }}
          >
            {[0, 90, 180, 270].map((_, n) => {
              const r = effectSize / 2;
              const a = effectSize / 2;
              return (
                <line
                  key={n}
                  x1={r}
                  y1={a}
                  x2={r}
                  y2={a}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="square"
                />
              );
            })}
          </svg>

          {[
            Math.PI / 3,
            (2 * Math.PI) / 3,
            (4 * Math.PI) / 3,
            (5 * Math.PI) / 3,
            Math.PI / 6,
            (5 * Math.PI) / 6,
            (7 * Math.PI) / 6,
            (11 * Math.PI) / 6,
          ].map((angle, dotIdx) => (
            <div
              key={dotIdx}
              style={{
                position: "absolute",
                left: item.x - strokeWidth / 2,
                top: item.y - strokeWidth / 2,
                width: strokeWidth,
                height: strokeWidth,
                backgroundColor: color,
                pointerEvents: "none",
                transformOrigin: "center",
                transform: `rotate(${rotation}deg)`,
                boxShadow: `0 0 6px ${color}`,
              }}
              ref={(el) => {
                if (el && !el.dataset.animated) {
                  el.dataset.animated = "true";
                  gsap.set(el, { x: 0, y: 0, width: strokeWidth, height: strokeWidth });
                  gsap
                    .timeline()
                    .to(el, {
                      x: effectSize * 0.4 * Math.cos(angle),
                      y: effectSize * 0.4 * Math.sin(angle),
                      duration,
                      ease: "power2.out",
                      onComplete: () => {
                        setSnipers((prev) => prev.filter((it) => it.id !== item.id));
                      },
                    })
                    .to(
                      el,
                      {
                        width: 0,
                        height: 0,
                        duration: duration * 0.4,
                        ease: "linear",
                      },
                      duration * 0.6
                    );
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
