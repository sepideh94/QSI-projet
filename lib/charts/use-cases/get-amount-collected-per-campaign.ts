import {
  getCampaigns,
  getContributions
} from "@/lib/database/in-memory-database";
import {
  filterContributionsByPeriod,
  type PeriodFilter
} from "@/lib/charts/use-cases/period-filter";

type AmountCollectedPerCampaignItem = {
  label: string;
  value: number;
};

function buildAmountCollectedPerCampaign(period: PeriodFilter): AmountCollectedPerCampaignItem[] {
  const campaigns = getCampaigns();
  const filteredContributions = filterContributionsByPeriod(
    getContributions(),
    period
  );

  return campaigns.map((campaign) => {
    const totalAmount = filteredContributions
      .filter((contribution) => contribution.campaignId === campaign.id)
      .reduce((sum, contribution) => sum + contribution.amount, 0);

    return {
      label: campaign.titre,
      value: totalAmount
    };
  });
}

export function getAmountCollectedPerCampaign(): AmountCollectedPerCampaignItem[] {
  return buildAmountCollectedPerCampaign("all");
}

export function getFilteredAmountCollectedPerCampaign(
  period: PeriodFilter
): AmountCollectedPerCampaignItem[] {
  return buildAmountCollectedPerCampaign(period);
}
