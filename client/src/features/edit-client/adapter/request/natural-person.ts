import type { EDIT_NATURAL_PERSON } from "../api-contract";
import type { ClientRequest } from "./client";

export interface NaturalPersonRequest extends ClientRequest {
    [EDIT_NATURAL_PERSON.phoneNumber]: string,
    type: "NATURAL_PERSON"
}
