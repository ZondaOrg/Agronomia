import type { Ubication } from "../types/ubication";

export type NaturalPerson = {
    id: number;
    cuit: string;
    ubication: Ubication;
    name: string;
    surname: string;
    phone: string;
    email?: string;
    type: "NATURAL_PERSON"
}