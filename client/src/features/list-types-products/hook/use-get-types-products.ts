import { useCallback } from "react";
import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import type { Page } from "@/shared/types/page/Page";
import type { ProductType } from "../types/ProductType";
import getTypesProducts from "../service/get-types-products.service";

export const useGetTypesProducts = () => {
    const adapterService = useCallback(
        (page: number, size: number) => getTypesProducts(page, size),
        [],
    );

    const {
        data,
        error,
        isLoading,
        currentPage,
        fetchPage,
        handlePageChange,
        refresh,
    } = usePaginatedFetch<Page<ProductType>, []>(adapterService, 9);

    const getTypes = useCallback(
        (page = 0, size = 9) => fetchPage(page, size),
        [fetchPage],
    );

    return {
        data,
        error,
        loading: isLoading,
        currentPage,
        getTypes,
        onPageChange: handlePageChange,
        refresh,
    };
};