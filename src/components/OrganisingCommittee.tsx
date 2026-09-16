"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SectionDivider from "./SectionDivider";

interface CommitteeMember {
  name: string;
  role: string;
  org: string;
  image: string;
  isFounder?: boolean;
}

const MEMBERS: CommitteeMember[] = [
  {
    name: "Late Atul Saxena",
    role: "Founder & Visionary",
    org: "Mushroom Exchange & Indian Mushroom Days",
    image: "/committee/atul.png",
    isFounder: true,
  },
  {
    name: "Ms. Pinky Malhotra",
    role: "Core Leadership & Secretariat",
    org: "India Mushroom Days Board",
    image: "/committee/pinky.png",
  },
  {
    name: "Anurag Saxena",
    role: "Chief Advisor",
    org: "Founder — Milkyway Spawn Technologies",
    image: "/committee/anurag.png",
  },
  {
    name: "Dr. Loveleet Rana",
    role: "Technical & Mycology Expert",
    org: "Veteran Mushroom Specialist, HP",
    image: "/committee/loveleet.png",
  },
  {
    name: "Er. Sanjeev Verma",
    role: "Agri-Tech & Climate Systems",
    org: "CEA Automation & Farm Engineering Lead",
    image: "/committee/sanjeev.png",
  },
];

export default function OrganisingCommittee() {
  return (
    <section
      id="organising-committee"
      className="relative py-14 sm:py-20 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
          >
            Organising Committee
          </motion.h2>
        </div>

        {/* 5 Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 items-stretch">
          {MEMBERS.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center text-center group cursor-default ${
                member.isFounder
                  ? "bg-gradient-to-b from-white via-orange-50/20 to-white border-orange-200/90 shadow-xl"
                  : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300"
              }`}
            >
              {/* Portrait Photo Container */}
              <div className="relative mb-5">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#ff9f43] shadow-md transition-all duration-300 group-hover:scale-105 bg-slate-100 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:brightness-105 transition-all"
                  />
                </div>

                {member.isFounder && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#ff9f43] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 fill-white" />
                    <span>FOUNDER</span>
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#ff9f43] transition-colors leading-snug">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-xs font-semibold text-[#004aab] mt-1.5 leading-snug">
                {member.role}
              </p>

              {/* Organization */}
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                {member.org}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
