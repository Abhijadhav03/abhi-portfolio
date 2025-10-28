'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Use lucide-react icons
import { motion } from 'framer-motion'; // For animations, since you have motion-dom.js

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to <html> class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 mr-2" />
      ) : (
        <Sun className="w-5 h-5 mr-2" />
      )}
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </motion.button>
  );
}