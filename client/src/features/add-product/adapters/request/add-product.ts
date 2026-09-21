export interface AddProductRequest {
    name: string,
    type: string,
    money: string,
    listPrice: number,
    iva: string,
    bonification: number,
    freight?: number
    description?: string,
    //options: OptionRequest[]
}

export interface OptionRequest {
    name: string 
    price: string
}