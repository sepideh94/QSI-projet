import { NextResponse } from "next/server";
import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";
import { getAverageContributionsPerCampaign } from "@/lib/metrics/contributions/average-per-campaign";

export async function GET() {

  try {

    const value = getAverageContributionsPerCampaign(
      mockContributions,
      mockCampaigns
    );

    return NextResponse.json({
      metric: "average-contributions-per-campaign",
      value
    });

  } catch {

    return NextResponse.json(
      { error: "Impossible de calculer la moyenne des contributions" },
      { status: 500 }
    );

  }

}