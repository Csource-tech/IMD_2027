"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LANGUAGES = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "zh-CN", label: "Simplified Chinese", nativeName: "简体中文" },
  { code: "nl", label: "Dutch", nativeName: "Nederlands" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/15 hover:bg-black/25 text-white text-xs font-semibold tracking-wide border border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <Globe className="w-3.5 h-3.5 text-white/90 shrink-0" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 text-white/80 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white text-gray-900 shadow-2xl border border-gray-200/90 py-1.5 z-50 overflow-hidden text-xs"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              Select Language / भाषा चुनें
            </div>
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-orange-50 text-[#ff9f43] font-bold"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.nativeName}</span>
                    {lang.code !== "en" && (
                      <span className="text-[10px] text-gray-400">
                        ({lang.label})
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#ff9f43] shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
