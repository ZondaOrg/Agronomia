import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import getQuoteProductService from "../services/get-quote-product.service";
import type { QuoteProduct } from "../domain/quote-product";

export const useQuoteProduct = () => {
    const { data, isLoading, execute, refresh } = useFetch<QuoteProduct>();

    const get = useCallback(
        (productId: number) => execute(getQuoteProductService)(productId),
        [execute],
    );

    return { data, loading: isLoading, get, reset: refresh };
};
