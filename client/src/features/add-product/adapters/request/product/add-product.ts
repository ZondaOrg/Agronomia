import type { Iva } from "@/shared/domain/iva/iva"
import type { OptionalRequest } from "../optional/optional"
import type { MoneyRequest } from "./money"

export interface AddProductRequest {
    name: string,
    type: string,
    money: MoneyRequest,
    listPrice: number,
    iva: Iva,
    bonification: number,
    freight?: number
    description?: string,
    optionals: OptionalRequest[]
}