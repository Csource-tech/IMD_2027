import fs from "fs";
import path from "path";
import clientPromise from "./mongodb";
import {
  ExhibitorItem,
  MediaPartnerItem,
  SpeakerItem,
  SponsorItem,
  SectionsCmsData,
  DEFAULT_EXHIBITORS,
  DEFAULT_MEDIA_PARTNERS,
  DEFAULT_SPEAKERS,
  DEFAULT_SPONSORS,
  DEFAULT_SECTIONS_CMS_DATA,
} from "./sectionsCmsTypes";

export type {
  ExhibitorItem,
  MediaPartnerItem,
  SpeakerItem,
  SponsorItem,
  SectionsCmsData,
};
export {
  DEFAULT_EXHIBITORS,
  DEFAULT_MEDIA_PARTNERS,
  DEFAULT_SPEAKERS,
  DEFAULT_SPONSORS,
  DEFAULT_SECTIONS_CMS_DATA,
};

const DATA_FILE = path.join(process.cwd(), "data", "sections_cms.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export async function getSectionsCmsData(): Promise<SectionsCmsData> {
  // 1. Try MongoDB first if connected
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "imd2027");
      const collection = db.collection<SectionsCmsData>("sections_cms");
      const record = await collection.findOne({ _id: "sections_config" as any });
      if (record) {
        const { _id, ...data } = record as any;
        return {
          exhibitors: {
            title: data.exhibitors?.title || DEFAULT_SECTIONS_CMS_DATA.exhibitors.title,
            items: Array.isArray(data.exhibitors?.items) && data.exhibitors.items.length > 0
              ? data.exhibitors.items
              : DEFAULT_SECTIONS_CMS_DATA.exhibitors.items,
          },
          mediaPartners: {
            title: data.mediaPartners?.title || DEFAULT_SECTIONS_CMS_DATA.mediaPartners.title,
            subtitle: data.mediaPartners?.subtitle || DEFAULT_SECTIONS_CMS_DATA.mediaPartners.subtitle,
            items: Array.isArray(data.mediaPartners?.items) && data.mediaPartners.items.length > 0
              ? data.mediaPartners.items
              : DEFAULT_SECTIONS_CMS_DATA.mediaPartners.items,
          },
          lineup: {
            title: data.lineup?.title || DEFAULT_SECTIONS_CMS_DATA.lineup.title,
            subtitle: data.lineup?.subtitle || DEFAULT_SECTIONS_CMS_DATA.lineup.subtitle,
            items: Array.isArray(data.lineup?.items) && data.lineup.items.length > 0
              ? data.lineup.items
              : DEFAULT_SECTIONS_CMS_DATA.lineup.items,
          },
          sponsors: {
            title: data.sponsors?.title || DEFAULT_SECTIONS_CMS_DATA.sponsors.title,
            items: Array.isArray(data.sponsors?.items) && data.sponsors.items.length > 0
              ? data.sponsors.items
              : DEFAULT_SECTIONS_CMS_DATA.sponsors.items,
          },
          updatedAt: data.updatedAt || new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn("MongoDB fetch failed for sections_cms, falling back to local file:", err);
    }
  }

  // 2. Fallback to local JSON file
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      return {
        exhibitors: {
          title: parsed.exhibitors?.title || DEFAULT_SECTIONS_CMS_DATA.exhibitors.title,
          items: Array.isArray(parsed.exhibitors?.items) && parsed.exhibitors.items.length > 0
            ? parsed.exhibitors.items
            : DEFAULT_SECTIONS_CMS_DATA.exhibitors.items,
        },
        mediaPartners: {
          title: parsed.mediaPartners?.title || DEFAULT_SECTIONS_CMS_DATA.mediaPartners.title,
          subtitle: parsed.mediaPartners?.subtitle || DEFAULT_SECTIONS_CMS_DATA.mediaPartners.subtitle,
          items: Array.isArray(parsed.mediaPartners?.items) && parsed.mediaPartners.items.length > 0
            ? parsed.mediaPartners.items
            : DEFAULT_SECTIONS_CMS_DATA.mediaPartners.items,
        },
        lineup: {
          title: parsed.lineup?.title || DEFAULT_SECTIONS_CMS_DATA.lineup.title,
          subtitle: parsed.lineup?.subtitle || DEFAULT_SECTIONS_CMS_DATA.lineup.subtitle,
          items: Array.isArray(parsed.lineup?.items) && parsed.lineup.items.length > 0
            ? parsed.lineup.items
            : DEFAULT_SECTIONS_CMS_DATA.lineup.items,
        },
        sponsors: {
          title: parsed.sponsors?.title || DEFAULT_SECTIONS_CMS_DATA.sponsors.title,
          items: Array.isArray(parsed.sponsors?.items) && parsed.sponsors.items.length > 0
            ? parsed.sponsors.items
            : DEFAULT_SECTIONS_CMS_DATA.sponsors.items,
        },
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn("Local file fetch failed for sections_cms:", err);
  }

  return DEFAULT_SECTIONS_CMS_DATA;
}

export async function saveSectionsCmsData(data: Partial<SectionsCmsData>): Promise<SectionsCmsData> {
  const current = await getSectionsCmsData();
  const updated: SectionsCmsData = {
    exhibitors: data.exhibitors ? { ...current.exhibitors, ...data.exhibitors } : current.exhibitors,
    mediaPartners: data.mediaPartners ? { ...current.mediaPartners, ...data.mediaPartners } : current.mediaPartners,
    lineup: data.lineup ? { ...current.lineup, ...data.lineup } : current.lineup,
    sponsors: data.sponsors ? { ...current.sponsors, ...data.sponsors } : current.sponsors,
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to MongoDB if available
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "imd2027");
      const collection = db.collection("sections_cms");
      await collection.updateOne(
        { _id: "sections_config" as any },
        { $set: updated },
        { upsert: true }
      );
    } catch (err) {
      console.warn("MongoDB update failed for sections_cms, saving locally:", err);
    }
  }

  // 2. Always persist to local file as immediate backup
  try {
    ensureDirectoryExistence(DATA_FILE);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Local file write failed for sections_cms:", err);
  }

  return updated;
}
