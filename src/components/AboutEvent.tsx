import { CalendarDays, MapPin } from "lucide-react";

export default function AboutEvent() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[474px_minmax(0,1fr)] lg:gap-16">
        <img
          src="/imdgallery/imd-2024-002-inauguration.png"
          alt="Inauguration Ceremony at Indian Mushroom Days"
          className="mx-auto h-[420px] w-full max-w-[474px] rounded-[20px] object-cover object-center shadow-sm sm:h-[500px] lg:h-[528px]"
        />

        <div className="min-w-0">
          <div className="mb-6 flex items-start gap-1 text-[#f28822]">
            <span className="text-2xl font-bold sm:text-3xl">About The Event</span>
            <svg className="mt-1 h-12 w-28 shrink-0 text-[#ff4e25]" viewBox="0 0 120 52" fill="none" aria-hidden="true">
              <path d="M2 23C25-6 60-5 60 17c0 14-16 13-13 2 2-9 18-8 25 3 5 8 5 16 7 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="m72 46 8-2-2-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="text-[30px] font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-[42px] sm:leading-tight">
            Indian Mushroom Days 2027 (IMD 2027)
          </h2>

          <p className="mt-8 text-base leading-[1.32] text-slate-600 sm:text-lg">
            As India&apos;s premier international edible fungi expo, more than <a className="font-medium text-[#2c29e4] underline" href="#registration">3000</a> delegates and industry professionals attend the conference, including government leaders, agricultural scientists, industry experts and scholars, leading edible fungi production enterprises, professional supermarket and catering buyers, and representatives of <a className="font-medium text-[#2c29e4] underline" href="#industry-chain">upstream</a> and <a className="font-medium text-[#2c29e4] underline" href="#industry-chain">downstream</a> enterprises across the mushroom industry chain. Together, we create a premier interactive platform of &quot;government, industry, academia, research, application and retail&quot; to foster cross-sector growth and innovation with mushrooms at the core.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-orange-100 pt-6 sm:grid-cols-2">
            <InfoItem icon={<CalendarDays className="h-8 w-8 stroke-[#ff5b3c]" aria-hidden="true" />} label="Date" value="February 19-21, 2027" />
            <InfoItem
              icon={<MapPin className="h-8 w-8 stroke-[#ff5b3c]" aria-hidden="true" />}
              label="Venue"
              value="Delhi, India"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#fff0eb]">{icon}</span>
      <div>
        <div className="text-xl font-medium text-black">{label}</div>
        <div className="mt-1 text-base leading-tight text-slate-500">{value}</div>
      </div>
    </div>
  );
}
