export const isValidDolarPrice = (dolarPrice: number): boolean =>
    Number.isFinite(dolarPrice) && dolarPrice > 0;
