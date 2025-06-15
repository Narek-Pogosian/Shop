export function getTotalPrice<T extends { quantity: number; price: number }>(
  arr: T[],
) {
  return arr.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
}

export function formatPrice(amount: number, { showZeroAsNumber = false } = {}) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });

  if (amount === 0 && !showZeroAsNumber) return "Free";
  return formatter.format(amount);
}
