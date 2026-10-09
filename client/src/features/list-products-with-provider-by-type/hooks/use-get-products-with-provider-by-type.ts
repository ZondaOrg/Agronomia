import { useCallback } from "react";
import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import type { Table } from "@/shared/types/table/Table";
import getProductsWithProviderByType from "../service/get-products-with-provider-by-type.service";
import type { ProductWithProvider } from "../types/ProductWithProvider";

export const useGetProductsWithProviderByType = (typeId: number) => {
    const adapterService = useCallback(
        (page: number, size: number) =>
            getProductsWithProviderByType(typeId, page, size),
        [typeId],
    );

    const {
        data,
        error,
        isLoading,
        currentPage,
        fetchPage,
        handlePageChange,
        refresh,
    } = usePaginatedFetch<Table<ProductWithProvider>, []>(adapterService, 5);

    const getProducts = useCallback(
        (page = 0, size = 5) => fetchPage(page, size),
        [fetchPage],
    );

    return {
        data,
        error,
        loading: isLoading,
        currentPage,
        getProducts,
        onPageChange: handlePageChange,
        refresh,
    };
};