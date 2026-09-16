"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloatingButton() {
  const phoneNumber = "918860115588";
  const message = encodeURIComponent(
    "Hello Indian Mushroom Days 2027 Secretariat, I would like to inquire about the event / booth booking."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp Secretariat Chat" className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Chat with Secretariat on WhatsApp (+91 88601 15588)"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Ambient Ring Pulse Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white shrink-0 relative z-10"
          aria-hidden="true"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.76.8 5.34 2.18 7.52L2.5 29.5l6.19-1.63C10.8 29.17 13.33 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm8.19 19.81c-.34.96-1.7 1.84-2.77 2.07-.74.15-1.7.28-4.94-1.06-4.15-1.72-6.83-5.95-7.04-6.22-.2-.28-1.7-2.27-1.7-4.32s1.08-3.07 1.46-3.49c.39-.42.85-.53 1.13-.53.28 0 .57 0 .82.02.26.02.61-.1.95.72.35.85 1.2 2.92 1.3 3.13.11.21.18.46.04.74-.14.28-.21.46-.42.71-.21.25-.45.56-.64.75-.22.21-.45.44-.19.88.25.44 1.12 1.85 2.41 3 1.66 1.48 3.06 1.94 3.49 2.15.43.22.68.18.93-.11.25-.28 1.07-1.24 1.35-1.67.28-.42.57-.35.96-.21.39.14 2.48 1.17 2.9 1.38.43.21.71.32.82.49.1.18.1 1.03-.24 1.99z" />
        </svg>

        {/* Text visible on tablet/desktop */}
        <span className="hidden sm:inline-block font-sans font-bold text-xs uppercase tracking-wider pr-1 relative z-10 select-none">
          WhatsApp Us
        </span>
      </motion.a>
    </aside>
  );
}
