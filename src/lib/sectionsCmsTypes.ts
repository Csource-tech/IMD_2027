export interface ExhibitorItem {
  id: string;
  name: string;
  logo: string;
  publicId?: string;
  category?: string;
  active: boolean;
  order: number;
}

export interface MediaPartnerItem {
  id: string;
  name: string;
  image: string;
  publicId?: string;
  website: string;
  tagline: string;
  bgColor: string;
  active: boolean;
  order: number;
}

export interface SpeakerItem {
  id: string;
  name: string;
  role: string;
  country: string;
  countryCode: string;
  image: string;
  publicId?: string;
  active: boolean;
  order: number;
}

export interface SponsorItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  logo: string;
  publicId?: string;
  active: boolean;
  order: number;
}

export interface SectionsCmsData {
  exhibitors: {
    title: string;
    items: ExhibitorItem[];
  };
  mediaPartners: {
    title: string;
    subtitle: string;
    items: MediaPartnerItem[];
  };
  lineup: {
    title: string;
    subtitle: string;
    items: SpeakerItem[];
  };
  sponsors: {
    title: string;
    items: SponsorItem[];
  };
  updatedAt?: string;
}

export const DEFAULT_EXHIBITORS: ExhibitorItem[] = [
  { id: "exh-1", name: "Agro Projects", logo: "/agro-projects.webp", active: true, order: 0 },
  { id: "exh-2", name: "Christiaens Group", logo: "/christiaens-group.webp", active: true, order: 1 },
  { id: "exh-3", name: "Dr. Kurade's", logo: "/dr-kurades.webp", active: true, order: 2 },
  { id: "exh-4", name: "Himalaya Mushrooms", logo: "/himalaya.webp", active: true, order: 3 },
  { id: "exh-5", name: "Mushroom Exchange", logo: "/mushroom-exchange.webp", active: true, order: 4 },
  { id: "exh-6", name: "B&W", logo: "/bw.webp", active: true, order: 5 },
  { id: "exh-7", name: "Cheetah", logo: "/cheetah.webp", active: true, order: 6 },
  { id: "exh-8", name: "Currywale", logo: "/currywale.webp", active: true, order: 7 },
  { id: "exh-9", name: "Grow Diesel", logo: "/grow-diesel.webp", active: true, order: 8 },
  { id: "exh-10", name: "Milkyway Mushrooms", logo: "/milkyway.webp", active: true, order: 9 },
  { id: "exh-11", name: "Mushroom Office", logo: "/mushroom-office.webp", active: true, order: 10 },
  { id: "exh-12", name: "Navork", logo: "/navork.webp", active: true, order: 11 },
  { id: "exh-13", name: "Omega", logo: "/omega.webp", active: true, order: 12 },
  { id: "exh-14", name: "Ribbstyle", logo: "/ribbstyle.webp", active: true, order: 13 },
  { id: "exh-15", name: "Satrise", logo: "/satrise.webp", active: true, order: 14 },
  { id: "exh-16", name: "MARG", logo: "/marglogo.png", active: true, order: 15 },
  { id: "exh-17", name: "mushAI", logo: "/mushai.jpeg", active: true, order: 16 },
  { id: "exh-18", name: "Mushtoons", logo: "/mushtoons.jpeg", active: true, order: 17 },
];

export const DEFAULT_MEDIA_PARTNERS: MediaPartnerItem[] = [
  {
    id: "media-1",
    name: "Mushroom Business",
    image: "/media/image2.jpeg",
    website: "https://mushroombusiness.com/",
    tagline: "International Trade Journal by Global Roel Media",
    bgColor: "#564531",
    active: true,
    order: 0,
  },
  {
    id: "media-2",
    name: "Mushroom Chronicle",
    image: "/media/image3-v2.jpeg",
    website: "https://www.mushroomchronicle.com",
    tagline: "National Industry Magazine & Trade Chronicle",
    bgColor: "#313E37",
    active: true,
    order: 1,
  },
  {
    id: "media-3",
    name: "Mushroom Growing News",
    image: "/media/image1.jpeg",
    website: "https://mgnews.org",
    tagline: "Global Digital Media & Cultivation News",
    bgColor: "#000000",
    active: true,
    order: 2,
  },
];

export const DEFAULT_SPEAKERS: SpeakerItem[] = [
  {
    id: "speaker-1",
    name: "Greg Seymour",
    role: "International Mushroom Expert & Consultant",
    country: "AUSTRALIA",
    countryCode: "AU",
    image: "/speakers/greg_seymour.jpg",
    active: true,
    order: 0,
  },
  {
    id: "speaker-2",
    name: "Dr. Manjit Singh",
    role: "President, Mushroom Society of India",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/manjit_singh.jpg",
    active: true,
    order: 1,
  },
  {
    id: "speaker-3",
    name: "Magda Verfaillie",
    role: "Mycelia",
    country: "BELGIUM",
    countryCode: "BE",
    image: "/speakers/magda_verfaillie.jpg",
    active: true,
    order: 2,
  },
  {
    id: "speaker-4",
    name: "Daniel Motshwane",
    role: "Founder, Afrique Rising Trading",
    country: "SOUTH AFRICA",
    countryCode: "ZA",
    image: "/speakers/daniel_motshwane.jpg",
    active: true,
    order: 3,
  },
  {
    id: "speaker-5",
    name: "Diego Zied",
    role: "Mushroom science researcher",
    country: "BRAZIL",
    countryCode: "BR",
    image: "/speakers/diego_zied.jpg",
    active: true,
    order: 4,
  },
  {
    id: "speaker-6",
    name: "Andre Marjanowski",
    role: "Owner, Crop Advice and Training",
    country: "USA",
    countryCode: "US",
    image: "/speakers/andre_marjanowski.jpg",
    active: true,
    order: 5,
  },
  {
    id: "speaker-7",
    name: "Daniel Dajewski",
    role: "Construction and mushroom industries",
    country: "POLAND",
    countryCode: "PL",
    image: "/speakers/daniel_dajewski.jpg",
    active: true,
    order: 6,
  },
  {
    id: "speaker-8",
    name: "Mustafa Soylu",
    role: "Researcher, ABKAE",
    country: "TURKEY",
    countryCode: "TR",
    image: "/speakers/mustafa_soylu.jpg",
    active: true,
    order: 7,
  },
  {
    id: "speaker-9",
    name: "Aert Bart",
    role: "International Area Sales Manager",
    country: "NETHERLANDS",
    countryCode: "NL",
    image: "/speakers/aert_bart.jpg",
    active: true,
    order: 8,
  },
  {
    id: "speaker-10",
    name: "Ron Hegger",
    role: "Managing Director, Dutch Mushroom Projects",
    country: "NETHERLANDS",
    countryCode: "NL",
    image: "/speakers/ron_hegger.jpg",
    active: true,
    order: 9,
  },
  {
    id: "speaker-11",
    name: "Snehal Mane",
    role: "Marketing Manager, Manegrow",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/snehal_mane.jpg",
    active: true,
    order: 10,
  },
  {
    id: "speaker-12",
    name: "Heera Gangadharan",
    role: "Assistant Professor and PI, AICRP on Mushrooms",
    country: "INDIA",
    countryCode: "IN",
    image: "/speakers/heera_gangadharan.jpg",
    active: true,
    order: 11,
  },
];

export const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    id: "sponsor-1",
    name: "Milkyway Technologies Limited",
    category: "SPAWN & CULTIVATION PIONEER",
    desc: "Pioneering commercial spawn production and turn-key farm setup consulting since 1994, empowering thousands of high-yield growers across India.",
    logo: "/milkyway.webp",
    active: true,
    order: 0,
  },
  {
    id: "sponsor-2",
    name: "Mushroom Exchange",
    category: "GLOBAL INDUSTRY VALUE-CHAIN PLATFORM",
    desc: "India's collaborative trade hub connecting commercial cultivators directly with certified biotech spawn labs, cold chains, and national retail buyers.",
    logo: "/mushroom-exchange.webp",
    active: true,
    order: 1,
  },
];

export const DEFAULT_SECTIONS_CMS_DATA: SectionsCmsData = {
  exhibitors: {
    title: "Exhibitors",
    items: DEFAULT_EXHIBITORS,
  },
  mediaPartners: {
    title: "Media Partners",
    subtitle: "Leading global trade publications and editorial coverage for the commercial mushroom industry",
    items: DEFAULT_MEDIA_PARTNERS,
  },
  lineup: {
    title: "The Conference: The 2027 Line-up",
    subtitle: "Distinguished global thought leaders, commercial agronomists, and biotechnology innovators converging in New Delhi.",
    items: DEFAULT_SPEAKERS,
  },
  sponsors: {
    title: "Partners & Sponsors",
    items: DEFAULT_SPONSORS,
  },
  updatedAt: new Date().toISOString(),
};
