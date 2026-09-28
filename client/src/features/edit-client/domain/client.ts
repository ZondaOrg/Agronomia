import type { ClientOption } from "@/shared/domain/client/client"
import type { NaturalPerson } from "./natural-person"
import type { RazonSocial } from "./razon-social"

export type ClientBase = {
    id: number
    readonly cuit: string,
    location: string
    province: string
    address?: string
    email?: string | null
    type: ClientOption
}


export type Client = NaturalPerson | RazonSocial