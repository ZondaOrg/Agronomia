import type { IvaPorcents } from "@/shared/domain/iva/iva"
import type { Details } from "./details"

export interface Product {
    id: number 
    name: string 
    listPrice: number
    bonification: number
    freight: number 
    money: "ARS" | "USD"
    iva: IvaPorcents
    updateAt: Date
    details: Details
}