import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";

type TargetAchievementRatePerCampaignItem = {
  label: string;
  value: number;
};

export function getTargetAchievementRatePerCampaign(): TargetAchievementRatePerCampaignItem[] {
  return mockCampaigns.map((campaign) => {
    const totalCollected = mockContributions
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