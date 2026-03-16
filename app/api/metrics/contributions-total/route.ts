import { NextResponse } from "next/server";
import { mockContributions } from "@/mocks/contributions";
import { countTotalContributions } from "@/lib/metrics/contributions/total";

export async function GET() {
  try {

    const value = countTotalContributions(mockContributions);

    return NextResponse.json({
      metric: "contributions-total",
      value
    });

  } catch (error) {

    console.error("Erreur récupération contributions", error);

    return NextResponse.json(
      { error: "Impossible de récupérer les contributions" },
      { status: 500 }
    );

  }
}