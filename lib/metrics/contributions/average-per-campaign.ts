type Contribution = {
  campaignId: string;
};

type Campaign = {
  id: string;
};

export function getAverageContributionsPerCampaign(
  contributions: Contribution[],
  campaigns: Campaign[]
): number {
  if (campaigns.length === 0) {
    return 0;
  }

  const validCampaignIds = new Set(campaigns.map((campaign) => campaign.id));

  const totalContributions = contributions.filter((contribution) =>
    validCampaignIds.has(contribution.campaignId)
  ).length;

  return Math.round(totalContributions / campaigns.length);
}