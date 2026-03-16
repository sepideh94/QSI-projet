import { NextResponse } from "next/server";
import { mockContributions } from "@/mocks/contributions";
import { getAverageContributionAmount } from "@/lib/metrics/contributions/average-amount";

export async function GET() {
  try {

    const value = getAverageContributionAmount(mockContributions);

    return NextResponse.json({
      metric: "average-contribution",
      value
    });

  } catch (error) {

    console.error("Erreur récupération contribution moyenne", error);

    return NextResponse.json(
      { error: "Impossible de récupérer la contribution moyenne" },
      { status: 500 }
    );

  }
}