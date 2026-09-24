import usePaginatedWithSerch from "@/shared/hooks/use-paginator/use-paginator-serch";
import { getProducts } from "../services/get-products";
import { useParams } from "react-router";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Table } from "@/shared/types/table/Table";
import type { Product } from "../domain/product";

const useGetPageOfProducts = () => {
    const { data, execute, refresh } = useFetch<Table<Product>>()
    const { idProvider } = useParams();
    const { currentPage, search, onChangePage, onSearch, handleChange } = 
        usePaginatedWithSerch(execute(getProducts), 5, [idProvider!]);
    
    return { data, refresh, currentPage, search, onChangePage, onSearch, handleChange }
}

export default useGetPageOfProducts;