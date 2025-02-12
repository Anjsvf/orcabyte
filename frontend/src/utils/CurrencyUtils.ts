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

export const calculateDaysDifference = (deadline: string): number => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = Math.abs(deadlineDate.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Diferença em dias
};

export const applyUrgencyFactor = (daysDifference: number, baseCost: number): number => {
  if (daysDifference <= 15) {
    return baseCost * 1.5; // Aumento de 50% para prazos muito curtos
  } else if (daysDifference <= 30) {
    return baseCost * 1.2; // Aumento de 20% para prazos moderados
  }
  return baseCost; // Sem aumento para prazos longos
};