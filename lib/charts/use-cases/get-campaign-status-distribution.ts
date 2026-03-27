import { getCampaigns } from "@/lib/database/in-memory-database";

type CampaignStatusDistributionItem = {
  label: string;
  value: number;
};

const statusLabels: Record<string, string> = {
  active: "Actives",
  success: "Réussies",
  failed: "Échouées",
  pending: "En attente",
  draft: "Brouillons",
  refused: "Refusées"
};

const orderedStatuses = [
  "active",
  "success",
  "failed",
  "pending",
  "draft",
  "refused"
];

export function getCampaignStatusDistribution(): CampaignStatusDistributionItem[] {
  const campaigns = getCampaigns();

  return orderedStatuses
    .map((status) => ({
      label: statusLabels[status],
      value: campaigns.filter((campaign) => campaign.status === status).length
    }))
    .filter((item) => item.value > 0);
}
