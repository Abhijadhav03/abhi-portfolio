"use client";

import { Signature } from "@/components/signature";
import { ParallaxFooter } from "@/components/effects/parallax-footer";

export const Footer = () => {
  return (
    <ParallaxFooter
      id="footer"
      footerClassName=" text-white border-t border-white/10 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="w-full py-5 px-4 flex items-center justify-center text-center text-sm text-white/80">
        <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
          <span>&copy; {new Date().getFullYear()}</span>
          <Signature
            className="inline-block align-middle"
            fontSize={16}
            color="#ffffff"
            text="Abhishek"
            inView={true}
          />
          <span>All rights reserved.</span>
        </div>
      </div>
    </ParallaxFooter>
  );
};