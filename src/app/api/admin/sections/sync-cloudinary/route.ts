import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { isCloudinaryConfigured, uploadLocalFileToCloudinary } from "@/lib/cloudinary";
import { getSectionsCmsData, saveSectionsCmsData } from "@/lib/sectionsCmsStore";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary credentials are not configured in your environment variables. Please ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.",
        },
        { status: 400 }
      );
    }

    let targetSection: string = "all";
    try {
      const body = await req.json();
      if (body?.section) {
        targetSection = body.section;
      }
    } catch {
      // No JSON body passed, default to all sections
    }

    const sectionsData = await getSectionsCmsData();
    let totalMigrated = 0;
    const errors: string[] = [];
    const breakdown = {
      exhibitors: 0,
      mediaPartners: 0,
      lineup: 0,
      sponsors: 0,
    };

    // 1. Exhibitors
    const updatedExhibitors = [...sectionsData.exhibitors.items];
    if (targetSection === "all" || targetSection === "exhibitors") {
      for (let i = 0; i < updatedExhibitors.length; i++) {
        const item = updatedExhibitors[i];
        if (item.logo && item.logo.includes("res.cloudinary.com")) {
          continue;
        }

        const cleanPath = item.logo.startsWith("/") ? item.logo.slice(1) : item.logo;
        const localPath = path.join(process.cwd(), "public", cleanPath);

        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await uploadLocalFileToCloudinary(localPath, "imd2027/exhibitors");
            updatedExhibitors[i] = {
              ...item,
              logo: uploaded.url,
              publicId: uploaded.publicId,
            };
            totalMigrated++;
            breakdown.exhibitors++;
          } catch (err: any) {
            errors.push(`Exhibitor ${item.name} (${item.logo}): ${err.message}`);
          }
        }
      }
    }

    // 2. Media Partners
    const updatedMediaPartners = [...sectionsData.mediaPartners.items];
    if (targetSection === "all" || targetSection === "mediaPartners") {
      for (let i = 0; i < updatedMediaPartners.length; i++) {
        const item = updatedMediaPartners[i];
        if (item.image && item.image.includes("res.cloudinary.com")) {
          continue;
        }

        const cleanPath = item.image.startsWith("/") ? item.image.slice(1) : item.image;
        const localPath = path.join(process.cwd(), "public", cleanPath);

        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await uploadLocalFileToCloudinary(localPath, "imd2027/media");
            updatedMediaPartners[i] = {
              ...item,
              image: uploaded.url,
              publicId: uploaded.publicId,
            };
            totalMigrated++;
            breakdown.mediaPartners++;
          } catch (err: any) {
            errors.push(`Media Partner ${item.name} (${item.image}): ${err.message}`);
          }
        }
      }
    }

    // 3. The 2027 Line-up (Speakers)
    const updatedLineup = [...sectionsData.lineup.items];
    if (targetSection === "all" || targetSection === "lineup") {
      for (let i = 0; i < updatedLineup.length; i++) {
        const item = updatedLineup[i];
        if (item.image && item.image.includes("res.cloudinary.com")) {
          continue;
        }

        const cleanPath = item.image.startsWith("/") ? item.image.slice(1) : item.image;
        const localPath = path.join(process.cwd(), "public", cleanPath);

        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await uploadLocalFileToCloudinary(localPath, "imd2027/speakers");
            updatedLineup[i] = {
              ...item,
              image: uploaded.url,
              publicId: uploaded.publicId,
            };
            totalMigrated++;
            breakdown.lineup++;
          } catch (err: any) {
            errors.push(`Speaker ${item.name} (${item.image}): ${err.message}`);
          }
        }
      }
    }

    // 4. Partners & Sponsors
    const updatedSponsors = [...sectionsData.sponsors.items];
    if (targetSection === "all" || targetSection === "sponsors") {
      for (let i = 0; i < updatedSponsors.length; i++) {
        const item = updatedSponsors[i];
        if (item.logo && item.logo.includes("res.cloudinary.com")) {
          continue;
        }

        const cleanPath = item.logo.startsWith("/") ? item.logo.slice(1) : item.logo;
        const localPath = path.join(process.cwd(), "public", cleanPath);

        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await uploadLocalFileToCloudinary(localPath, "imd2027/sponsors");
            updatedSponsors[i] = {
              ...item,
              logo: uploaded.url,
              publicId: uploaded.publicId,
            };
            totalMigrated++;
            breakdown.sponsors++;
          } catch (err: any) {
            errors.push(`Sponsor ${item.name} (${item.logo}): ${err.message}`);
          }
        }
      }
    }

    // Save updated CMS sections
    const saved = await saveSectionsCmsData({
      exhibitors: {
        title: sectionsData.exhibitors.title,
        items: updatedExhibitors,
      },
      mediaPartners: {
        title: sectionsData.mediaPartners.title,
        subtitle: sectionsData.mediaPartners.subtitle,
        items: updatedMediaPartners,
      },
      lineup: {
        title: sectionsData.lineup.title,
        subtitle: sectionsData.lineup.subtitle,
        items: updatedLineup,
      },
      sponsors: {
        title: sectionsData.sponsors.title,
        items: updatedSponsors,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        totalMigrated > 0
          ? `Successfully migrated and synced ${totalMigrated} image(s) to Cloudinary across sections!`
          : "All images are already hosted on Cloudinary or no local images found to sync.",
      migratedCount: totalMigrated,
      breakdown,
      data: saved,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Cloudinary sync error across sections:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to sync images to Cloudinary" },
      { status: 500 }
    );
  }
}
