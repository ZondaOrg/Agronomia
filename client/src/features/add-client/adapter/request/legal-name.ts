import type { ADD_LEGAL_NAME } from "../api-contract"
import type { ClientRequest } from "./client"

export interface RazonSocialRequest extends ClientRequest {
    [ADD_LEGAL_NAME.razonSocial]: string
    [ADD_LEGAL_NAME.associateName]: string 
    [ADD_LEGAL_NAME.associateSurname]: string 
    [ADD_LEGAL_NAME.associatePhone]: string 
    type: "RAZON_SOCIAL"
}