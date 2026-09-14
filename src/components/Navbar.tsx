"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Ticket, Store, Calendar } from "lucide-react";
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
      { name: "About The Movement", href: "/#about", desc: "India's premier edible fungi ecosystem" },
      { name: "Shroom Connect Conclave", href: "/#about-shroomconnect", desc: "National B2B & Deal-Making Conclave" },
      { name: "Organising Committee", href: "/#organising-committee", desc: "Visionary leaders & mycology council" },
      { name: "Our Strength & Scale", href: "/#our-strength", desc: "5,000+ delegates & global impact" },
    ],
  },
  {
    name: "Value Chain",
    href: "/#industry-chain",
    dropdown: [
      { name: "Button Mushroom Backbone", href: "/#industry-chain", desc: "Commercial Phase I–III CEA production" },
      { name: "6 Specialty Sectors", href: "/#specialty-sectors", desc: "Oyster, Shiitake, Cordyceps & Exotics" },
      { name: "Why Indian Mushroom Days", href: "/#why-join", desc: "6 strategic reasons to participate" },
    ],
  },
  {
    name: "Program",
    href: "/#program-agenda",
    dropdown: [
      { name: "3-Day Program Agenda", href: "/#program-agenda", desc: "Discover • Innovate • Grow" },
      { name: "Mushroom Exchange & Buyer Club", href: "/#buyer-club", desc: "Direct supermarket & institutional linkages" },
    ],
  },
  {
    name: "Partners & Expo",
    href: "/#past-sponsors",
    dropdown: [
      { name: "Strategic Partners", href: "/#past-sponsors", desc: "Milkyway, UAS Bangalore & Mushex" },
      { name: "Exhibitors Showcase", href: "/#exhibitors", desc: "100+ technology & spawn corporations" },
    ],
  },
  {
    name: "Media",
    href: "/#gallery",
    dropdown: [
      { name: "Visual Chronicle (Gallery)", href: "/#gallery", desc: "Inauguration & trade floor highlights" },
      { name: "Industry Testimonials", href: "/#testimonials", desc: "Reviews from dignitaries & growers" },
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
        "program-agenda": "Program",
        "buyer-club": "Program",
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
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-none">
      {/* Full width container with no borders and no backgrounds */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between relative">
        {/* Big Logo on Left Side */}
        <div className="flex-shrink-0 z-20 flex items-center">
          <Link href="/#home" className="flex items-center group focus:outline-none" aria-label="Indian Mushroom Days 2027 Homepage">
            <img
              src="/reallogo.png"
              alt="Indian Mushroom Days 2027 Logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain rounded-full shadow-2xl drop-shadow-xl hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Full Centered Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-2.5 xl:space-x-5 absolute left-1/2 -translate-x-1/2 z-20">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
            const isActive = activeSection === item.name;

            if (!hasDropdown) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-sm xl:text-base font-bold transition-all duration-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%),_0_2px_8px_rgb(0_0_0_/_60%)] group whitespace-nowrap ${
                    isActive
                      ? "text-white font-black"
                      : "text-white hover:text-[#f28822]"
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`absolute -bottom-0.5 left-2 right-2 h-0.5 bg-[#f28822] rounded-full transition-all duration-200 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
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
                  className={`relative px-3.5 py-2 text-sm xl:text-base font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-none [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%),_0_2px_8px_rgb(0_0_0_/_60%)] group whitespace-nowrap ${
                    isActive
                      ? "text-white font-black"
                      : "text-white hover:text-[#f28822]"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180 text-[#f28822]" : "text-white/80"
                    }`}
                  />
                  <span
                    className={`absolute -bottom-0.5 left-2 right-2 h-0.5 bg-[#f28822] rounded-full transition-all duration-200 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
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
                      <div className="rounded-2xl bg-[#0b141e]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2.5 space-y-1">
                        {item.dropdown?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#f28822] transition-colors flex items-center justify-between">
                              <span>{sub.name}</span>
                              <span className="text-[#f28822] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                            </div>
                            {sub.desc && (
                              <p className="text-[11px] text-gray-300 mt-0.5 line-clamp-1 leading-snug">
                                {sub.desc}
                              </p>
                            )}
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

        {/* Right Register Button (as it is now) */}
        <div className="flex items-center gap-3 z-20">
          <div
            className="relative"
            onMouseEnter={() => setRegisterDropdownOpen(true)}
            onMouseLeave={() => setRegisterDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
              className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#f28822] to-[#e07512] hover:brightness-110 shadow-lg shadow-black/30 transition-all cursor-pointer focus:outline-none hover:scale-105 active:scale-95"
            >
              <span>Register</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  registerDropdownOpen ? "rotate-180" : ""
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
                  <div className="rounded-2xl bg-[#0b141e]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 space-y-1.5 text-left">
                    <Link
                      href="/visitor-register"
                      onClick={() => setRegisterDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#84c52c]/20 text-[#84c52c] flex items-center justify-center shrink-0 border border-[#84c52c]/30">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#84c52c] transition-colors">
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
                      <div className="w-8 h-8 rounded-lg bg-[#f28822]/20 text-[#f28822] flex items-center justify-center shrink-0 border border-[#f28822]/30">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#f28822] transition-colors">
                          Book Your Stall
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
            className="lg:hidden w-full bg-[#0b141e]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#84c52c]">
                <Calendar className="w-4 h-4" />
                <span>February 19–21, 2027</span>
              </div>
              <span className="text-xs text-amber-200 font-semibold">New Delhi, India</span>
            </div>

            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-1.5 text-base font-bold text-white hover:text-[#f28822]"
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
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#84c52c] hover:bg-[#73ad24] transition-colors"
              >
                <Ticket className="w-4 h-4" />
                <span>Visitor Registration</span>
              </Link>
              <Link
                href="/book-your-stall"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-[#f28822] hover:bg-[#d97517] transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Book Your Stall (Exhibitor)</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
