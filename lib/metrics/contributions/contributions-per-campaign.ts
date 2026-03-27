import {
  getCampaigns,
  getContributions
} from "@/lib/database/in-memory-database";

export function getContributionsPerCampaign() {
  const campaigns = getCampaigns();
  const contributions = getContributions();

  return campaigns.map((campaign) => {
    const count = contributions.filter(
      (c) => c.campaignId === campaign.id
    ).length;

    return {
      campaignTitle: campaign.titre.split(" ").slice(0, 3).join(" "),
      contributions: count
    };

  });
}