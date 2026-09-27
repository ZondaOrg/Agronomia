import type { Iva } from "@/shared/domain/iva/iva"
import type { OptionalRequest } from "../optional/optional"

export type EditProductRequest = {
    money: "ARS" | "USD",
    listPrice: number
    iva: Iva
    bonification: number 
    optionalsToAdd: OptionalRequest[]
    optionalsToDelete: number[]
    freight?: number
    description?: string
}