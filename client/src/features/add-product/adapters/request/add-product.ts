import type { IvaRequest } from "./iva"

export interface AddProductRequest {
    name: string,
    type: string,
    money: "ARS" | "USD",
    listPrice: number,
    iva: IvaRequest,
    bonification: number,
    freight?: number
    description?: string,
    //options: OptionRequest[]
}

export interface OptionRequest {
    name: string 
    price: string
}