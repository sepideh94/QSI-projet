import { NextRequest, NextResponse } from "next/server";
import {
  getDashboardMetrics,
  type MetricKey
} from "@/lib/metrics/use-cases/get-dashboard-metrics";

const metricKeys: MetricKey[] = [
  "campaigns-active",
  "contributions-total",
  "amount-collected",
  "success-rate",
  "average-contribution"
];

export async function GET(request: NextRequest) {
  try {
    const metrics = getDashboardMetrics();
    const metric = request.nextUrl.searchParams.get("metric");

    if (metric === null) {
      return NextResponse.json({ metrics });
    }

    if (!metricKeys.includes(metric as MetricKey)) {
      return NextResponse.json(
        { error: `Métrique inconnue: ${metric}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      metric,
      value: metrics[metric as MetricKey]
    });
  } catch (error) {
    console.error("Erreur récupération métriques", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les métriques" },
      { status: 500 }
    );
  }
}
