import { countTotalContributions } from "@/lib/metrics/contributions/total";

describe("Feature: contributions totales", () => {

  describe("Scenario: happy path", () => {

    it("should count total contributions", () => {

      const contributions = [
        { amount: 50 },
        { amount: 100 },
        { amount: 20 }
      ];

      const result = countTotalContributions(contributions);

      expect(result).toBe(3);

    });

  });

  describe("Scenario: no contributions", () => {

    it("should return 0 when there are no contributions", () => {

      const contributions: { amount: number }[] = [];

      const result = countTotalContributions(contributions);

      expect(result).toBe(0);

    });

  });

});