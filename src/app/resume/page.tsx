"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  Maximize2,
  Minimize2,
  ArrowLeft,
  RefreshCw,
  FileText,
} from "lucide-react";
import dynamic from "next/dynamic";
import grainimage from "@/assets/images/grain.jpg";

const Header = dynamic(() => import("@/sections/Header").then((m) => m.Header));
const Footer = dynamic(() => import("@/sections/Footer").then((m) => m.Footer));

const RESUME_DRIVE_URL =
  "https://drive.google.com/file/d/1XAkb2-Y08ZHbDBL2u4MZpZRaLVFg-Jdf/view?usp=sharing";
const RESUME_PREVIEW_URL =
  "https://drive.google.com/file/d/1XAkb2-Y08ZHbDBL2u4MZpZRaLVFg-Jdf/preview";
const RESUME_LOCAL_PDF = "/resume.pdf";

export default function ResumePage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DRIVE_URL);
      setCopied(true);
      setToastMessage("Resume link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = RESUME_DRIVE_URL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setToastMessage("Resume link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_LOCAL_PDF;
    link.download = "Abhishek_Jadhav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Downloading Abhishek_Jadhav_Resume.pdf");
  };

  const handleRefresh = () => {
    setIframeLoaded(false);
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentSrc;
      }, 50);
    }
  };

  const currentIframeSrc = isMobile
    ? RESUME_PREVIEW_URL
    : `${RESUME_LOCAL_PDF}#view=FitH&toolbar=0&navpanes=0`;

  return (
    <div className="relative min-h-screen bg-[#111714] text-white overflow-x-hidden selection:bg-[#3d9e6e]/30 selection:text-[#86cea8]">
      {/* Background grain texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none fixed"
        style={{ backgroundImage: `url(${grainimage.src})` }}
      />

      {/* Ambient background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61, 158, 110, 0.22) 0%, rgba(10, 46, 26, 0.15) 45%, transparent 75%)",
        }}
      />

      {/* Navigation Header */}
      <Header />

      <main className="w-full max-w-[860px] mx-auto px-3 sm:px-4 pt-24 sm:pt-28 pb-16 relative z-10">
        {/* Minimal Back Button */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/80 hover:text-[#4fd196] transition-colors py-1.5 px-3.5 rounded-full bg-[#161f1a]/80 hover:bg-[#1a2720] border border-emerald-500/20 backdrop-blur-md shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Minimal Resume Viewer */}
        <div
          className={`transition-all duration-300 ${isFullscreen
            ? "fixed inset-0 z-50 p-2 sm:p-4 bg-[#111714]/95 backdrop-blur-2xl flex flex-col justify-center items-center"
            : "relative w-full"
            }`}
        >
          <div className="w-full bg-[#161f1a]/90 rounded-2xl sm:rounded-3xl border border-emerald-500/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col">
            {/* Viewer Header */}
            <div className="px-3 sm:px-4 py-2.5 bg-[#111714]/80 border-b border-emerald-500/15 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-2">

              </div>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Copy Link Icon */}
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-md hover:bg-emerald-500/10 text-white/70 hover:text-white transition-colors"
                  title="Copy resume link"
                  aria-label="Copy resume link"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#4fd196]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Open in Drive Icon */}
                <a
                  href={RESUME_DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-emerald-500/10 text-white/70 hover:text-white transition-colors"
                  title="Open in Google Drive"
                  aria-label="Open in Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Download PDF Icon */}
                <button
                  onClick={handleDownload}
                  className="p-1.5 rounded-md hover:bg-emerald-500/10 text-white/70 hover:text-[#4fd196] transition-colors"
                  title="Download PDF"
                  aria-label="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* Subtle Divider */}
                <span className="w-px h-3.5 bg-emerald-500/20 mx-0.5" />

                {/* Refresh Icon */}
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-md hover:bg-emerald-500/10 text-white/70 hover:text-white transition-colors"
                  title="Reload document"
                  aria-label="Reload document"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {/* Fullscreen Icon */}
                <button
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  className="p-1.5 rounded-md hover:bg-emerald-500/10 text-white/70 hover:text-white transition-colors"
                  title={isFullscreen ? "Exit Fullscreen (ESC)" : "Fullscreen"}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5 text-[#4fd196]" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Document Iframe Container */}
            <div
              className={`relative w-full bg-white ${isFullscreen
                ? "h-[calc(100vh-70px)]"
                : "h-[80vh] sm:h-[86vh] md:h-[90vh]"
                }`}
            >
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#161f1a]/95 backdrop-blur-sm gap-3 text-white/70">
                  <div className="w-8 h-8 border-2 border-[#3d9e6e]/20 border-t-[#4fd196] rounded-full animate-spin" />
                  <p className="text-xs font-medium text-white/60">
                    Loading resume...
                  </p>
                </div>
              )}

              <iframe
                key={isMobile ? "mobile" : "desktop"}
                ref={iframeRef}
                src={currentIframeSrc}
                className="w-full h-full border-0 block"
                title="Abhishek Jadhav Resume"
                allow="autoplay"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#161f1a]/95 backdrop-blur-xl border border-[#3d9e6e]/50 text-white text-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <Check className="w-3.5 h-3.5 text-[#4fd196]" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
