import http from "@/core/server/http-client";
import type { AddedProduct } from "../domain/product";
import { ADD_PATH } from "@/core/server/urls/url";
import type { AddProductSchema } from "../types/product/schema";
import { requestAdapter } from "../adapters/request/product/request";
import type { OptionalSchema } from "../types/optional/schema";

async function addProduct(schema: AddProductSchema, optionals: OptionalSchema[], providerId: string): Promise<AddedProduct> {
    const product = requestAdapter(schema);
    const addedProduct = await http.post(ADD_PATH(providerId), product);
    return addedProduct.data;
}

export default addProduct;