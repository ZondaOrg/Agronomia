import http from "@/core/server/http-client";
import type { AddedProduct } from "../domain/product";
import { ADD_PATH } from "@/core/server/urls/url";
import type { AddProductSchema } from "../types/schema";
import { requestAdapter } from "../adapters/request/request";

async function addProduct(schema: AddProductSchema, providerId: string): Promise<AddedProduct> {
    const product = requestAdapter(schema);
    const addedProduct = await http.post(ADD_PATH(providerId), product);
    return addedProduct.data;
}

export default addProduct;