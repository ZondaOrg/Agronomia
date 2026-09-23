export const iva = ["21%", "10,5%", "27%"] as const;

export const ivaKeys = {
    [iva[0]]: "21%",
    [iva[1]]: "10,5%",
    [iva[2]]: "27%"
} as const

export type Iva = typeof ivaKeys;