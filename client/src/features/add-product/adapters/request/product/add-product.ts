import type { OptionalRequest } from "../optional/optional"
import type { IvaRequest } from "./iva"
import type { MoneyRequest } from "./money"

export interface AddProductRequest {
    name: string,
    type: string,
    money: MoneyRequest,
    listPrice: number,
    iva: IvaRequest,
    bonification: number,
    freight?: number
    description?: string,
    optionals: OptionalRequest[]
}