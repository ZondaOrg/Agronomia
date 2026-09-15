import { ClientOption } from "../../../shared/domain/client/client";
import type { ClientSchema } from "./client-schema";
import type { RazonSocialRequest } from "./legal-name";
import type { NaturalPersonRequest } from "./natural-person";

export type ClientRequest = NaturalPersonRequest | RazonSocialRequest

export function clientRequestAdapter(schema: ClientSchema): ClientRequest {
    if("razonSocial" in schema) {
        return {
            ...schema,
            type: ClientOption.LEGAL_NAME
        }
    }
    return {
        ...schema,
        type: ClientOption.NATURAL_PERSON
    }
}