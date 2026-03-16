import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";
import { filterContributionsByPeriod, PeriodFilter } from "@/lib/charts/period-utils";

type FilteredTargetAchievementRatePerCampaignItem = {
  label: string;
  value: number;
};

export function getFilteredTargetAchievementRatePerCampaign(
  period: PeriodFilter
): FilteredTargetAchievementRatePerCampaignItem[] {
  const filteredContributions = filterContributionsByPeriod(
    mockContributions,
    period
  );

  return mockCampaigns.map((campaign) => {
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