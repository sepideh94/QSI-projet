import { getAverageContributionsPerCampaign } from "@/lib/metrics/contributions/average-per-campaign";
import {
  getCampaigns,
  getContributions
} from "@/lib/database/in-memory-database";

describe("getAverageContributionsPerCampaign", () => {
  const campaigns = getCampaigns();
  const contributions = getContributions();

  it("should return the rounded average number of contributions per campaign", () => {
    const result = getAverageContributionsPerCampaign(
      contributions,
      campaigns
    );

    expect(result).toBe(3);
  });

  it("should return 0 when there are no campaigns", () => {
    const result = getAverageContributionsPerCampaign(contributions, []);

    expect(result).toBe(0);
  });

  it("should ignore contributions linked to unknown campaigns", () => {
    const result = getAverageContributionsPerCampaign(
      [
        ...contributions,
        {
          id: "extra-1",
          campaignId: "unknown-campaign",
          amount: 100,
          contributorId: "user-x",
          date: "2026-01-10"
        }
      ],
      campaigns
    );

    expect(result).toBe(3);
  });
});