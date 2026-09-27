import type { Optional } from "./optional"

export interface Product {
    id: number 
    name: string
    type: string 
    money: "USD" | "ARS"
    listPrice: string 
    bonification: string 
    freight: string
    iva: "21%" | "10,5%"
    description?: string
    updateAt: string 
    optionals: Optional[]
}