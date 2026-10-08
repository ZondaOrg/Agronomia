import http from "@/core/server/http-client";
import { GET_ALL_PATH } from "@/core/server/urls/product-type";
import type { ProductType } from "@/features/list-types-products/types/ProductType";
import type { TypeProductRequest } from "../adapter/TypeProductRequest";

const addTypeProduct = async (
    request: TypeProductRequest,
): Promise<ProductType> => {
    const response = await http.post<ProductType>(GET_ALL_PATH, request);
    return response.data;
};

export default addTypeProduct;
