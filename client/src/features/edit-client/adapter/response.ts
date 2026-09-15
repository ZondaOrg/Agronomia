import { ClientOption } from "@/shared/domain/client/client";
import type { Client } from "../domain/client";

type ClientResponseBase = {
    id: number
    cuit: string 
    address?: string 
    email?: string
    location: string 
    province: string
    type: ClientOption
}

type RazonSocialResponse = ClientResponseBase & {
    razonSocial: string
    associateName: string
    associateSurname: string
    associatePhone: string
    type: "RAZON_SOCIAL"
}

type NaturalPersonResponse = ClientResponseBase & {
    name: string
    surname: string
    phone: string
    type: "NATURAL_PERSON"
}

export type ClientResponse = RazonSocialResponse | NaturalPersonResponse


export function clientResponseAdapter(
    response: ClientResponse,
): Client {
    switch (response.type) {
        case ClientOption.NATURAL_PERSON:
            return {
                completeName: {
                    name: response.name,
                    surname: response.surname,
                },
                ...response
            };

        case ClientOption.LEGAL_NAME:
            return {
                completeName: {
                    name: response.associateName,
                    surname: response.associateSurname,
                },
                ...response
            };
    }
}
