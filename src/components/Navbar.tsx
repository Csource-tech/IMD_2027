"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Ticket, Store, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubLink {
  name: string;
  href: string;
  desc?: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: SubLink[];
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/#home" },
  {
    name: "About",
    href: "/#about",
    dropdown: [
      { name: "About The Movement", href: "/#about" },
      { name: "Shroom Connect Conclave", href: "/#about-shroomconnect" },
      { name: "Organising Committee", href: "/#organising-committee" },
      { name: "Our Strength & Scale", href: "/#our-strength" },
    ],
  },
  {
    name: "Value Chain",
    href: "/#industry-chain",
    dropdown: [
      { name: "Button Mushroom Backbone", href: "/#industry-chain" },
      { name: "6 Specialty Sectors", href: "/#specialty-sectors" },
      { name: "Why Indian Mushroom Days", href: "/#why-join" },
      { name: "Mushroom Exchange & Buyer Club", href: "/#buyer-club" },

    ],
  },
  {
    name: "Partners & Expo",
    href: "/#past-sponsors",
    dropdown: [
      { name: "Strategic Partners", href: "/#past-sponsors" },
      { name: "Exhibitors Showcase", href: "/#exhibitors" },
    ],
  },
  {
    name: "Media",
    href: "/#gallery",
    dropdown: [
      { name: "Visual Chronicle (Gallery)", href: "/#gallery" },
      { name: "Industry Testimonials", href: "/#testimonials" },
    ],
  },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isSubPage = pathname ? pathname !== "/" : false;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

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
    <header className="relative z-40 w-full shadow-md">
      {/* 1. Upper Lighter Orange Utility Banner */}
      <div className="w-full bg-[#ff9f43] text-white text-xs font-semibold py-2 px-4 sm:px-8 lg:px-12 flex items-center justify-between shadow-sm">
        {/* Left: Location, Helpline & Email */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-5">
          <div className="flex items-center gap-1.5 text-white/95">
            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
            <span>New Delhi, India</span>
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5 text-white/95">
            <Phone className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Hot Line: <a href="tel:+918860115588" className="hover:underline font-bold">+91 88601 15588</a> / <a href="tel:+919810726996" className="hover:underline font-bold">+91 98107 26996</a></span>
          </div>
          <span className="hidden md:inline text-white/40">•</span>
          <div className="hidden md:flex items-center gap-1.5 text-white/95">
            <Mail className="w-3.5 h-3.5 text-white shrink-0" />
            <a href="mailto:reachout@mushex.in" className="hover:underline font-medium">reachout@mushex.in</a>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3 text-white/90">
          <a href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors hover:scale-110">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://x.com/IMD2027" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="hover:text-white transition-colors hover:scale-110">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://www.youtube.com/@MushroomExchange" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors hover:scale-110">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
        </div>
      </div>

      {/* 2. Main Lighter Translucent Navbar */}
      <div className="w-full bg-[#1e2a38]/80 backdrop-blur-xl border-b border-white/15 px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between relative shadow-lg">
        {/* Left: Dual Logos (IMD 2027 & Shroom Connect) */}
        <div className="flex-shrink-0 z-20 flex items-center">
          <Link href="/#home" className="flex items-center gap-2 sm:gap-3 group focus:outline-none" aria-label="Indian Mushroom Days 2027 & Shroom Connect Homepage">
            <img
              src="/reallogo.png"
              alt="Indian Mushroom Days 2027 Logo"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain rounded-full shadow-lg drop-shadow hover:scale-105 transition-transform ring-1 ring-white/10"
            />
            <div className="h-6 sm:h-8 w-px bg-white/20" />
            <img
              src="/shroomlogo.jpeg"
              alt="Shroom Connect Logo"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain rounded-full shadow-lg drop-shadow hover:scale-105 transition-transform ring-1 ring-white/10"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-3 absolute left-1/2 -translate-x-1/2 z-20">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
            const isActive = activeSection === item.name;

            if (!hasDropdown) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-xs xl:text-sm uppercase tracking-wider font-bold transition-all duration-200 group whitespace-nowrap ${isActive
                    ? "text-[#ff9f43]"
                    : "text-gray-200 hover:text-[#ff9f43]"
                    }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#ff9f43] rounded-full transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              );
            }

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-xs xl:text-sm uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer focus:outline-none group whitespace-nowrap ${isActive
                    ? "text-[#ff9f43]"
                    : "text-gray-200 hover:text-[#ff9f43]"
                    }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180 text-[#ff9f43]" : "text-gray-400 group-hover:text-[#ff9f43]"
                      }`}
                  />
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#ff9f43] rounded-full transition-all duration-200 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                  />
                </Link>

                {/* Dropdown Menu Box */}
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-72 z-50"
                    >
                      <div className="rounded-2xl bg-[#1e2a38]/95 backdrop-blur-xl border border-white/20 shadow-2xl p-2 space-y-1">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#ffaa5b] transition-colors flex items-center justify-between">
                              <span>{sub.name}</span>
                              <span className="text-[#ffaa5b] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
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
              className="relative inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#ffaa5b] hover:bg-[#f29338] shadow-lg shadow-black/20 transition-all cursor-pointer focus:outline-none hover:scale-105 active:scale-95"
            >
              <span>Register</span>
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
                  <div className="rounded-2xl bg-[#1e2a38]/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-2 space-y-1.5 text-left">
                    <Link
                      href="/visitor-register"
                      onClick={() => setRegisterDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#004aab]/20 text-[#004aab] flex items-center justify-center shrink-0 border border-[#004aab]/30">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#004aab] transition-colors">
                          Visitor Registration
                        </div>
                        <div className="text-[10px] text-gray-300">Entry pass &amp; expo badge</div>
                      </div>
                    </Link>

                    <Link
                      href="/book-your-stall"
                      onClick={() => setRegisterDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ff9f43]/20 text-[#ff9f43] flex items-center justify-center shrink-0 border border-[#ff9f43]/30">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#ff9f43] transition-colors">
                          Book Your Booth
                        </div>
                        <div className="text-[10px] text-gray-300">Exhibitor space reservation</div>
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
              className="p-2 rounded-full text-white bg-black/40 hover:bg-black/60 transition-colors focus:outline-none"
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
            className="lg:hidden w-full bg-[#1e2a38]/98 backdrop-blur-2xl border-b border-white/15 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Dual Logos & Event Info in Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src="/reallogo.png"
                  alt="Indian Mushroom Days 2027"
                  className="h-10 w-auto object-contain rounded-full ring-1 ring-white/15"
                />
                <div className="h-6 w-px bg-white/20" />
                <img
                  src="/shroomlogo.jpeg"
                  alt="Shroom Connect"
                  className="h-10 w-auto object-contain rounded-full ring-1 ring-white/15"
                />
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-[#ff9f43]">Feb 19–21, 2027</div>
                <div className="text-[10px] text-gray-300">New Delhi, India</div>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-1.5 text-base font-bold text-white hover:text-[#ff9f43]"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-3 border-l border-white/10 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-gray-300 hover:text-white"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <Link
                href="/visitor-register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#004aab] hover:bg-[#003c8c] transition-colors"
              >
                <Ticket className="w-4 h-4" />
                <span>Visitor Registration</span>
              </Link>
              <Link
                href="/book-your-stall"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#ffaa5b] hover:bg-[#f29338] transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Book Your Booth (Exhibitor)</span>
              </Link>
            </div>

            {/* Mobile Social Links */}
            <div className="pt-2 flex items-center justify-center gap-4 text-white/80">
              <a
                href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ff9f43] hover:text-[#ff9f43] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a
                href="https://x.com/IMD2027"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@MushroomExchange"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
