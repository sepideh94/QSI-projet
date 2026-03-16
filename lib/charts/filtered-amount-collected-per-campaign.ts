import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";
import { filterContributionsByPeriod, PeriodFilter } from "@/lib/charts/period-utils";

type FilteredAmountCollectedPerCampaignItem = {
  label: string;
  value: number;
};

export function getFilteredAmountCollectedPerCampaign(
  period: PeriodFilter
): FilteredAmountCollectedPerCampaignItem[] {
  const filteredContributions = filterContributionsByPeriod(
    mockContributions,
    period
  );

  return mockCampaigns.map((campaign) => {
    const totalAmount = filteredContributions
      .filter((contribution) => contribution.campaignId === campaign.id)
      .reduce((sum, contribution) => sum + contribution.amount, 0);

    return {
      label: campaign.titre,
      value: totalAmount
    };
  });
}