import http from "@/core/server/http-client";
import { GET_ALL_PATH } from "@/core/server/urls/product-type";
import adapterProductRequest from "../adapters/response/product-type/adapter";
import type { ProductType } from "../domain/product-type";

export async function getAllTypes(): Promise<ProductType[]> {
    const productTypes = await http.get(GET_ALL_PATH);
    return adapterProductRequest(productTypes.data);
}