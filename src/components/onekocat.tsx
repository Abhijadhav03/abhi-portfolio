// src/components/OnekoCat.tsx
"use client";
import { useEffect } from "react";

export default function OnekoCat() {
  useEffect(() => {
    // 🔒 Check if script already exists
    if (document.getElementById("oneko-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "oneko-script"; // Add an ID
    script.src = "/oneko/oneko.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      const scriptEl = document.getElementById("oneko-script");
      if (scriptEl) scriptEl.remove();
      
      const nekoEl = document.getElementById("oneko");
      if (nekoEl) nekoEl.remove();
    };
  }, []);

  return null;
}