import { NextResponse } from "next/server";
import { getHeroData, saveHeroData } from "@/lib/heroCmsStore";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { isAdminRequest } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await getHeroData();
    return NextResponse.json({
      success: true,
      data,
      isCloudinaryConfigured: isCloudinaryConfigured(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load hero CMS data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const updated = await saveHeroData(body);
    return NextResponse.json({
      success: true,
      message: "Hero section updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update hero CMS data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  return POST(req);
}
