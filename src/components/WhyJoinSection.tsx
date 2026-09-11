"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabItem {
  title: string;
  desc: string;
  image: string;
}

const TABS: TabItem[] = [
  {
    title: "GROW YOUR BUSINESS",
    desc: "Unlock opportunities and expand your presence in the fast-growing Indian and global edible fungi market.",
    image: "/imdgallery/imd-2024-001.jpg",
  },
  {
    title: "DISCOVER THE LATEST INNOVATIONS",
    desc: "Explore new technologies, automated CEA climate chambers, and smart solutions shaping the future of mushroom cultivation.",
    image: "/imdgallery/imd-2024-004.jpg",
  },
  {
    title: "BUILD YOUR NETWORK",
    desc: "Connect with international suppliers, buyers, distributors, and industry professionals across India and globally.",
    image: "/imdgallery/imd-2024-015.jpg",
  },
  {
    title: "ENGAGE GLOBAL MYCOLOGISTS",
    desc: "Gain scientific insights from 50+ world-class mycology experts, spawn researchers, and commercial growers.",
    image: "/imdgallery/imd-2024-011.jpg",
  },
  {
    title: "SHROOMCONNECT B2B MATCHMAKING",
    desc: "Dedicated buyer-seller conclave linking commercial cultivators directly to retail supermarket chains and institutional buyers.",
    image: "/imdgallery/imd-2024-008.jpg",
  },
  {
    title: "GOVERNMENT SUBSIDIES & FINANCE",
    desc: "Firsthand guidance on National Horticulture Board (NHB) subsidies, credit schemes, and turnkey commercial farm setup.",
    image: "/imdgallery/imd-2024-014.jpg",
  },
];

export default function WhyJoinSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="why-join" className="overflow-hidden bg-white pt-16 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 sm:mb-20 max-w-7xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl font-medium text-black sm:text-4xl">
          Why Indian Mushroom Days (IMD 2027)
        </h2>
      </motion.div>

      <div className="bg-[#f7881d]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch lg:grid-cols-[450px_minmax(0,1fr)]">
          {/* Left Column with Tabs - SLIDES IN FROM LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white px-6 py-8 sm:px-10 lg:py-8"
          >
            <div className="relative space-y-5">
              {/* Vertical Dashed Line running exactly through the center of the 25px circles */}
              <div
                className="absolute top-3 bottom-5 left-[11.5px] border-l-2 border-dashed border-blue-300 pointer-events-none z-0"
                aria-hidden="true"
              />

              {TABS.map((tab, index) => {
                const selected = activeTab === index;
                return (
                  <button
                    key={tab.title}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className="group flex w-full items-start gap-4 text-left cursor-pointer relative z-10 transition-transform duration-200 active:scale-[0.98]"
                  >
                    {/* Circle Indicator */}
                    <span
                      className={`relative flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full border bg-white shadow-xs transition-colors duration-200 ${
                        selected ? "border-[#0877ff]" : "border-slate-900"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-transform duration-200 ${
                          selected ? "bg-[#0877ff] scale-110" : "bg-slate-900"
                        }`}
                      />
                    </span>

                    {/* Text Details */}
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                          selected ? "text-[#0877ff]" : "text-slate-900 group-hover:text-[#0877ff]"
                        }`}
                      >
                        {tab.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-600">
                        {tab.desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Active Tab Image - SLIDES IN FROM RIGHT + ANIMATES ON TAB CHANGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center px-5 py-8 lg:px-0 lg:py-0 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={TABS[activeTab].image}
                src={TABS[activeTab].image}
                alt={TABS[activeTab].title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-auto w-full max-w-[592px] rounded-[13px] object-cover shadow-xl lg:-my-6 lg:min-h-[560px]"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
