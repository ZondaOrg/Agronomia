export const Iva = {
    GENERAL: "GENERAL",
    REDUCIDA: "REDUCIDA",
    INCREMENTADA: "INCREMENTADA"
} as const 

export type IvaRequest = typeof Iva[keyof typeof Iva]