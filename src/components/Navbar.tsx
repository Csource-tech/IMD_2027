"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown, Ticket, Store, MapPin, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navbar");
  const tCommon = useTranslations("common");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const NAV_ITEMS = [
    { name: t("home"), id: "Home", href: "/#home" },
    {
      name: t("about"),
      id: "About",
      href: "/#about",
      dropdown: [
        { name: t("aboutMovement"), href: "/#about" },
        { name: t("shroomConnect"), href: "/#about-shroomconnect" },
        { name: t("organisingCommittee"), href: "/#organising-committee" },
        { name: t("ourStrength"), href: "/#our-strength" },
      ],
    },
    {
      name: t("valueChain"),
      id: "Value Chain",
      href: "/#industry-chain",
      dropdown: [
        { name: t("buttonBackbone"), href: "/#industry-chain" },
        { name: t("specialtySectors"), href: "/#specialty-sectors" },
        { name: t("whyJoin"), href: "/#why-join" },
        { name: t("buyerClub"), href: "/#buyer-club" },
      ],
    },
    {
      name: t("partnersExpo"),
      id: "Partners & Expo",
      href: "/#past-sponsors",
      dropdown: [
        { name: t("strategicPartners"), href: "/#past-sponsors" },
        { name: t("exhibitors"), href: "/#exhibitors" },
      ],
    },
    {
      name: t("media"),
      id: "Media",
      href: "/#gallery",
      dropdown: [
        { name: t("gallery"), href: "/#gallery" },
        { name: t("testimonials"), href: "/#testimonials" },
      ],
    },
    { name: t("contact"), id: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionMap: { [key: string]: string } = {
        home: "Home",
        about: "About",
        "about-shroomconnect": "About",
        "organising-committee": "About",
        "our-strength": "About",
        "industry-chain": "Value Chain",
        "specialty-sectors": "Value Chain",
        "why-join": "Value Chain",
        "buyer-club": "Value Chain",
        "past-sponsors": "Partners & Expo",
        exhibitors: "Partners & Expo",
        gallery: "Media",
        testimonials: "Media",
        contact: "Contact",
      };

      for (const id of Object.keys(sectionMap).reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(sectionMap[id]);
          break;
        }
      }
      if (window.scrollY < 80) {
        setActiveSection("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative z-40 w-full shadow-none">
      {/* 1. Upper Lighter Orange Utility Banner */}
      <div className="w-full bg-[#ff9f43] text-white text-xs font-semibold py-2 px-4 sm:px-8 lg:px-12 flex items-center justify-between shadow-sm">
        {/* Left: Location, Helpline & Email */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-5">
          <div className="flex items-center gap-1.5 text-white/95">
            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{tCommon("eventLocation")}</span>
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5 text-white/95">
            <Phone className="w-3.5 h-3.5 text-white shrink-0" />
            <span>
              {tCommon("hotline")}:{" "}
              <a href="tel:+918860115588" className="hover:underline font-bold">
                +91 88601 15588
              </a>
            </span>
          </div>
          <span className="hidden md:inline text-white/40">•</span>
          <div className="hidden md:flex items-center gap-1.5 text-white/95">
            <Mail className="w-3.5 h-3.5 text-white shrink-0" />
            <a href="mailto:reachout@mushex.in" className="hover:underline font-medium">
              reachout@mushex.in
            </a>
          </div>
        </div>

        {/* Right: Language Switcher & Social Icons */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-white/90">
          <LanguageSwitcher />
          <div className="hidden sm:block h-3.5 w-px bg-white/30" />
          <a
            href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://x.com/IMD2027"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="hover:text-white transition-colors hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@MushroomExchange"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-white transition-colors hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. Main Highly Transparent White Navbar */}
      <div className="w-full bg-white/35 backdrop-blur-md border-b border-black/[0.05] px-4 sm:px-8 lg:px-6 xl:px-12 py-3 sm:py-3.5 flex items-center justify-between relative">
        {/* Left: Dual Logos Placeholder (preserves horizontal layout space without expanding navbar height) */}
        <div className="flex-shrink-0 z-20 flex items-center pointer-events-none">
          <div className="w-[140px] sm:w-[172px] md:w-[204px] lg:w-[268px] h-6 sm:h-8" />
        </div>

        {/* Left: Dual Logos (Absolute: Half over navbar, half below navbar) */}
        <Link
          href="/#home"
          className="absolute left-4 sm:left-8 lg:left-6 xl:left-8 top-[110%] -translate-y-1/2 z-30 flex items-center gap-2 sm:gap-3 group focus:outline-none"
          aria-label="India Mushroom Days 2027 & Shroom Connect Homepage"
        >
          <img
            src="/reallogo.png"
            alt="India Mushroom Days 2027 Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain rounded-full bg-white border sm:border-2 border-white shadow-2xl drop-shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="h-6 sm:h-8 md:h-10 w-[1.5px] bg-white/70 shadow-sm shrink-0" />
          <img
            src="/shroomlogo.jpeg"
            alt="Shroom Connect Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain rounded-full bg-[#eae1d1] p-1 sm:p-1.5 border sm:border-2 border-white shadow-2xl drop-shadow-md group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center: Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-0.5 xl:space-x-3 absolute left-1/2 -translate-x-1/2 z-20">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
            const isActive = activeSection === item.id;

            if (!hasDropdown) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-2 xl:px-3 py-2 text-[11px] xl:text-sm uppercase tracking-wider font-bold transition-all duration-200 group whitespace-nowrap ${isActive ? "text-[#ff9f43]" : "text-gray-800 hover:text-[#ff9f43]"
                    }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#ff9f43] rounded-full transition-all duration-200 ${isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`relative px-2 xl:px-3 py-2 text-[11px] xl:text-sm uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer focus:outline-none group whitespace-nowrap ${isActive ? "text-[#ff9f43]" : "text-gray-800 hover:text-[#ff9f43]"
                    }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.id
                        ? "rotate-180 text-[#ff9f43]"
                        : "text-gray-600 group-hover:text-[#ff9f43]"
                      }`}
                  />
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#ff9f43] rounded-full transition-all duration-200 ${isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                  />
                </Link>

                {/* Dropdown Menu Box */}
                <AnimatePresence>
                  {activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-72 z-50"
                    >
                      <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200/80 shadow-2xl p-2 space-y-1">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl hover:bg-orange-50/80 transition-colors text-left"
                          >
                            <div className="text-xs font-bold text-gray-800 group-hover:text-[#ff9f43] transition-colors flex items-center justify-between">
                              <span>{sub.name}</span>
                              <span className="text-[#ff9f43] opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right: Lighter Orange CTA Button */}
        <div className="flex items-center gap-3 z-20">
          <div
            className="relative"
            onMouseEnter={() => setRegisterDropdownOpen(true)}
            onMouseLeave={() => setRegisterDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
              className="relative inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#ffaa5b] hover:bg-[#f29338] shadow-md transition-all cursor-pointer focus:outline-none hover:scale-105 active:scale-95"
            >
              <span>{t("register")}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${registerDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Registration Dropdown Box */}
            <AnimatePresence>
              {registerDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full right-0 pt-2.5 w-64 z-50"
                >
                  <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200/80 shadow-2xl p-2 space-y-1.5 text-left">
                    <Link
                      href="/visitor-register"
                      onClick={() => setRegisterDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#004aab]/15 text-[#004aab] flex items-center justify-center shrink-0 border border-[#004aab]/25">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#004aab] transition-colors">
                          {tCommon("visitorRegistration")}
                        </div>
                        <div className="text-[10px] text-gray-500">{t("visitorPass")}</div>
                      </div>
                    </Link>

                    <Link
                      href="/book-your-stall"
                      onClick={() => setRegisterDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50/70 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ff9f43]/15 text-[#ff9f43] flex items-center justify-center shrink-0 border border-[#ff9f43]/25">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#ff9f43] transition-colors">
                          {tCommon("bookBooth")}
                        </div>
                        <div className="text-[10px] text-gray-500">{t("exhibitorSpace")}</div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-full text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden w-full bg-white/98 backdrop-blur-2xl border-b border-gray-200 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="space-y-1">
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-1.5 text-base font-bold text-gray-900 hover:text-[#ff9f43]"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-3 border-l border-gray-200 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-gray-600 hover:text-gray-950"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-2.5">
              <Link
                href="/visitor-register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#004aab] hover:bg-[#003c8c] transition-colors"
              >
                <Ticket className="w-4 h-4" />
                <span>{tCommon("visitorRegistration")}</span>
              </Link>
              <Link
                href="/book-your-stall"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#ffaa5b] hover:bg-[#f29338] transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>{tCommon("bookBooth")}</span>
              </Link>
            </div>

            {/* Mobile Social Links */}
            <div className="pt-2 flex items-center justify-center gap-4 text-gray-600">
              <a
                href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-100 border border-gray-200 hover:border-[#ff9f43] hover:text-[#ff9f43] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com/IMD2027"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="p-2 rounded-full bg-gray-100 border border-gray-200 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@MushroomExchange"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-gray-100 border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
