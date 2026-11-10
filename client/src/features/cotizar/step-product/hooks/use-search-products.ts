import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import searchProductsService from "../services/search-products.service";
import type { ProductOption } from "../domain/product-option";

export const useSearchProducts = () => {
    const { data, isLoading, execute } = useFetch<ProductOption[]>();

    const search = useCallback(
        (providerId: number, text: string) =>
            execute(searchProductsService)(providerId, text),
        [execute],
    );

    return { data, loading: isLoading, search };
};
