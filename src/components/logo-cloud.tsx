"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useTranslations } from "next-intl";
import { NextIntlClientProvider, useMessages } from "next-intl";
// import { whiteNoise } from "@/src/assets/images/grain.jpg";
 import { grainimage } from '@/assets/images/grain.jpg';

export default function LogoCloud() {
  const t = useTranslations("LogoCloud");

  return (
    <section className="relative overflow-hidden py-16 bg-black dark:bg-gray-950 text-white dark:text-black z-0">
      {/* Background with White Noise and Gradient Mask */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainimage.src})`,
          }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-10">
          {/* Text Section */}
          <div className="md:w-1/4 text-center md:text-left mb-8 md:mb-0">
            <h3 className="font-serif text-sm tracking-[0.25em] uppercase dark:text-emerald-300/80 text-amber-500/80">
              {t("heading")}
            </h3>
            <p className="mt-2 text-sm dark:text-white/60 text-black/60">
              {t("description")}
            </p>
          </div>

          {/* Logo Slider */}
          <div className="relative md:w-3/4 py-4">
            <InfiniteSlider
              speed={35}
              speedOnHover={15}
              gap={48}
              className="flex items-center"
            >
              {[
                "nvidia",
                "column",
                "github",
                "nike",
                "lemonsqueezy",
                "laravel",
                "lilly",
                "openai",
              ].map((name) => (
                <div key={name} className="flex items-center justify-center px-4">
                  <img
                    className="h-6 sm:h-8 w-auto dark:opacity-70 opacity-50 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 dark:invert"
                    src={`https://html.tailus.io/blocks/customers/${name}.svg`}
                    alt={`${name} logo`}
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* Edge Blur Effects */}
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={0.8}
              style={{
                background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent)",
              }}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={0.8}
              style={{
                background: "linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
