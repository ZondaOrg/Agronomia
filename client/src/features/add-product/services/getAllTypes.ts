import http from "@/core/server/http-client";
import { GET_ALL_PATH } from "@/core/server/urls/product-type";
import adapterProductRequest from "../adapters/response/product-type/adapter";

export async function getAllTypes(): Promise<string[]> {
    const productTypes = await http.get(GET_ALL_PATH);
    return adapterProductRequest(productTypes.data);
}