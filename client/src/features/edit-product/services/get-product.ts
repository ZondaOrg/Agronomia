import http from "@/core/server/http-client";
import type { Product } from "../domain/product";
import { FIND_BY } from "@/core/server/urls/url";

export async function getProduct(id: string): Promise<Product> {
    const product = await http.get(FIND_BY(id));
    return product.data;
}

export default getProduct;