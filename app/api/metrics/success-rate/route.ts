import { NextResponse } from "next/server";
import { mockCampaigns } from "@/mocks/campaigns";
import { getSuccessRate } from "@/lib/metrics/campaigns/success-rate";

export async function GET() {
  try {

    const value = getSuccessRate(mockCampaigns);

    return NextResponse.json({
      metric: "success-rate",
      value
    });

  } catch (error) {

    console.error("Erreur récupération taux succès", error);

    return NextResponse.json(
      { error: "Impossible de récupérer le taux de succès" },
      { status: 500 }
    );

  }
}