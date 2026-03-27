import { getCampaigns } from "@/lib/database/in-memory-database";

export async function fetchCampaigns() {
  return getCampaigns();
}