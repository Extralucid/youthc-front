export function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "XOF",
    }).format(value);
  }