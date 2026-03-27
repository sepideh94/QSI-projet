import { getCampaignStatusDistribution } from "@/lib/charts/use-cases/get-campaign-status-distribution";

describe("getCampaignStatusDistribution", () => {
  it("should return the number of campaigns by status", () => {
    const result = getCampaignStatusDistribution();

    expect(result).toEqual([
      {
        label: "Actives",
        value: 1
      },
      {
        label: "Réussies",
        value: 2
      },
      {
        label: "Échouées",
        value: 1
      }
    ]);
  });
});