import WhiteNoise from '@/src/assets/WhiteNoise.jpg'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

// tell it what our base element is: div , and we take ...other to get all other div attributes like style
export default function Card({
  className,
  children,
  ...other
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <div
        className={twMerge(
          "dark:bg-gray-800 bg-brown2 rounded-3xl relative z-0 after:content-[''] after:absolute after:inset-0 after:z-10 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl dark:after:outline-white/20 after:outline-black/10 after:pointer-events-none overflow-hidden",
          className
        )}
        {...other}
      >
        <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{ backgroundImage: `url(${WhiteNoise.src})` }}
        ></div>
        {children}
      </div>
    </>
  )
}