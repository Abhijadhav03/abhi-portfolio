'use client';

import { useState } from 'react';
import OnekoCat from './onekocat';
import { Cat } from 'lucide-react';

export default function CatToggle() {
  const [isCatActive, setIsCatActive] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-[2147483648]">
      <button
        onClick={() => setIsCatActive(!isCatActive)}
        className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 shadow-md ${
          isCatActive
            ? 'bg-lime-400/20 border-lime-400/40 hover:bg-lime-400/30'
            : 'bg-white/10 border-white/20 hover:bg-white/20'
        }`}
        aria-label={isCatActive ? 'Hide Cat' : 'Show Cat'}
      >
        <Cat
          className={`w-5 h-5 transition-colors duration-300 ${
            isCatActive ? 'text-lime-400' : 'text-white'
          }`}
        />
      </button>

      {isCatActive && <OnekoCat />}
    </div>
  );
}
