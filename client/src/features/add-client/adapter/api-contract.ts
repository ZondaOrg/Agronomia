export const BASE_CLIENT = {
    cuit: "cuit",
    location: "location",
    province: "province",
    email: "email",
    address: "address",
} as const

export const ADD_NATURAL_CLIENT = {
    name: "name",
    surname: "surname",
    phone: "phone",
    ...BASE_CLIENT
} as const

export const ADD_LEGAL_NAME = {
    razonSocial: "razonSocial",
    associateName: "associateName",
    associateSurname: "associateSurname",
    associatePhone: "associatePhone",
    ...BASE_CLIENT
} as const