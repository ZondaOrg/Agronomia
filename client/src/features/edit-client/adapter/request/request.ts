import { ClientOption } from "../../../../shared/domain/client/client";
import type { ClientRequest } from "./client";


export function clientRequestAdapter(schema: Omit<ClientRequest, "type">): ClientRequest {
    if("associateName" in schema) {
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