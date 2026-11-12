import { NextResponse } from "next/server";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";
import { isAdminRequest } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const configured = isCloudinaryConfigured();
  return NextResponse.json({
    success: true,
    isConfigured: configured,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ? `${process.env.CLOUDINARY_CLOUD_NAME.slice(0, 3)}***` : null,
  });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env",
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in request" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder = (formData.get("folder") as string) || "imd2027/hero";
    const result = await uploadBufferToCloudinary(buffer, folder, file.name);

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error: any) {
    console.error("Cloudinary upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
