import type { ClientBase } from "./client"
import type { CompleteName } from "./complete-name"

export type NaturalPerson = ClientBase & {
    phone: string 
    type: "NATURAL_PERSON"
    completeName: CompleteName
}