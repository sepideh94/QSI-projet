import {
  getCampaigns,
  getContributions
} from "@/lib/database/in-memory-database";
import {
  filterContributionsByPeriod,
  type PeriodFilter
} from "@/lib/charts/use-cases/period-filter";

type ContributionsPerCampaignItem = {
  campaignTitle: string;
  contributions: number;
};

export function getFilteredContributionsPerCampaign(
  period: PeriodFilter
): ContributionsPerCampaignItem[] {
  const campaigns = getCampaigns();
  const filteredContributions = filterContributionsByPeriod(
    getContributions(),
    period
  );

  return campaigns.map((campaign) => ({
    campaignTitle: campaign.titre,
    contributions: filteredContributions.filter(
      (contribution) => contribution.campaignId === campaign.id
    ).length
  }));
}
