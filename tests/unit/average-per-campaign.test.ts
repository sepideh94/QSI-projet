import { getAverageContributionsPerCampaign } from "@/lib/metrics/contributions/average-per-campaign";
import { mockCampaigns } from "@/mocks/campaigns";
import { mockContributions } from "@/mocks/contributions";

describe("getAverageContributionsPerCampaign", () => {
  it("should return the rounded average number of contributions per campaign", () => {
    const result = getAverageContributionsPerCampaign(
      mockContributions,
      mockCampaigns
    );

    expect(result).toBe(3);
  });

  it("should return 0 when there are no campaigns", () => {
    const result = getAverageContributionsPerCampaign(mockContributions, []);

    expect(result).toBe(0);
  });

  it("should ignore contributions linked to unknown campaigns", () => {
    const result = getAverageContributionsPerCampaign(
      [
        ...mockContributions,
        {
          id: "extra-1",
          campaignId: "unknown-campaign",
          amount: 100,
          contributorId: "user-x",
          date: "2026-01-10"
        }
      ],
      mockCampaigns
    );

    expect(result).toBe(3);
  });
});