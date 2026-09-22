import http from "@/core/server/http-client";
import type { ProductType } from "../domain/product-type";
import { GET_ALL_PATH } from "@/core/server/urls/product-type";

export async function getAllTypes(): Promise<ProductType[]> {
    const productTypes = await http.get(GET_ALL_PATH);
    return productTypes.data;
}