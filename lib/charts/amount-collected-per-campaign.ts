import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";

type AmountCollectedPerCampaignItem = {
  label: string;
  value: number;
};

export function getAmountCollectedPerCampaign(): AmountCollectedPerCampaignItem[] {
  return mockCampaigns.map((campaign) => {
    const totalAmount = mockContributions
      .filter((contribution) => contribution.campaignId === campaign.id)
      .reduce((sum, contribution) => sum + contribution.amount, 0);

    return {
      label: campaign.titre,
      value: totalAmount
    };
  });
}