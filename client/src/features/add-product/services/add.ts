import http from "@/core/server/http-client";
import type { AddedProduct } from "../domain/product";
import { ADD_PATH } from "@/core/server/urls/url";
import type { AddProductSchema } from "../types/product/schema";
import { productRequestAdapter } from "../adapters/request/product/adapter";
import type { OptionalSchema } from "../types/optional/schema";

async function addProduct(productSchema: AddProductSchema, optionalsSchema: OptionalSchema[], providerId: string): Promise<AddedProduct> {
    const product = productRequestAdapter(productSchema, optionalsSchema);
    const addedProduct = await http.post(ADD_PATH(providerId), product);
    return addedProduct.data;
}

export default addProduct;