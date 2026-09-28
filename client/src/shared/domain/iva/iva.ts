export const ivaPorcents = ["21%", "10,5%"] as const;

export const ivaKeys = {
    [ivaPorcents[0]]: "21%",
    [ivaPorcents[1]]: "10,5%",
} as const

export type IvaPorcents = typeof ivaKeys;

export const Iva = {
    GENERAL: "GENERAL",
    REDUCIDA: "REDUCIDA",
} as const 

export type Iva = typeof Iva[keyof typeof Iva]