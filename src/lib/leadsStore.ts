import fs from "fs/promises";
import path from "path";

export type LeadType = "visitor" | "stall" | "contact";
export type LeadStatus = "New" | "Contacted" | "Approved" | "Archived";

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  createdAt: string;
  data: Record<string, any>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// In-memory fallback in case file system has temporary locks
let inMemoryLeads: Lead[] = [];
let initialized = false;

async function ensureFileExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LEADS_FILE);
    } catch {
      // Create empty leads array file
      await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error creating leads data directory/file:", err);
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureFileExists();
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      inMemoryLeads = parsed;
      initialized = true;
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  } catch (err) {
    console.error("Failed to read leads file, returning memory cache:", err);
  }
  return inMemoryLeads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveLead(type: LeadType, data: Record<string, any>): Promise<Lead> {
  await ensureFileExists();
  const leads = await getLeads();

  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type,
    status: "New",
    createdAt: new Date().toISOString(),
    data,
  };

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
  await ensureFileExists();
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index].status = status;
  inMemoryLeads = leads;

  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to update lead in disk:", err);
  }

  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  await ensureFileExists();
  const leads = await getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;

  inMemoryLeads = filtered;
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save deletion to disk:", err);
  }

  return true;
}
