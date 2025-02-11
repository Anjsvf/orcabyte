export const exchangeRates = {
  USD: 1, 
  BRL: 1, 
};

export function convertCurrency(amount: number, fromCurrency: "USD" | "BRL", toCurrency: "USD" | "BRL"): number {
  if (fromCurrency === toCurrency) return amount;

  const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  return Math.round(convertedAmount * 100) / 100; 
}

export function formatCurrency(value: number, currency: "USD" | "BRL"): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: currency,
  });
}