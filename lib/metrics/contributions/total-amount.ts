type Contribution = {
  amount: number;
};

export function getTotalAmount(contributions: Contribution[]): number {
  return contributions.reduce((total, contribution) => {
    return total + contribution.amount;
  }, 0);
}