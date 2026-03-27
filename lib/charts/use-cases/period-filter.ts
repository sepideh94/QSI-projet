export type PeriodFilter = "all" | "30d" | "90d" | "12m";

type ContributionWithDate = {
  date: string;
};

export const REFERENCE_DATE = new Date("2026-03-16T00:00:00.000Z");

function getPeriodStart(period: PeriodFilter, referenceDate: Date): Date | null {
  if (period === "all") {
    return null;
  }

  const startDate = new Date(referenceDate);

  if (period === "30d") {
    startDate.setDate(startDate.getDate() - 30);
    return startDate;
  }

  if (period === "90d") {
    startDate.setDate(startDate.getDate() - 90);
    return startDate;
  }

  startDate.setFullYear(startDate.getFullYear() - 1);
  return startDate;
}

export function filterContributionsByPeriod<T extends ContributionWithDate>(
  contributions: T[],
  period: PeriodFilter,
  referenceDate: Date = REFERENCE_DATE
): T[] {
  const startDate = getPeriodStart(period, referenceDate);

  if (startDate === null) {
    return contributions;
  }

  return contributions.filter((contribution) => {
    const contributionDate = new Date(contribution.date);
    return contributionDate >= startDate && contributionDate <= referenceDate;
  });
}
