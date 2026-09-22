import type { OptionalSchema } from "@/features/add-product/types/optional/schema";
import type { AddProductSchema } from "../../../types/product/schema";
import type { AddProductRequest } from "./add-product";
import optionalsRequestAdapter from "../optional/adapter";

export function productRequestAdapter(productSchema: AddProductSchema, optionalsSchema: OptionalSchema[]): AddProductRequest {
    return {
        name: productSchema.name,
        type: productSchema.type,
        money: productSchema.money,
        listPrice: Number(productSchema.listPrice),
        iva: productSchema.iva === "21%" ? "GENERAL" : "REDUCIDA",
        bonification: Number(productSchema.bonification),
        freight: Number(productSchema.freight),
        description: productSchema.description,
        optionals: optionalsRequestAdapter(optionalsSchema)
    }
}