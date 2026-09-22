import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

// Parse .env manually
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

// Initial datasets
const EXHIBITORS = [
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

const MEDIA_PARTNERS = [
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

const SPEAKERS = [
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

const SPONSORS = [
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

async function uploadFile(relPath, folder) {
  const cleanPath = relPath.startsWith("/") ? relPath.slice(1) : relPath;
  const localPath = path.join(process.cwd(), "public", cleanPath);
  if (!fs.existsSync(localPath)) {
    console.warn(`File not found: ${localPath}`);
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      resource_type: "image",
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    console.error(`Upload error for ${relPath}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log("Starting Migration to Cloudinary...");

  // 1. Exhibitors
  console.log("\n[1/4] Migrating Exhibitors Logos...");
  const migratedExhibitors = [];
  for (const item of EXHIBITORS) {
    process.stdout.write(`Uploading ${item.name} (${item.logo})... `);
    const res = await uploadFile(item.logo, "imd2027/exhibitors");
    if (res) {
      migratedExhibitors.push({ ...item, logo: res.url, publicId: res.publicId });
      console.log("DONE -> " + res.url);
    } else {
      migratedExhibitors.push(item);
      console.log("SKIPPED (Kept original)");
    }
  }

  // 2. Media Partners
  console.log("\n[2/4] Migrating Media Partners Covers...");
  const migratedMedia = [];
  for (const item of MEDIA_PARTNERS) {
    process.stdout.write(`Uploading ${item.name} (${item.image})... `);
    const res = await uploadFile(item.image, "imd2027/media");
    if (res) {
      migratedMedia.push({ ...item, image: res.url, publicId: res.publicId });
      console.log("DONE -> " + res.url);
    } else {
      migratedMedia.push(item);
      console.log("SKIPPED (Kept original)");
    }
  }

  // 3. Speakers (The 2027 Line-up)
  console.log("\n[3/4] Migrating 2027 Line-up Speakers...");
  const migratedSpeakers = [];
  for (const item of SPEAKERS) {
    process.stdout.write(`Uploading ${item.name} (${item.image})... `);
    const res = await uploadFile(item.image, "imd2027/speakers");
    if (res) {
      migratedSpeakers.push({ ...item, image: res.url, publicId: res.publicId });
      console.log("DONE -> " + res.url);
    } else {
      migratedSpeakers.push(item);
      console.log("SKIPPED (Kept original)");
    }
  }

  // 4. Sponsors
  console.log("\n[4/4] Migrating Partners & Sponsors Logos...");
  const migratedSponsors = [];
  for (const item of SPONSORS) {
    process.stdout.write(`Uploading ${item.name} (${item.logo})... `);
    const res = await uploadFile(item.logo, "imd2027/sponsors");
    if (res) {
      migratedSponsors.push({ ...item, logo: res.url, publicId: res.publicId });
      console.log("DONE -> " + res.url);
    } else {
      migratedSponsors.push(item);
      console.log("SKIPPED (Kept original)");
    }
  }

  const finalData = {
    exhibitors: {
      title: "Exhibitors",
      items: migratedExhibitors,
    },
    mediaPartners: {
      title: "Media Partners",
      subtitle: "Leading global trade publications and editorial coverage for the commercial mushroom industry",
      items: migratedMedia,
    },
    lineup: {
      title: "The Conference: The 2027 Line-up",
      subtitle: "Distinguished global thought leaders, commercial agronomists, and biotechnology innovators converging in New Delhi.",
      items: migratedSpeakers,
    },
    sponsors: {
      title: "Partners & Sponsors",
      items: migratedSponsors,
    },
    updatedAt: new Date().toISOString(),
  };

  // Save to data/sections_cms.json
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const jsonPath = path.join(dataDir, "sections_cms.json");
  fs.writeFileSync(jsonPath, JSON.stringify(finalData, null, 2), "utf-8");
  console.log(`\nSaved updated CMS data to ${jsonPath}`);

  // Save to MongoDB if available
  if (process.env.MONGODB_URI) {
    try {
      console.log("Connecting to MongoDB to update sections_cms collection...");
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB || "imd2027");
      await db.collection("sections_cms").updateOne(
        { _id: "sections_config" },
        { $set: finalData },
        { upsert: true }
      );
      await client.close();
      console.log("Successfully updated MongoDB collection 'sections_cms'!");
    } catch (err) {
      console.warn("MongoDB sync failed:", err.message);
    }
  }

  console.log("\nALL SECTIONS SUCCESSFULLY MIGRATED TO CLOUDINARY!");
}

migrate();
