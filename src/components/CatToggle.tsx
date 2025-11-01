'use client';

import { useEffect, useState } from 'react';
import { Cat } from 'lucide-react';

export default function CatToggle() {
  const [enabled, setEnabled] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('oneko:enabled');
    const start = saved === null ? true : JSON.parse(saved);
    setEnabled(start);
    if (start) (window as any).onekoToggle?.();
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('oneko:enabled', JSON.stringify(next));
    (window as any).onekoToggle?.(next);
  };

  return (
    <button
      onClick={toggle}
      className={`
        p-3 rounded-full shadow-lg transition-all duration-200
        ${enabled 
          ? 'bg-pink-600 text-white hover:bg-pink-700' 
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }
      `}
      title={enabled ? 'Hide the cat' : 'Show the cat'}
    >
      <Cat className="w-5 h-5" />
    </button>
  );
}