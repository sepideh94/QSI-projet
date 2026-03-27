import { getTargetAchievementRatePerCampaign } from "@/lib/charts/use-cases/get-target-achievement-rate-per-campaign";

describe("getTargetAchievementRatePerCampaign", () => {
  it("should return the target achievement rate for each campaign", () => {
    const result = getTargetAchievementRatePerCampaign();

    expect(result).toEqual([
      {
        label: "Financement des enclos extérieurs",
        value: 1
      },
      {
        label: "Extension du refuge animalier",
        value: 1
      },
      {
        label: "Campagne en préparation",
        value: 0
      },
      {
        label: "Réaménagement des espaces vétérinaires",
        value: 3
      }
    ]);
  });
});