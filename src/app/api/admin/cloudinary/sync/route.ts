import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { isCloudinaryConfigured, uploadLocalFileToCloudinary } from "@/lib/cloudinary";
import { getHeroData, saveHeroData } from "@/lib/heroCmsStore";

export async function POST() {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary credentials are not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file to enable automated sync.",
        },
        { status: 400 }
      );
    }

    const heroData = await getHeroData();
    const currentImages = heroData.images || [];

    let migratedCount = 0;
    const errors: string[] = [];

    const updatedImages = [];

    for (const item of currentImages) {
      // If already a Cloudinary URL, keep as is
      if (item.url.includes("res.cloudinary.com")) {
        updatedImages.push(item);
        continue;
      }

      // Check if local file exists in public/
      const cleanUrl = item.url.startsWith("/") ? item.url.slice(1) : item.url;
      const localPath = path.join(process.cwd(), "public", cleanUrl);

      if (fs.existsSync(localPath)) {
        try {
          const uploaded = await uploadLocalFileToCloudinary(localPath, "imd2027/hero");
          migratedCount++;
          updatedImages.push({
            ...item,
            url: uploaded.url,
            publicId: uploaded.publicId,
          });
        } catch (uploadErr: any) {
          console.error(`Failed to push ${item.url} to Cloudinary:`, uploadErr);
          errors.push(`Failed to upload ${item.url}: ${uploadErr.message}`);
          updatedImages.push(item); // Keep local fallback
        }
      } else {
        updatedImages.push(item);
      }
    }

    // Save the new Cloudinary links into persistent store
    const saved = await saveHeroData({ images: updatedImages });

    return NextResponse.json({
      success: true,
      message:
        migratedCount > 0
          ? `Successfully synced and pushed ${migratedCount} images to Cloudinary! Live carousel now uses Cloudinary URLs.`
          : "All images are already hosted on Cloudinary or no local images found to sync.",
      migratedCount,
      totalImages: saved.images.length,
      images: saved.images,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Cloudinary sync error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to sync images to Cloudinary" },
      { status: 500 }
    );
  }
}
