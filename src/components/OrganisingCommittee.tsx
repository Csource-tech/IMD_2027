"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

interface CommitteeMember {
  name: string;
  role: string;
  org: string;
  image: string;
  imagePosition?: string;
  isFounder?: boolean;
}


const MEMBERS: CommitteeMember[] = [
  {
    name: "Dr. Sunil Kumar Srivastava",
    role: "Organising Committee Member",
    org: "Former Principal Scientist, ICAR-DMR",
    image: "/organisers/sunilsrivastava.jfif",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Loveleet Rana",
    role: "Technical & Mycology Expert",
    org: "Mushroom Specialist, HP",
    image: "/organisers/loveleet.jpeg",
    imagePosition: "object-top",
  },
  {
    name: "Dr. MP Thakur",
    role: "Senior Mycologist & Advisor",
    org: "Former Dean & Director of Extension, IGKV",
    image: "/organisers/mpthakur.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Manjit Singh",
    role: "Senior Scientist & Advisor",
    org: "Former Director, ICAR-DMR Solan",
    image: "/organisers/manjitsingh.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. RP Tewari",
    role: "Veteran Mushroom Specialist",
    org: "Former Director, ICAR-DMR Solan",
    image: "/organisers/rptiwari.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Arvind Rabba",
    role: "Commercial Cultivation Specialist",
    org: "Spawn & Mushroom Industry Expert",
    image: "/organisers/arvindrabba.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Ms. Pinky Malhotra",
    role: "Core Leadership & Secretariat",
    org: "India Mushroom Days Board",
    image: "/organisers/pinkymalhotra.jpeg",
    imagePosition: "object-[center_20%]",
  },
  {
    name: "Mr. Anurag Saxena",
    role: "Chief Advisor",
    org: "Founder — Milkyway Spawn Technologies",
    image: "/organisers/anuragsaxena.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "DK Mazumdar",
    role: "Industry Consultant",
    org: "Commercial Cultivation Technologist",
    image: "/organisers/mazumdar.jfif",
    imagePosition: "object-center",
  },
  {
    name: "Dr. B K Paani",
    role: "Mushroom Research Specialist",
    org: "Eminent Mycologist & Professor, OUAT",
    image: "/organisers/placeholder.svg",
    imagePosition: "object-center",
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
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">

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


        {/* 10 Organizing Committee Members Grid (5 cols on lg, 3 on md, 2 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {MEMBERS.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-[#ff9f43]/60 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
            >
              {/* Portrait Photo Container */}
              <div className="relative mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#ff9f43] shadow-md transition-all duration-300 group-hover:scale-105 bg-slate-100 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.currentTarget;
                      if (!target.src.includes("placeholder.svg")) {
                        target.src = "/organisers/placeholder.svg";
                      }
                    }}
                    className={`w-full h-full object-cover ${member.imagePosition || "object-center"} group-hover:brightness-105 transition-all`}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#ff9f43] transition-colors leading-snug">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-[11px] sm:text-xs font-semibold text-[#004aab] mt-1.5 leading-snug">
                {member.role}
              </p>

              {/* Organization */}
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1.5 leading-relaxed">
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
