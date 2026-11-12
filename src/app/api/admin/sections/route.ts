import { NextResponse } from "next/server";
import { getSectionsCmsData, saveSectionsCmsData } from "@/lib/sectionsCmsStore";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { isAdminRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await getSectionsCmsData();
    return NextResponse.json({
      success: true,
      data,
      isCloudinaryConfigured: isCloudinaryConfigured(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load sections CMS data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const updated = await saveSectionsCmsData(body);
    return NextResponse.json({
      success: true,
      message: "Sections CMS updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update sections CMS data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  return POST(req);
}
