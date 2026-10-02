"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Unified Navbar & Mobile Menu Container */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[82%] max-w-2xl z-50 bg-[#141d18]/95 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden ${
          menuOpen ? "rounded-[2rem] p-4 sm:p-5" : "rounded-full px-4 py-2.5"
        }`}
      >
        {/* Top Bar: Logo, Desktop Nav, and Mobile Toggle */}
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo.src}
              alt="Company Logo"
              className="w-10 h-10 hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2.5 items-center">
            <Link href="/" className="nav-item text-base">
              Home
            </Link>
            <Link href="/#projects" className="nav-item text-base">
              Projects
            </Link>
            <Link href="/about" className="nav-item text-base">
              About
            </Link>
            <Link href="/blog" className="nav-item text-base">
              Blog
            </Link>
            <a
              href="mailto:jadhavabhishek53366@gmail.com"
              className="nav-item bg-[#f4efe6] text-[#092215] hover:bg-white hover:text-emerald-950 text-base font-semibold shadow-sm"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-emerald-500/15 text-white/90 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} className="text-[#86cea8]" /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Content: Unfolds within the exact same container */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="pt-3 pb-1 flex flex-col gap-1.5">
                <div className="my-1.5 h-px bg-emerald-500/15 w-full" />

                <Link
                  href="/"
                  className="px-4 py-2.5 rounded-2xl text-base font-medium text-white/85 hover:text-white hover:bg-emerald-500/15 transition-all text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/#projects"
                  className="px-4 py-2.5 rounded-2xl text-base font-medium text-white/85 hover:text-white hover:bg-emerald-500/15 transition-all text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2.5 rounded-2xl text-base font-medium text-white/85 hover:text-white hover:bg-emerald-500/15 transition-all text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="px-4 py-2.5 rounded-2xl text-base font-medium text-white/85 hover:text-white hover:bg-emerald-500/15 transition-all text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>

                <div className="my-1.5 h-px bg-emerald-500/15 w-full" />

                <a
                  href="mailto:jadhavabhishek53366@gmail.com"
                  className="w-full py-3 px-6 rounded-full bg-[#f4efe6] text-[#092215] hover:bg-white hover:text-emerald-950 text-base font-semibold transition-all text-center shadow-lg flex items-center justify-center mt-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};


