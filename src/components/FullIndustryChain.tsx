export default function FullIndustryChain() {
  return (
    <section id="industry-chain" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center sm:text-left mb-16">
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight pb-3">
              Full Industry Chain Coverage
            </h2>
            <div className="h-1 w-24 bg-[#f28822] rounded-full" />
          </div>
        </div>

        {/* 3 Zig-Zag Sections */}
        <div className="space-y-16 sm:space-y-20">
          {/* Row 1: Production (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 group">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2026/0622/6819/6a38990d48770/FTZI1346_1370672142-3571473851.png"
                  alt="Production"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2020/0514/5ebcab1ee50cf.png"
                  alt="Production Icon"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Production
                </h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                <span className="text-[#2c29e4] underline font-semibold">
                  Covers full-set mushroom cultivation supplies
                </span>
                : automated growing equipment, intelligent greenhouse environmental control systems, strain breeding &amp; R&amp;D, culture medium, casing soil, greenhouse supporting facilities, ventilation &amp; humidification devices. Connect large-scale industrial mushroom farms, planting bases and factory growers worldwide to source complete modern cultivation solutions.
              </p>
            </div>
          </div>

          {/* Row 2: International Trading (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2020/0513/5ebb605c9931b.png"
                  alt="International Trading Icon"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  International Trading
                </h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                <span className="text-[#2c29e4] underline font-semibold">
                  Gather buyers over 20 countries &amp; regions.
                </span>{" "}
                From Belt &amp; Road regions, cross-border e-commerce platforms, import &amp; export merchants, supermarket buyers and catering supply chain distributors. Display fresh mushrooms, dried fungi, bulk raw mushroom materials and gift sets, build two-way domestic &amp; overseas sales channels to expand global distribution orders.
              </p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 group">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2026/0622/4317/6a38998d6e9d1/FTZI1111_1370672142-3571462321.png"
                  alt="International Trading"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Deep Processing (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 group">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2026/0622/3613/6a389a1dcaf46/LHAO9366.png"
                  alt="Deep Processing"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2020/0513/5ebb605c9931b.png"
                  alt="Deep Processing Icon"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Deep Processing
                </h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                <span className="text-[#2c29e4] underline font-semibold">
                  Extends the value chain of edible fungi
                </span>{" "}
                from raw materials to finished consumer goods. Include mushroom freeze-drying machinery, ready-to-cook mushroom meals, instant mushroom snacks, mushroom seasonings, fungus extract health supplements and functional edible fungi products. Link food manufacturers, health food brands and catering R&amp;D teams to tap high value-added deep processing market opportunities.
              </p>
              <div className="inline-flex items-center gap-2 pt-2 text-xs sm:text-sm font-semibold text-[#f28822]">
                <span>Freeze-drying</span>
                <span>•</span>
                <span>Ready-to-eat dishes</span>
                <span>•</span>
                <span>Health food solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
