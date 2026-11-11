import http from "@/core/server/http-client";
import { PRODUCT_QUOTE } from "@/core/server/urls/product";
import type { QuoteProduct } from "../domain/quote-product";
import {
    quoteProductAdapter,
    type QuoteProductResponse,
} from "../adapters/response/quote-product";

async function getQuoteProduct(productId: number): Promise<QuoteProduct> {
    const response = await http.get<QuoteProductResponse>(PRODUCT_QUOTE(productId));
    return quoteProductAdapter(response.data);
}

export default getQuoteProduct;
