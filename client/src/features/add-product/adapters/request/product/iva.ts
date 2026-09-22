export const Iva = {
    GENERAL: "GENERAL",
    REDUCIDA: "REDUCIDA"
} as const 

export type IvaRequest = typeof Iva[keyof typeof Iva]