import type { Details } from "./details"

export type Product = {
    name: string 
    listPrice: number
    bonification: number
    freight: number 
    money: "ARS" | "USD"
    iva: "21%" | "10,5%" | "27%"
    updateAt: Date
    details: Details
}