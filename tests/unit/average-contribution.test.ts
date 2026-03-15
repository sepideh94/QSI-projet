import { getAverageContributionAmount } from "@/lib/metrics/contributions/average-amount";

describe("Feature: contribution moyenne", () => {

  describe("Scenario: happy path", () => {

    it("should calculate average contribution amount", () => {

      const contributions = [
        { amount: 50 },
        { amount: 100 },
        { amount: 150 }
      ];

      const result = getAverageContributionAmount(contributions);

      expect(result).toBe(100);

    });

  });

  describe("Scenario: no contributions", () => {

    it("should return 0", () => {

      const contributions: { amount: number }[] = [];

      const result = getAverageContributionAmount(contributions);

      expect(result).toBe(0);

    });

  });

});