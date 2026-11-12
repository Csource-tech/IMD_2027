import "server-only";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export const ADMIN_COOKIE = "imd_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

export interface AdminRecord {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  role: "admin";
  active: boolean;
}

function sessionKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set to a random secret of at least 32 characters.");
  return new TextEncoder().encode(secret);
}

export async function findAdmin(username: string) {
  if (!clientPromise) throw new Error("MONGODB_URI is not configured.");
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "imd2027");
  return db.collection<AdminRecord>("admins").findOne({ username: username.trim().toLowerCase(), role: "admin", active: true });
}

export async function createAdminSession(admin: Pick<AdminRecord, "_id" | "username">) {
  const token = await new SignJWT({ username: admin.username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin._id.toString())
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(sessionKey());

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function getAdminSession() {
  try {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ["HS256"] });
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return { id: payload.sub, username: String(payload.username || "admin") };
  } catch {
    return null;
  }
}

export async function isAdminRequest() {
  return Boolean(await getAdminSession());
}
