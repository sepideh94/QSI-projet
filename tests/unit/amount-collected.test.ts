import { getTotalAmount } from "@/lib/metrics/contributions/total-amount";

describe("Feature: montant collecté total", () => {

  describe("Scenario: happy path", () => {

    it("should sum contribution amounts", () => {

      const contributions = [
        { amount: 50 },
        { amount: 100 },
        { amount: 20 }
      ];

      const result = getTotalAmount(contributions);

      expect(result).toBe(170);

    });

  });

  describe("Scenario: no contributions", () => {

    it("should return 0 when there are no contributions", () => {

      const contributions: { amount: number }[] = [];

      const result = getTotalAmount(contributions);

      expect(result).toBe(0);

    });

  });

});