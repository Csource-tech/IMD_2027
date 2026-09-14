import { NextResponse } from "next/server";
import { getLeads, updateLeadStatus, deleteLead, LeadStatus } from "@/lib/leadsStore";

export async function GET(req: Request) {
  try {
    const leads = await getLeads();

    const stats = {
      total: leads.length,
      visitors: leads.filter((l) => l.type === "visitor").length,
      stalls: leads.filter((l) => l.type === "stall").length,
      contacts: leads.filter((l) => l.type === "contact").length,
      newLeads: leads.filter((l) => l.status === "New").length,
    };

    return NextResponse.json({
      success: true,
      stats,
      leads,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch leads from storage" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Lead ID and status are required." },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status as LeadStatus);
    if (!updated) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update lead status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required for deletion." },
        { status: 400 }
      );
    }

    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Lead not found or could not be deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
