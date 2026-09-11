export default function BuyerClubSection() {
  return (
    <section id="buyer-club" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Expanded 50/50 Split Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200/90 shadow-xl rounded-3xl overflow-hidden bg-white">
          {/* Left Column: Mushroom Exchange Details */}
          <div className="md:col-span-7 bg-white p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f28822]">
              Global Value-Chain &amp; Industry Platform
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-950 tracking-tight leading-[1.15]">
              Mushroom Exchange <br />
              <span className="text-[#84c52c]">&amp; B2B Network</span>
            </h2>

            <p className="text-sm sm:text-base md:text-[17px] text-gray-600 leading-relaxed">
              India&apos;s collaborative value-chain hub connecting progressive growers, spawn laboratories,
              biotechnology innovators, and institutional buyers. Mushroom Exchange bridges cultivators directly
              with national supermarket chains, food processing companies, and global export channels.
            </p>

            <div className="pt-2 space-y-4">
              <strong className="block text-sm sm:text-base md:text-lg font-bold text-gray-950">
                Mushroom Exchange Platform benefits:
              </strong>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>Direct B2B market linkage with retail chains &amp; institutional buyers</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>Verified spawn technology, substrate &amp; cultivation supplies network</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>Transparent trade facilitation, export support &amp; cold-chain connectivity</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Fresh Green with Large Circular Mushroom Exchange Logo */}
          <div className="md:col-span-5 bg-[#84c52c] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center text-white">
            {/* Circular Logo Container */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl mb-6 bg-white p-6 flex items-center justify-center shrink-0">
              <img
                src="/mushroom-exchange.webp"
                alt="Mushroom Exchange Official Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-sm sm:text-base font-semibold text-white/95 leading-snug max-w-xs sm:max-w-sm">
              Empowering growers, traders, and institutional buyers across India&apos;s edible fungi value chain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
