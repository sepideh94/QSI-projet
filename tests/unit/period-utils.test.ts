import {
  filterContributionsByPeriod,
  REFERENCE_DATE
} from "@/lib/charts/period-utils";
import { mockContributions } from "@/mocks/contributions";

describe("filterContributionsByPeriod", () => {
  it("should return all contributions when period is all", () => {
    const result = filterContributionsByPeriod(
      mockContributions,
      "all",
      REFERENCE_DATE
    );

    expect(result).toHaveLength(10);
  });

  it("should return only contributions from the last 30 days", () => {
    const result = filterContributionsByPeriod(
      mockContributions,
      "30d",
      REFERENCE_DATE
    );

    expect(result.map((item) => item.id)).toEqual(["ct1", "ct2", "ct7"]);
  });

  it("should return only contributions from the last 90 days", () => {
    const result = filterContributionsByPeriod(
      mockContributions,
      "90d",
      REFERENCE_DATE
    );

    expect(result.map((item) => item.id)).toEqual([
      "ct1",
      "ct2",
      "ct3",
      "ct5",
      "ct7",
      "ct8"
    ]);
  });

  it("should return only contributions from the last 12 months", () => {
    const result = filterContributionsByPeriod(
      mockContributions,
      "12m",
      REFERENCE_DATE
    );

    expect(result.map((item) => item.id)).toEqual([
      "ct1",
      "ct2",
      "ct3",
      "ct4",
      "ct5",
      "ct7",
      "ct8",
      "ct9"
    ]);
  });
});