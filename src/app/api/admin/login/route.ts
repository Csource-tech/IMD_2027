import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminSession, findAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = typeof body?.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!username || !password || password.length > 256) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const admin = await findAdmin(username);
    const passwordValid = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
    if (!admin || !passwordValid) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    await createAdminSession(admin);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
