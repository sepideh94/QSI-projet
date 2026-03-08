import { NextResponse } from "next/server";
import { fetchCampaigns } from "@/lib/projects-api";
import { countActiveCampaigns } from "@/lib/metrics/campaigns/active";

export async function GET() {
  try {
    const campaigns = await fetchCampaigns();
    const value = countActiveCampaigns(campaigns);

    return NextResponse.json({
      metric: "campaigns-active",
      value
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de récupérer les campagnes actives" },
      { status: 500 }
    );
  }
}