import { NextResponse } from "next/server";
import { getSectionsCmsData } from "@/lib/sectionsCmsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSectionsCmsData();

    // Filter only active items for public consumption, sorted by order
    return NextResponse.json(
      {
        success: true,
        data: {
          exhibitors: {
            title: data.exhibitors.title,
            items: data.exhibitors.items
              .filter((item) => item.active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
          },
          mediaPartners: {
            title: data.mediaPartners.title,
            subtitle: data.mediaPartners.subtitle,
            items: data.mediaPartners.items
              .filter((item) => item.active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
          },
          lineup: {
            title: data.lineup.title,
            subtitle: data.lineup.subtitle,
            items: data.lineup.items
              .filter((item) => item.active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
          },
          sponsors: {
            title: data.sponsors.title,
            items: data.sponsors.items
              .filter((item) => item.active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
          },
          updatedAt: data.updatedAt,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: any) {
    console.error("Public Sections CMS fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sections CMS data" },
      { status: 500 }
    );
  }
}
