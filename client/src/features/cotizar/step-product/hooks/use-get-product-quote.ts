import { useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import getQuoteProductService from "../services/get-quote-product.service";
import type { QuoteProduct } from "../domain/quote-product";

export const useGetProductQuote = (productId: string | undefined) => {
    const { data, isLoading, execute, refresh } = useFetch<QuoteProduct>();

    useEffect(() => {
        if (productId) execute(getQuoteProductService)(Number(productId));
    }, [productId, execute]);

    const detail = data && String(data.id) === productId ? data : undefined;

    return { detail, loading: isLoading, reset: refresh };
};
