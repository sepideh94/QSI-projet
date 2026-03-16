import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";
import {
  filterContributionsByPeriod,
  PeriodFilter
} from "@/lib/charts/period-utils";

type FilteredContributionsPerCampaignItem = {
  campaignTitle: string;
  contributions: number;
};

export function getFilteredContributionsPerCampaign(
  period: PeriodFilter
): FilteredContributionsPerCampaignItem[] {
  const filteredContributions = filterContributionsByPeriod(
    mockContributions,
    period
  );

  return mockCampaigns.map((campaign) => ({
    campaignTitle: campaign.titre,
    contributions: filteredContributions.filter(
      (contribution) => contribution.campaignId === campaign.id
    ).length
  }));
}