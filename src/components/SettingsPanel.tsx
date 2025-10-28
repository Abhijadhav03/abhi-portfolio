'use client';

import CatToggle from './CatToggle';
import MusicToggle from './MusicToggle';
import ThemeToggle from './ThemeToggle';

export default function SettingsPanel() {
  return (
    <div className="fixed bottom-4 right-4 z-[2147483648] flex space-x-4">
      <ThemeToggle />
      
    </div>
  );
}