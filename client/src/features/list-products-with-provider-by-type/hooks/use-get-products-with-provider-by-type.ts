import { useCallback, useMemo } from "react";
import usePaginatedWithSerch from "@/shared/hooks/use-paginator/use-paginator-serch";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Table } from "@/shared/types/table/Table";
import getProductsWithProviderByType from "../service/get-products-with-provider-by-type.service";
import type { ProductWithProvider } from "../types/ProductWithProvider";

export const useGetProductsWithProviderByType = (typeId: number) => {
    const { data, execute } = useFetch<Table<ProductWithProvider>>();
    const fetchProducts = useCallback(
        (page: number, size: number, search: string, productTypeId: number) =>
            execute(getProductsWithProviderByType)(
                productTypeId,
                page,
                size,
                search,
            ),
        [execute],
    );
    const searchArgs = useMemo(() => [typeId] as [number], [typeId]);
    const { currentPage, search, onChangePage, onSearch, handleChange } =
        usePaginatedWithSerch(fetchProducts, 5, searchArgs);

    return {
        data,
        currentPage,
        search,
        onSearch,
        onChangePage,
        handleChange,
    };
};