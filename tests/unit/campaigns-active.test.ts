import { countActiveCampaigns } from "@/lib/metrics/campaigns/active";

describe("Feature: campagnes actives", () => {

  describe("Scenario: happy path", () => {

    it("should count active campaigns", () => {

      const campaigns = [
        { status: "active" },
        { status: "active" },
        { status: "brouillon" }
      ];

      const result = countActiveCampaigns(campaigns);

      expect(result).toBe(2);

    });

  });

  describe("Scenario: no active campaigns", () => {

    it("should return 0 when there are no active campaigns", () => {

      const campaigns = [
        { status: "brouillon" },
        { status: "refusee" }
      ];

      const result = countActiveCampaigns(campaigns);

      expect(result).toBe(0);

    });

  });

});