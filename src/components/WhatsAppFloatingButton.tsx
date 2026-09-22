"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloatingButton() {
  const phoneNumber = "918860115588";
  const message = encodeURIComponent(
    "Hello India Mushroom Days 2027 Secretariat, I would like to inquire about the event / booth booking."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp Secretariat Chat" className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
      <div className="relative group flex items-center">
        {/* Floating Tooltip Pill (visible on desktop hover only, zero permanent space) */}
        <div className="absolute right-full mr-2.5 hidden sm:flex items-center opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none transition-all duration-200 ease-out whitespace-nowrap">
          <div className="px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg border border-white/10 flex items-center gap-1.5">
            <span>WhatsApp Us</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          </div>
          {/* Subtle arrow pointer */}
          <div className="w-1.5 h-1.5 bg-slate-900/90 rotate-45 -ml-1 border-r border-t border-white/10" />
        </div>

        {/* Compact Circular Floating Action Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          aria-label="Chat with Secretariat on WhatsApp (+91 88601 15588)"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.55)] transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
        >
          {/* WhatsApp Vector Icon */}
          <svg
            viewBox="0 0 32 32"
            className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-white shrink-0"
            aria-hidden="true"
          >
            <path d="M16 2C8.28 2 2 8.28 2 16c0 2.76.8 5.34 2.18 7.52L2.5 29.5l6.19-1.63C10.8 29.17 13.33 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm8.19 19.81c-.34.96-1.7 1.84-2.77 2.07-.74.15-1.7.28-4.94-1.06-4.15-1.72-6.83-5.95-7.04-6.22-.2-.28-1.7-2.27-1.7-4.32s1.08-3.07 1.46-3.49c.39-.42.85-.53 1.13-.53.28 0 .57 0 .82.02.26.02.61-.1.95.72.35.85 1.2 2.92 1.3 3.13.11.21.18.46.04.74-.14.28-.21.46-.42.71-.21.25-.45.56-.64.75-.22.21-.45.44-.19.88.25.44 1.12 1.85 2.41 3 1.66 1.48 3.06 1.94 3.49 2.15.43.22.68.18.93-.11.25-.28 1.07-1.24 1.35-1.67.28-.42.57-.35.96-.21.39.14 2.48 1.17 2.9 1.38.43.21.71.32.82.49.1.18.1 1.03-.24 1.99z" />
          </svg>

          {/* Subtle Live Online Indicator Dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </span>
        </motion.a>
      </div>
    </aside>
  );
}
