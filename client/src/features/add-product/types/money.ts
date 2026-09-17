export const moneys = ["ARS", "USD"] as const;

export const moneyKeys = {
    [moneys[0]]: "ARS",
    [moneys[1]]: "USD"
} as const

export type Money = typeof moneyKeys;
