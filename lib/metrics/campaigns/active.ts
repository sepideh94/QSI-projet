type Campaign = {
  status: string;
};

export function countActiveCampaigns(campaigns: Campaign[]): number {
  return campaigns.filter((campaign) => campaign.status === "active").length;
}