import fs from "fs/promises";
import path from "path";
import clientPromise from "./mongodb";

export type LeadType = "visitor" | "stall" | "contact";
export type LeadStatus = "New" | "Contacted" | "Approved" | "Archived";

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  createdAt: string;
  data: Record<string, any>;
}

const DB_NAME = process.env.MONGODB_DB || "imd2027";
const COLLECTION_NAME = "leads";

// Local file fallback when MONGODB_URI is not set
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

let inMemoryLeads: Lead[] = [];

async function ensureLocalFileExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LEADS_FILE);
    } catch {
      await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error creating local leads directory/file:", err);
  }
}

async function getLocalLeads(): Promise<Lead[]> {
  await ensureLocalFileExists();
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      inMemoryLeads = parsed;
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  } catch (err) {
    console.error("Failed to read local leads file:", err);
  }
  return inMemoryLeads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getLeads(): Promise<Lead[]> {
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const leads = await db
        .collection<Lead>(COLLECTION_NAME)
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return leads;
    } catch (err) {
      console.error("MongoDB getLeads error, falling back to local:", err);
    }
  }
  return getLocalLeads();
}

export async function saveLead(type: LeadType, data: Record<string, any>): Promise<Lead> {
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type,
    status: "New",
    createdAt: new Date().toISOString(),
    data,
  };

  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      await db.collection(COLLECTION_NAME).insertOne({ ...newLead });
      return newLead;
    } catch (err) {
      console.error("MongoDB saveLead error, falling back to local:", err);
    }
  }

  // Local fallback
  await ensureLocalFileExists();
  const leads = await getLocalLeads();
  leads.unshift(newLead);
  inMemoryLeads = leads;
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist lead to disk:", err);
  }
  return newLead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const result = await db
        .collection<Lead>(COLLECTION_NAME)
        .findOneAndUpdate(
          { id },
          { $set: { status } },
          { returnDocument: "after", projection: { _id: 0 } }
        );
      if (result) return result as unknown as Lead;
    } catch (err) {
      console.error("MongoDB updateLeadStatus error, falling back to local:", err);
    }
  }

  // Local fallback
  await ensureLocalFileExists();
  const leads = await getLocalLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index].status = status;
  inMemoryLeads = leads;
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to update lead on disk:", err);
  }
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const result = await db.collection(COLLECTION_NAME).deleteOne({ id });
      return result.deletedCount > 0;
    } catch (err) {
      console.error("MongoDB deleteLead error, falling back to local:", err);
    }
  }

  // Local fallback
  await ensureLocalFileExists();
  const leads = await getLocalLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;

  inMemoryLeads = filtered;
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save deletion on disk:", err);
  }
  return true;
}
