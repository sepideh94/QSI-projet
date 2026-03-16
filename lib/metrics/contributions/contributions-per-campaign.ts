import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";

export function getContributionsPerCampaign() {

  return mockCampaigns.map((campaign) => {

    const count = mockContributions.filter(
      (c) => c.campaignId === campaign.id
    ).length;

    return {
      campaignTitle: campaign.titre.split(" ").slice(0, 3).join(" "),
      contributions: count
    };

  });

}