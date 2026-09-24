import usePaginatedWithSerch from "@/shared/hooks/use-paginator/use-paginator-serch";
import { getProducts } from "../services/get-products";
import { useParams } from "react-router";
import { useCallback, useMemo } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Table } from "@/shared/types/table/Table";
import type { Product } from "../domain/product";

const useGetPageOfProducts = () => {
    const { data, execute } = useFetch<Table<Product>>()
    const { idProvider } = useParams();
    const fetchProducts = useCallback(
        (page: number, size: number, search: string, providerId: string) =>
            execute(getProducts)(page, size, search, providerId),
        [execute],
    );
    const searchArgs = useMemo(() => [idProvider!] as [string], [idProvider]);
    const { currentPage, search, onChangePage, onSearch, handleChange } = 
        usePaginatedWithSerch(fetchProducts, 5, searchArgs);
    
    return { data, currentPage, search, onChangePage, onSearch, handleChange }
}

export default useGetPageOfProducts;
