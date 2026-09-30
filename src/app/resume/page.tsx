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
  const [viewerSource, setViewerSource] = useState<"fit" | "drive">("fit");
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const currentIframeSrc =
    viewerSource === "fit"
      ? `${RESUME_LOCAL_PDF}#view=FitH&toolbar=0&navpanes=0`
      : RESUME_PREVIEW_URL;

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 text-white overflow-x-hidden selection:bg-lime-400 selection:text-gray-950">
      {/* Background grain texture */}
      <div
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none fixed"
        style={{ backgroundImage: `url(${grainimage.src})` }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Header />

      <main className="w-full max-w-[860px] mx-auto px-3 sm:px-4 pt-24 sm:pt-28 pb-16 relative z-10">
        {/* Minimal Action Bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-lime-300 transition-colors py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Copy Resume Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white transition-all backdrop-blur-md"
              title="Copy Google Drive resume link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-lime-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Open in Drive */}
            <a
              href={RESUME_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-md"
              title="Open in Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Drive</span>
            </a>

            {/* Download Resume */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-lime-400 hover:bg-lime-300 text-gray-950 transition-all shadow-[0_0_20px_rgba(190,242,100,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Minimal Resume Viewer */}
        <div
          className={`transition-all duration-300 ${isFullscreen
            ? "fixed inset-0 z-50 p-2 sm:p-4 bg-gray-950/95 backdrop-blur-2xl flex flex-col justify-center items-center"
            : "relative w-full"
            }`}
        >
          <div className="w-full bg-gray-900/90 rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col">
            {/* Viewer Header */}
            <div className="px-3 sm:px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-lime-400" />


                {/* View Mode Toggle: Fit Width vs Google Drive */}

              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Reload document"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title={isFullscreen ? "Exit Fullscreen (ESC)" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5 text-lime-300" />
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
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm gap-3 text-white/70">
                  <div className="w-8 h-8 border-2 border-lime-400/20 border-t-lime-400 rounded-full animate-spin" />
                  <p className="text-xs font-medium text-white/60">
                    Loading resume...
                  </p>
                </div>
              )}

              <iframe
                key={viewerSource}
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
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-950/90 backdrop-blur-xl border border-lime-400/40 text-white text-xs shadow-xl">
              <Check className="w-3.5 h-3.5 text-lime-400" />
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
