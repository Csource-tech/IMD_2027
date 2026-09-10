
export default function BuyerClubSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expanded 50/50 Split Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200/90 shadow-xl rounded-2xl overflow-hidden bg-white">
          {/* Left Column: Spacious Minimalist Info */}
          <div className="md:col-span-7 bg-white p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500">
              2027 Must-Attend Mushroom Industry Gathering
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-950 tracking-tight leading-[1.15]">
              India Mushroom Days <br />
              2027 (IMD 2027)
            </h2>

            <p className="text-sm sm:text-base md:text-[17px] text-gray-600 leading-relaxed">
              Designed for decision-makers and sourcing professionals, this program helps you navigate the exhibition efficiently—especially if you are attending for the first time or returning after several years.
            </p>

            <div className="pt-2 space-y-4">
              <strong className="block text-sm sm:text-base md:text-lg font-bold text-gray-950">
                Buyer Club members receive:
              </strong>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>Guided sourcing tour tailored to your business needs</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>Access to the International Buyer Lounge</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2546e5] font-black text-xs">
                    ✓
                  </span>
                  <span>VIP Pass and pre-show and on-site support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Fresh Green with Large Circular Photo */}
          <div className="md:col-span-5 bg-[#84c52c] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center text-white">
            {/* Larger Circular Delegation Photo */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/70 shadow-xl mb-6 bg-white/20 shrink-0">
              <img
                src="/imdgallery/imd-2024-010.jpg"
                alt="Buyer Club Delegation at Indian Mushroom Days"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm sm:text-base font-medium text-white/95 leading-snug max-w-xs sm:max-w-sm">
              Make your visit more efficient, comfortable, and productive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


