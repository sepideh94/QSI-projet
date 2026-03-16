type Campaign = {
  status: string;
};

export function getSuccessRate(campaigns: Campaign[]): number {
  const finishedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "success" || campaign.status === "failed"
  );

  if (finishedCampaigns.length === 0) {
    return 0;
  }

  const successfulCampaigns = finishedCampaigns.filter(
    (campaign) => campaign.status === "success"
  );

  return Math.round((successfulCampaigns.length / finishedCampaigns.length) * 100);
}