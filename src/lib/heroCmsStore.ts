import fs from "fs";
import path from "path";
import clientPromise from "./mongodb";
import {
  HeroImage,
  HeroCmsData,
  DEFAULT_CAROUSEL_IMAGES,
  DEFAULT_HERO_DATA,
} from "./heroCmsTypes";

export type { HeroImage, HeroCmsData };
export { DEFAULT_CAROUSEL_IMAGES, DEFAULT_HERO_DATA };

const DATA_FILE = path.join(process.cwd(), "data", "hero_cms.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

export async function getHeroData(): Promise<HeroCmsData> {
  // 1. Try MongoDB first if connected
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "imd2027");
      const collection = db.collection<HeroCmsData>("hero_cms");
      const record = await collection.findOne({ _id: "hero_config" as any });
      if (record) {
        const { _id, ...data } = record as any;
        return {
          ...DEFAULT_HERO_DATA,
          ...data,
          images: Array.isArray(data.images) && data.images.length > 0 ? data.images : DEFAULT_HERO_DATA.images,
        };
      }
    } catch (err) {
      console.warn("MongoDB fetch failed for hero_cms, falling back to local file:", err);
    }
  }

  // 2. Fallback to local JSON file
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      return {
        ...DEFAULT_HERO_DATA,
        ...parsed,
        images: Array.isArray(parsed.images) && parsed.images.length > 0 ? parsed.images : DEFAULT_HERO_DATA.images,
      };
    }
  } catch (err) {
    console.warn("Local file fetch failed for hero_cms:", err);
  }

  return DEFAULT_HERO_DATA;
}

export async function saveHeroData(data: Partial<HeroCmsData>): Promise<HeroCmsData> {
  const current = await getHeroData();
  const updated: HeroCmsData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to MongoDB if available
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "imd2027");
      const collection = db.collection("hero_cms");
      await collection.updateOne(
        { _id: "hero_config" as any },
        { $set: updated },
        { upsert: true }
      );
    } catch (err) {
      console.warn("MongoDB update failed for hero_cms, saving locally:", err);
    }
  }

  // 2. Always persist to local file as immediate backup
  try {
    ensureDirectoryExistence(DATA_FILE);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Local file write failed for hero_cms:", err);
  }

  return updated;
}
