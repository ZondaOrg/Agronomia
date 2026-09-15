import type { ADD_LEGAL_NAME } from "./api-contract"

export type RazonSocialRequest = {
    [ADD_LEGAL_NAME.cuit]: string
    [ADD_LEGAL_NAME.razonSocial]: string
    [ADD_LEGAL_NAME.location]: string 
    [ADD_LEGAL_NAME.province]: string 
    [ADD_LEGAL_NAME.associateName]: string 
    [ADD_LEGAL_NAME.associateSurname]: string 
    [ADD_LEGAL_NAME.associatePhone]: string 
    [ADD_LEGAL_NAME.email]?: string | null 
    [ADD_LEGAL_NAME.address]?: string
    type: "RAZON_SOCIAL"
}