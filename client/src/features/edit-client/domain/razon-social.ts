import type { ClientBase } from "./client"
import type { CompleteName } from "./complete-name"

export type RazonSocial = ClientBase & {
    readonly razonSocial: string
    associatePerson: AssociatePerson
    type: "RAZON_SOCIAL"
}

interface AssociatePerson {
    completeName: CompleteName
    phone: string
}