import { Iva } from "@/shared/domain/iva/iva";
import type { OptionalSchema } from "../../../types/optionals/schema";
import type { EditProductSchema } from "../../../types/product/schema";
import { optionalsAdapter } from "../optional/adapter";
import type { EditProductRequest } from "./product";

export function editProductRequest(
    product: EditProductSchema, 
    toAdd: OptionalSchema[], 
    toDelete: number[]): EditProductRequest {
    const {listPrice, bonification, iva, freight, ...rest} = product;
    return {
        listPrice: Number(listPrice),
        bonification: Number(bonification),
        freight: Number(freight),
        iva: ivaAdapter(iva),
        optionalsToAdd: optionalsAdapter(toAdd),
        optionalsToDelete: toDelete,
        ...rest
    }
}

function ivaAdapter(iva: string) {
    if(iva == "21%") return Iva.GENERAL
    else return Iva.REDUCIDA
}