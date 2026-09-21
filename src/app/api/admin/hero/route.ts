import { NextResponse } from "next/server";
import { getHeroData, saveHeroData } from "@/lib/heroCmsStore";
import { isCloudinaryConfigured } from "@/lib/cloudinary";

export async function GET() {
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
