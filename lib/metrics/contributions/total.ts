type Contribution = {
  amount: number;
};

export function countTotalContributions(contributions: Contribution[]): number {
  return contributions.length;
}