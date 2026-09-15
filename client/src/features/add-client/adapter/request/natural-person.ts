import type { ADD_NATURAL_CLIENT } from "../api-contract";
import type { ClientRequest } from "./client";

export interface NaturalPersonRequest extends ClientRequest {
    [ADD_NATURAL_CLIENT.name]: string,
    [ADD_NATURAL_CLIENT.surname]: string,
    [ADD_NATURAL_CLIENT.phone]: string,
    [ADD_NATURAL_CLIENT.cuit]: string,
    [ADD_NATURAL_CLIENT.location]: string,
    [ADD_NATURAL_CLIENT.province]: string,
    [ADD_NATURAL_CLIENT.email]?: string,
    [ADD_NATURAL_CLIENT.address]?: string,
    type: "NATURAL_PERSON"
}
