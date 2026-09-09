"use client";

import { useState } from "react";

interface TabItem { title: string; desc: string; image: string }

const TABS: TabItem[] = [
  { title: "GROW YOUR BUSINESS", desc: "Unlock opportunities and expand your presence in the fast-growing Indian and global edible fungi market.", image: "https://oss.matchpages.cn/matchpages/common/2026/0706/9398/6a4b50613df13/FTZI1184_1370672142-3571460944.png" },
  { title: "DISCOVER THE LATEST INNOVATIONS", desc: "Explore new technologies, materials, and smart solutions shaping the future of mushroom and food industry.", image: "https://oss.matchpages.cn/matchpages/common/2026/0706/6372/6a4b5253bf73a/FTZI1830_1370672142-3571554229.png" },
  { title: "BUILD YOUR NETWORK", desc: "Connect with international suppliers, buyers, distributors, and industry professionals. Expand your business network and develop valuable partnerships in India and globally.", image: "https://oss.matchpages.cn/matchpages/common/2026/0706/3047/6a4b5270854cc/FTZI1111_1370672142-3571462321.png" },
  { title: "ENGAGE GLOBAL", desc: "Gain insights from industry leaders and exchange ideas that could lead to the next big breakthrough.", image: "https://oss.matchpages.cn/matchpages/common/2026/0703/8817/6a478cf84276e/%E9%9B%86%E7%BE%A4%E4%B8%89%EF%BC%9A%E5%8C%BA%E5%9F%9F%E7%89%B9%E8%89%B2%E4%B8%8E%E5%85%A8%E7%90%83%E8%B4%B8%E6%98%93%E9%9B%86%E7%BE%A402-min.png" },
];

export default function WhyJoinSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="why-join" className="overflow-hidden bg-white pt-16 sm:pt-24">
      <div className="mx-auto mb-24 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl font-medium text-black sm:text-4xl">Why Indian Mushroom Days (IMD 2027)</h2>
      </div>

      <div className="bg-[#f7881d]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch lg:grid-cols-[432px_minmax(0,1fr)]">
          <div className="relative bg-white px-8 py-10 sm:px-14 lg:py-9">
            <div className="absolute bottom-12 left-[84px] top-12 border-l-2 border-dashed border-blue-300" aria-hidden="true" />
            <div className="relative space-y-7">
              {TABS.map((tab, index) => {
                const selected = activeTab === index;
                return (
                  <button key={tab.title} type="button" onClick={() => setActiveTab(index)} className="group flex w-full items-start gap-4 text-left">
                    <span className={`relative z-10 mt-1 flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#0877ff] bg-white" : "border-slate-900 bg-white"}`}>
                      <span className={`h-2.5 w-2.5 rounded-full ${selected ? "bg-[#0877ff]" : "bg-slate-900"}`} />
                    </span>
                    <span>
                      <span className={`block text-sm font-medium transition-colors ${selected ? "text-[#0877ff]" : "text-slate-900 group-hover:text-[#0877ff]"}`}>{tab.title}</span>
                      <span className="mt-1 block max-w-[235px] text-sm leading-[1.45] text-slate-600">{tab.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center px-5 py-8 lg:px-0 lg:py-0">
            <img key={TABS[activeTab].image} src={TABS[activeTab].image} alt={TABS[activeTab].title} className="h-auto w-full max-w-[592px] rounded-[13px] object-cover shadow-xl lg:-my-6 lg:min-h-[592px] lg:animate-in lg:fade-in" />
          </div>
        </div>
      </div>
    </section>
  );
}
