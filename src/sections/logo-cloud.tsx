// src/components/LogoCloud.tsx
'use client';

import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
};

function InfiniteSlider({
  children,
  gap = 35, // Increased default gap for more spacing
  speed = 60,
  speedOnHover = 20,
  direction = 'horizontal',
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
}) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentSpeed * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentSpeed,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentSpeed, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className={cn('flex w-max shadow-sm dark:shadow-gray-900')}
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`, // Apply gap between logos
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function LogoCloud({
  className,
  logos,
  gap = 32, // Increased default gap for more spacing
  speed = 60,
  speedOnHover = 20,
  direction = 'horizontal',
  reverse = false,
  ...props
}: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'py-4 bg-gray-850 text-foreground', // Reduced height
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', // Increased edge blur
        className
      )}
    >
      <InfiniteSlider gap={gap} speed={speed} speedOnHover={speedOnHover} direction={direction} reverse={reverse}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              'h-8 w-auto md:h-6', // Reduced logo height
              'dark:brightness-75 dark:contrast-125', // Theme-aware logo styling
              'pointer-events-none select-none'
            )}
            height={logo.height || 'auto'}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || 'auto'}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}