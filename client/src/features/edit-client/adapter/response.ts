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
    const {id, cuit, address, email, location, province} = response;
    switch (response.type) {
        case ClientOption.NATURAL_PERSON:
            return {
                completeName: {
                    name: response.name,
                    surname: response.surname,
                },
                phone: response.phone,
                id,
                cuit,
                address,
                email,
                location,
                province,
                type: "NATURAL_PERSON"
            };

        case ClientOption.LEGAL_NAME:
            return {
                associatePerson: {
                    completeName: {
                        name: response.associateName,
                        surname: response.associateSurname,
                    },
                    phone: response.associatePhone
                },
                id,
                cuit,
                address,
                email,
                location,
                province,
                razonSocial: response.razonSocial,
                type: "RAZON_SOCIAL"
            };
    }
}
