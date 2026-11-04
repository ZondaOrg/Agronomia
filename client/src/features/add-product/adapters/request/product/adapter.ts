import type { OptionalSchema } from "@/features/add-product/types/optional/schema";
import type { AddProductSchema } from "../../../types/product/schema";
import type { AddProductRequest } from "./add-product";
import optionalsRequestAdapter from "../optional/adapter";
import { Iva } from "./iva";
import type { ProductType } from "@/features/add-product/domain/product-type";

export function productRequestAdapter(
    productSchema: AddProductSchema, 
    optionalsSchema: OptionalSchema[], 
    productTypes: ProductType[]
): AddProductRequest {
    return {
        name: productSchema.name,
        type: productTypes.find(type => type.name === productSchema.type)?.id,
        money: productSchema.money,
        listPrice: Number(productSchema.listPrice),
        iva: adapterIva(productSchema.iva),
        bonification: Number(productSchema.bonification),
        freight: Number(productSchema.freight),
        description: productSchema.description,
        optionals: optionalsRequestAdapter(optionalsSchema)
    }
}

function adapterIva(iva: string) {
    if(iva === "21%") return Iva.GENERAL
    else              return Iva.REDUCIDA
}