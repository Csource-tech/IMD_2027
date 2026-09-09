"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Why Join", href: "#why-join" },
  { name: "Core Values", href: "#our-strength" },
  { name: "Full Industry Chain", href: "#industry-chain" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 140) {
          const match = NAV_LINKS.find((l) => l.href === `#${section}`);
          if (match) setActiveSection(match.name);
          break;
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("Home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-black/55 backdrop-blur-sm shadow-md py-6 text-white"
        : "bg-transparent py-5 text-white"
        }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 flex items-center justify-between relative">
        {/* Brand Logo - Left Aligned */}
        <div className="flex-shrink-0 z-10">
          <Link href="#home" className="flex items-center space-x-3 focus:outline-none">
            <img
              src="/reallogo.png"
              alt="Indian Mushroom Days 2027 Logo"
              className="h-11 sm:h-18 w-auto object-contain rounded-full shadow-md drop-shadow hover:scale-105 transition-transform"
            />

          </Link>
        </div>

        {/* Centered Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 absolute inset-x-0 mx-auto w-fit z-0">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-1 text-sm lg:text-base font-medium text-white transition-colors group"
              >
                {/* Text is always pure white */}
                <span className="text-white">{link.name}</span>

                {/* Orange underline on active OR on hover */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f28822] rounded-full transition-all duration-200 ${isActive
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Balance Spacer for Desktop & Mobile Toggle Button */}
        <div className="flex items-center z-10">
          <div className="hidden md:block w-12 h-10" />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-xl px-6 pt-3 pb-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveSection(link.name);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-base font-medium text-white hover:text-[#f28822]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
