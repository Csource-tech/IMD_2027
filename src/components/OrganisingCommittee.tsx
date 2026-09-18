"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

interface CommitteeMember {
  name: string;
  image: string;
  imagePosition?: string;
}

const MEMBERS: CommitteeMember[] = [
  {
    name: "Dr. R.P. Tewari",
    image: "/organisers/rptiwari.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Manjit Singh",
    image: "/organisers/manjitsingh.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. B.K. Pani",
    image: "/organisers/bkpani.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. M.P. Thakur",
    image: "/organisers/mpthakur.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. D.K. Mazumdar",
    image: "/organisers/mazumdar.jfif",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Arvinda Rabba",
    image: "/organisers/arvindrabba.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Sunil Kumar Srivastava",
    image: "/organisers/sunilsrivastava.jfif",
    imagePosition: "object-center",
  },
  {
    name: "Dr. Loveleet Rana",
    image: "/organisers/loveleet.jpeg",
    imagePosition: "object-top",
  },
  {
    name: "Mr. Anurag Saxena",
    image: "/organisers/anuragsaxena.jpeg",
    imagePosition: "object-center",
  },
  {
    name: "Ms. Pinky Malhotra",
    image: "/organisers/pinkymalhotra.jpeg",
    imagePosition: "object-[center_20%]",
  },
  {
    name: "Harshita Bisht",
    image: "/organisers/harshitabisht.jpeg",
    imagePosition: "object-[center_20%]",
  },
  {
    name: "Bhumika Singh",
    image: "/organisers/bhumikasingh.jpeg",
    imagePosition: "object-[center_55%]",
  },
];

interface Speaker {
  name: string;
  role: string;
  country: string;
  countryCode: string;
  image: string;
}

const SPEAKERS: Speaker[] = [
  {
    name: "Greg Seymour",
    role: "President, International Society for Mushroom Science",
    country: "AUSTRALIA",
    countryCode: "AU",
    image: "/speakers/greg_seymour.jpg",
  },
  {
    name: "Dr. Manjit Singh",
    role: "President, Mushroom Society of India",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/manjit_singh.jpg",
  },
  {
    name: "Magda Verfaillie",
    role: "Mycelia",
    country: "BELGIUM",
    countryCode: "BE",
    image: "/speakers/magda_verfaillie.jpg",
  },
  {
    name: "Daniel Motshwane",
    role: "Founder, Afrique Rising Trading",
    country: "SOUTH AFRICA",
    countryCode: "ZA",
    image: "/speakers/daniel_motshwane.jpg",
  },
  {
    name: "Diego Zied",
    role: "Mushroom science researcher",
    country: "BRAZIL",
    countryCode: "BR",
    image: "/speakers/diego_zied.jpg",
  },
  {
    name: "Andre Marjanowski",
    role: "Owner, Crop Advice and Training",
    country: "USA",
    countryCode: "US",
    image: "/speakers/andre_marjanowski.jpg",
  },
  {
    name: "Daniel Dajewski",
    role: "Construction and mushroom industries",
    country: "POLAND",
    countryCode: "PL",
    image: "/speakers/daniel_dajewski.jpg",
  },
  {
    name: "Mustafa Soylu",
    role: "Researcher, ABKAE",
    country: "TURKEY",
    countryCode: "TR",
    image: "/speakers/mustafa_soylu.jpg",
  },
  {
    name: "Aert Bart",
    role: "International Area Sales Manager",
    country: "NETHERLANDS",
    countryCode: "NL",
    image: "/speakers/aert_bart.jpg",
  },
  {
    name: "Ron Hegger",
    role: "Managing Director, Dutch Mushroom Projects",
    country: "NETHERLANDS",
    countryCode: "NL",
    image: "/speakers/ron_hegger.jpg",
  },
  {
    name: "Snehal Mane",
    role: "Marketing Manager, Manegrow",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/snehal_mane.jpg",
  },
  {
    name: "Heera Gangadharan",
    role: "Assistant Professor and PI, AICRP on Mushrooms",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/heera_gangadharan.jpg",
  },
];

export default function OrganisingCommittee() {
  const t = useTranslations("committee");

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
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Organizing Committee Members Grid (4 cols on lg, 3 on md, 2 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
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
            </motion.div>
          ))}
        </div>

        {/* Subtle Section Divider */}
        <div className="my-16 sm:my-20 border-t border-gray-200/80" />

        {/* The Conference: The 2027 Line-up */}
        <div id="conference-lineup" className="relative">
          {/* Section Heading */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
            >
              {t("lineupTitle")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              {t("lineupSubtitle")}
            </motion.p>
          </div>

          {/* Speakers Grid (4 cols on lg, 3 on md/sm, 2 on xs) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-start">
            {SPEAKERS.map((speaker, idx) => (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.05 }}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Circular Portrait with Country Badge */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#ff9f43] shadow-md transition-all duration-300 group-hover:scale-105 bg-slate-100 flex items-center justify-center">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes("placeholder.svg")) {
                          target.src = "/organisers/placeholder.svg";
                        }
                      }}
                      className="w-full h-full object-cover object-center group-hover:brightness-105 transition-all"
                    />
                  </div>

                  {/* Country ISO Code Badge */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-300 text-[11px] sm:text-xs font-black text-gray-800 flex items-center justify-center shadow-md">
                    {speaker.countryCode}
                  </div>
                </div>

                {/* Speaker Name */}
                <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#ff9f43] transition-colors leading-snug">
                  {speaker.name}
                </h3>

                {/* Role / Organization */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 max-w-[240px]">
                  {speaker.role}
                </p>

                {/* Country */}
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500 mt-2 font-mono">
                  {speaker.country}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
