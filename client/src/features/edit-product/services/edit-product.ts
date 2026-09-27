import http from "@/core/server/http-client";
import type { EditProduct } from "../domain/edit-product";
import type { OptionalSchema } from "../types/optionals/schema";
import type { EditProductSchema } from "../types/product/schema";
import { EDIT_TO } from "@/core/server/urls/url";
import { editProductRequest } from "../adapters/request/product/adapter";

export async function editProduct(
    product: EditProductSchema, 
    toAdd: OptionalSchema[], 
    toDelete: number[], 
    idProduct: string
): Promise<EditProduct> {
    const adapter = editProductRequest(product, toAdd, toDelete);
    const editedProduct = await http.put(EDIT_TO(idProduct), adapter);
    return editedProduct.data;
}