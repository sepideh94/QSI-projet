import {
  filterContributionsByPeriod,
  REFERENCE_DATE
} from "@/lib/charts/use-cases/period-filter";
import { getContributions } from "@/lib/database/in-memory-database";

describe("filterContributionsByPeriod", () => {
  const contributions = getContributions();

  it("should return all contributions when period is all", () => {
    const result = filterContributionsByPeriod(
      contributions,
      "all",
      REFERENCE_DATE
    );

    expect(result).toHaveLength(10);
  });

  it("should return only contributions from the last 30 days", () => {
    const result = filterContributionsByPeriod(
      contributions,
      "30d",
      REFERENCE_DATE
    );

    expect(result.map((item) => item.id)).toEqual(["ct1", "ct2", "ct7"]);
  });

  it("should return only contributions from the last 90 days", () => {
    const result = filterContributionsByPeriod(
      contributions,
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
      contributions,
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