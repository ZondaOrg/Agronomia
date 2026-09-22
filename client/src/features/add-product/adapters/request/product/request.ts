import type { AddProductSchema } from "../../../types/product/schema";
import type { AddProductRequest } from "./add-product";

export function requestAdapter(schema: AddProductSchema): AddProductRequest {
    return {
        name: schema.name,
        type: schema.type,
        money: schema.money,
        listPrice: Number(schema.listPrice),
        iva: schema.iva === "21%" ? "GENERAL" : "REDUCIDA",
        bonification: Number(schema.bonification),
        freight: Number(schema.freight),
        description: schema.description,
    }
}