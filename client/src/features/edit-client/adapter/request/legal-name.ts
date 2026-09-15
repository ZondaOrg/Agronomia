import type { EDIT_LEGAL_NAME } from "../api-contract"
import type { ClientRequest } from "./client"

export interface RazonSocialRequest extends ClientRequest {
    [EDIT_LEGAL_NAME.associateName]: string 
    [EDIT_LEGAL_NAME.associateSurname]: string 
    [EDIT_LEGAL_NAME.associatePhone]: string 
    type: "RAZON_SOCIAL"
}