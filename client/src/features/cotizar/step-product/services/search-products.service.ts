import http from "@/core/server/http-client";
import { PRODUCT_SEARCH_BY_PROVIDER } from "@/core/server/urls/product";
import type { ProductOption } from "../domain/product-option";
import { optionsAdapter, type OptionResponse } from "../adapters/response/options";

async function searchProducts(
    providerId: number,
    search: string,
): Promise<ProductOption[]> {
    const response = await http.get<OptionResponse[]>(
        PRODUCT_SEARCH_BY_PROVIDER(providerId),
        { params: { search } },
    );
    return optionsAdapter(response.data);
}

export default searchProducts;
