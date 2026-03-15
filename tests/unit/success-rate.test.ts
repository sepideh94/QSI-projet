import { getSuccessRate } from "@/lib/metrics/campaigns/success-rate";

describe("Feature: taux de succès global", () => {

  describe("Scenario: happy path", () => {

    it("should calculate success rate", () => {

      const campaigns = [
        { status: "success" },
        { status: "success" },
        { status: "failed" },
        { status: "success" }
      ];

      const result = getSuccessRate(campaigns);

      expect(result).toBe(75);

    });

  });

  describe("Scenario: no finished campaigns", () => {

    it("should return 0", () => {

      const campaigns = [
        { status: "active" },
        { status: "active" }
      ];

      const result = getSuccessRate(campaigns);

      expect(result).toBe(0);

    });

  });

});