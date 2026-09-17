export interface AddProductRequest {
    name: string,
    type: string,
    money: string,
    listPrice: string,
    iva: string,
    bonification: string,
    freight?: string
    description?: string,
    //options: OptionRequest[]
}

export interface OptionRequest {
    name: string 
    price: string
}