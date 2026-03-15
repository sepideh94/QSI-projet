import { NextResponse } from "next/server";
import { mockContributions } from "@/mocks/contributions";
import { getTotalAmount } from "@/lib/metrics/contributions/total-amount";

export async function GET() {
  try {

    const value = getTotalAmount(mockContributions);

    return NextResponse.json({
      metric: "amount-collected",
      value
    });

  } catch (error) {

    console.error("Erreur récupération montant collecté", error);

    return NextResponse.json(
      { error: "Impossible de récupérer le montant collecté" },
      { status: 500 }
    );

  }
}