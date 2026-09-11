import { User } from "lucide-react";

interface CommitteeMember {
  name: string;
  role: string;
  org: string;
  image?: string;
  founderBadge?: boolean;
}

const MEMBERS: CommitteeMember[] = [
  {
    name: "Late Atul Saxena",
    role: "Founder & Visionary",
    org: "Mushroom Exchange & IMD",
    image: "", // Placeholder for photo to be added later
    founderBadge: true,
  },
  {
    name: "Ms. Pinky Malhotra",
    role: "Core Leadership & Secretariat",
    org: "India Mushroom Days Board",
    image: "", // Placeholder for photo to be added later
  },
  {
    name: "Anurag Saxena",
    role: "Chief Advisor",
    org: "Founder — Milkyway Spawn",
    image: "", // Placeholder for photo to be added later
  },
  {
    name: "Dr. Loveleet Rana",
    role: "Technical & Mycology Expert",
    org: "Mushroom Specialist, HP",
    image: "", // Placeholder for photo to be added later
  },
  {
    name: "Er. Sanjeev Verma",
    role: "Agri-Tech & Climate Systems",
    org: "CEA & Farm Automation Lead",
    image: "", // Placeholder for photo to be added later
  },
];

export default function OrganisingCommittee() {
  return (
    <section id="organising-committee" className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 text-center">
        {/* Section Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Organising Committee
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Guided by visionary founders, spawn innovators, and veteran mycology experts pioneering the future of Indian mushroom cultivation.
          </p>
        </div>

        {/* 5 Member Cards with Uniform Circular Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-7">
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-orange-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Circular Avatar Placeholder */}
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/90 border-2 border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-[#f28822] transition-colors">
                      <User className="w-11 h-11 stroke-[1.5]" />
                    </div>
                  )}
                </div>

                {member.founderBadge && (
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#f28822] text-white text-[10px] font-bold uppercase tracking-wider shadow whitespace-nowrap flex items-center gap-1">
                    <span>♥</span> FOUNDER
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-base sm:text-lg font-bold text-gray-950 mt-2 group-hover:text-[#f28822] transition-colors leading-snug">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-xs sm:text-sm font-semibold text-[#84c52c] mt-1.5">
                {member.role}
              </p>

              {/* Organization */}
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {member.org}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
