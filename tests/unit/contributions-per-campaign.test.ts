import { getContributionsPerCampaign } from "@/lib/metrics/contributions/contributions-per-campaign";

describe("Feature: contributions par campagne", () => {

  it("should calculate contributions for each campaign", () => {

    const result = getContributionsPerCampaign();

    const firstCampaign = result[0];

    expect(firstCampaign.contributions).toBeGreaterThanOrEqual(0);

  });

});