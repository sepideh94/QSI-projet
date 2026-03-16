type Contribution = {
  amount: number;
};

export function getAverageContributionAmount(contributions: Contribution[]): number {
  if (contributions.length === 0) {
    return 0;
  }

  const totalAmount = contributions.reduce((sum, contribution) => {
    return sum + contribution.amount;
  }, 0);

  return Math.round(totalAmount / contributions.length);
}