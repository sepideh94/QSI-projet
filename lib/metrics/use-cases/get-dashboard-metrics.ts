import { getCampaigns, getContributions } from "@/lib/database/in-memory-database";
import { countActiveCampaigns } from "@/lib/metrics/campaigns/active";
import { getSuccessRate } from "@/lib/metrics/campaigns/success-rate";
import { getAverageContributionAmount } from "@/lib/metrics/contributions/average-amount";
import { countTotalContributions } from "@/lib/metrics/contributions/total";
import { getTotalAmount } from "@/lib/metrics/contributions/total-amount";

export type MetricKey =
  | "campaigns-active"
  | "contributions-total"
  | "amount-collected"
  | "success-rate"
  | "average-contribution";

export type DashboardMetrics = Record<MetricKey, number>;

export function getDashboardMetrics(): DashboardMetrics {
  const campaigns = getCampaigns();
  const contributions = getContributions();

  return {
    "campaigns-active": countActiveCampaigns(campaigns),
    "contributions-total": countTotalContributions(contributions),
    "amount-collected": getTotalAmount(contributions),
    "success-rate": getSuccessRate(campaigns),
    "average-contribution": getAverageContributionAmount(contributions)
  };
}
