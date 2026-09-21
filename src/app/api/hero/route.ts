import { NextResponse } from "next/server";
import { getHeroData } from "@/lib/heroCmsStore";

export async function GET() {
  try {
    const data = await getHeroData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve hero data" },
      { status: 500 }
    );
  }
}
