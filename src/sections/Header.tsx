"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

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

      {/* Navbar: pill (closed) crossfades into a single rounded sheet (open) */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[82%] max-w-2xl z-50">
        {/* Closed state: pill bar (always visible on desktop) */}
        <div
          className={`justify-between items-center w-full rounded-full px-4 py-2.5 bg-[#141d18]/95 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${
            menuOpen ? "hidden md:flex" : "flex"
          }`}
        >
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
            <Link
              href="/#footer"
              className="nav-item bg-[#f4efe6] text-[#092215] hover:bg-white hover:text-emerald-950 text-base font-semibold shadow-sm"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-emerald-500/15 text-white/90 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Open state: unified sheet with logo, close X, and left-aligned links */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top center" }}
              className="md:hidden rounded-[2rem] px-6 pt-5 pb-6 bg-[#141d18]/55 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Sheet top row: logo + plain close button */}
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                  <img src={logo.src} alt="Company Logo" className="w-10 h-10" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Left-aligned link list with staggered reveal */}
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
                }}
                className="mt-5 flex flex-col items-start"
              >
                {mobileLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2.5 text-xl font-medium text-white/85 hover:text-[#86cea8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  className="w-full"
                >
                  <div className="my-3 h-px bg-emerald-500/15 w-full" />
                  <Link
                    href="/#footer"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 px-6 rounded-full bg-[#f4efe6] text-[#092215] hover:bg-white hover:text-emerald-950 text-base font-semibold transition-all text-center flex items-center justify-center"
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
