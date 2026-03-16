import { getAmountCollectedPerCampaign } from "@/lib/charts/amount-collected-per-campaign";

describe("getAmountCollectedPerCampaign", () => {
  it("should return the collected amount for each campaign", () => {
    const result = getAmountCollectedPerCampaign();

    expect(result).toEqual([
      {
        label: "Financement des enclos extérieurs",
        value: 220
      },
      {
        label: "Extension du refuge animalier",
        value: 200
      },
      {
        label: "Campagne en préparation",
        value: 30
      },
      {
        label: "Réaménagement des espaces vétérinaires",
        value: 480
      }
    ]);
  });
});