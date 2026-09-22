"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe, ChevronDown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LanguageOption {
  code: string;
  nativeName: string;
  subName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", nativeName: "English", subName: "English (EN)" },
  { code: "hi", nativeName: "हिंदी", subName: "Hindi (HI)" },
  { code: "zh-CN", nativeName: "中文", subName: "Chinese (ZH)" },
  { code: "nl", nativeName: "Nederlands", subName: "Dutch (NL)" },
];

interface LanguageSwitcherProps {
  variant?: "pill" | "drawer-row";
  className?: string;
  onDrawerAction?: () => void;
}

export default function LanguageSwitcher({
  variant = "pill",
  className = "",
  onDrawerAction,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang =
    LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (newLocale: string) => {
    setIsOpen(false);
    if (onDrawerAction) {
      onDrawerAction();
    }
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* Trigger: Desktop / Header Pill */}
      {variant === "pill" && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Select language"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/15 hover:bg-black/25 text-white text-xs font-semibold tracking-wide border border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 ${className}`}
        >
          <Globe className="w-3.5 h-3.5 text-white/90 shrink-0" />
          <span>{currentLang.nativeName}</span>
          <ChevronDown className="w-3 h-3 text-white/80 shrink-0" />
        </button>
      )}

      {/* Trigger: Mobile Drawer Row */}
      {variant === "drawer-row" && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Choose language"
          className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50/90 hover:bg-gray-100 text-gray-800 transition-colors border border-gray-200/70 cursor-pointer ${className}`}
        >
          <span className="text-sm font-semibold text-gray-700">Language</span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#004aab] bg-white px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
            <span>{currentLang.nativeName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#004aab]/80" />
          </span>
        </button>
      )}

      {/* "Choose a language" Modal Dialog via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="language-modal-title"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-[430px] sm:max-w-[460px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 relative border border-gray-100 max-h-[90vh] flex flex-col"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
                    <h2
                      id="language-modal-title"
                      className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
                    >
                      Choose a language
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 2-Column Grid of Languages */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-4 overflow-y-auto pr-0.5">
                    {LANGUAGES.map((lang) => {
                      const isSelected = lang.code === locale;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`p-3 sm:p-3.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "border-2 border-blue-500 bg-blue-50/30 ring-0 shadow-xs"
                              : "border border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/70"
                          }`}
                        >
                          <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight block">
                            {lang.nativeName}
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-500 font-normal mt-0.5 sm:mt-1 block">
                            {lang.subName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
