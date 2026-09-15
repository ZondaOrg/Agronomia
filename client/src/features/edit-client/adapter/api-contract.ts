export const EDIT_CLIENT = {
    email: "email",
    address: "address",
    locate: "locate",
    province: "province"
} as const 

export const EDIT_NATURAL_PERSON = {
    phoneNumber: "phoneNumber",
    ...EDIT_CLIENT
} as const

export const EDIT_LEGAL_NAME = {
    associateName: "associateName",
    associateSurname: "associateSurname",
    associatePhone: "associatePhone",
    ...EDIT_CLIENT
} as const