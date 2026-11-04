import http from "@/core/server/http-client";
import type { AddedProduct } from "../domain/product";
import { ADD_PATH } from "@/core/server/urls/url";
import type { AddProductSchema } from "../types/product/schema";
import { productRequestAdapter } from "../adapters/request/product/adapter";
import type { OptionalSchema } from "../types/optional/schema";
import type { ProductType } from "../domain/product-type";

async function addProduct(
    productSchema: AddProductSchema, 
    optionalsSchema: OptionalSchema[], 
    productTypes: ProductType[],
    providerId: string)
: Promise<AddedProduct> {
    const product = productRequestAdapter(productSchema, optionalsSchema, productTypes);
    const addedProduct = await http.post(ADD_PATH(providerId), product);
    return addedProduct.data;
}

export default addProduct;