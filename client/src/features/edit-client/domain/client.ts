import type { CompleteName } from "./complete-name"

export interface Client {
    id: number
    cuit: string,
    address?: string
    location: string
    province: string
    completeName: CompleteName
    email?: string | null
}