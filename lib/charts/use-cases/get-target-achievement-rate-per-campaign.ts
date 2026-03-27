import {
  getCampaigns,
  getContributions
} from "@/lib/database/in-memory-database";
import {
  filterContributionsByPeriod,
  type PeriodFilter
} from "@/lib/charts/use-cases/period-filter";

type TargetAchievementRatePerCampaignItem = {
  label: string;
  value: number;
};

function buildTargetAchievementRatePerCampaign(
  period: PeriodFilter
): TargetAchievementRatePerCampaignItem[] {
  const campaigns = getCampaigns();
  const filteredContributions = filterContributionsByPeriod(
    getContributions(),
    period
  );

  return campaigns.map((campaign) => {
    const totalCollected = filteredContributions
      .filter((contribution) => contribution.campaignId === campaign.id)
      .reduce((sum, contribution) => sum + contribution.amount, 0);

    const value =
      campaign.objectifFinancier > 0
        ? Math.round((totalCollected / campaign.objectifFinancier) * 100)
        : 0;

    return {
      label: campaign.titre,
      value
    };
  });
}

export function getTargetAchievementRatePerCampaign(): TargetAchievementRatePerCampaignItem[] {
  return buildTargetAchievementRatePerCampaign("all");
}

export function getFilteredTargetAchievementRatePerCampaign(
  period: PeriodFilter
): TargetAchievementRatePerCampaignItem[] {
  return buildTargetAchievementRatePerCampaign(period);
}
