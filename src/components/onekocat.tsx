// src/components/OnekoCat.tsx
"use client";
import { useEffect, useState } from "react";

export default function OnekoCat() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko/oneko.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    setIsMounted(true);

    return () => {
      document.head.removeChild(script);
      // Clean up the oneko div to prevent duplicates
      const nekoEl = document.getElementById("oneko");
      if (nekoEl) nekoEl.remove();
    };
  }, []);

  return isMounted ? <div id="oneko" /> : null;
}