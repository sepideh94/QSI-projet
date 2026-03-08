export function countActiveCampaigns(campaigns: any[]) {
  return campaigns.filter((campaign) => campaign.status === "active").length;
}