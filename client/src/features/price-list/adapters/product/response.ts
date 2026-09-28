import type { Iva } from "@/shared/domain/iva/iva"
import type { Optional } from "../../domain/optional"

export interface ProductResponse {
    id: number 
    name: string 
    listPrice: number
    bonification: number
    freight: number 
    money: "ARS" | "USD"
    iva: Iva
    updateAt: Date
    details: DetailsResponse
}

export interface DetailsResponse {
    description: string
    optionals: OptionalResponse[]
} 

export type OptionalResponse = Optional