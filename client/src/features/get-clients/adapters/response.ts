import type { Client } from "../domain/client";
import type { Page } from "@/shared/types/page/Page";
import type { RazonSocial } from "../domain/razon-social";
import type { NaturalPerson } from "../domain/natural-person";

export type ClientResponse = NaturalPersonResponse | RazonSocialResponse;

export type NaturalPersonResponse = {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email?: string;
    cuit: string;
    address?: string;
    location: string;
    province: string;
}

export type RazonSocialResponse = {
    id: number;
    razonSocial: string;
    associateName: string;
    associateSurname: string;
    associatePhone: string;
    email?: string;
    cuit: string;
    address?: string;
    location: string;
    province: string;
}

function clientsAdapter(page: Page<ClientResponse>): Page<Client> {
    return {...page, content: page.content.map(clientAdapter)}
}

function clientAdapter(client: ClientResponse): Client {
    if("razonSocial" in client) return razonSocialAdapter(client);
    return naturalPersonAdapter(client);
}

function razonSocialAdapter(client: RazonSocialResponse): RazonSocial {
    return {
        id: client.id,
        cuit: client.cuit,
        razonSocial: client.razonSocial,
        name: client.associateName,
        surname: client.associateSurname,
        associatePhone: client.associatePhone,
        email: client.email,
        type: "RAZON_SOCIAL",
        ubication: {
            location: client.location,
            province: client.province,
            address: client.address,
        }
    }
}
function naturalPersonAdapter(client: NaturalPersonResponse): NaturalPerson {
    return {
        id: client.id,
        cuit: client.cuit,
        name: client.name,
        surname: client.surname,
        phone: client.phone,
        email: client.email,
        type: "NATURAL_PERSON",
        ubication: {
            location: client.location,
            province: client.province,
            address: client.address,
        }
    }
}

export default clientsAdapter;

