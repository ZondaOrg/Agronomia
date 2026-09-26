import type { IvaPorcents } from "@/shared/domain/iva/iva"
import type { Money } from "@/shared/domain/money/money"
import type { Optional } from "./optional"

export interface Product {
    id: number 
    name: string
    type: string 
    money: Money
    listPrice: number 
    bonification: number 
    freight: number
    iva: IvaPorcents
    description?: string
    updateAt: Date 
    optionals: Optional[]
}