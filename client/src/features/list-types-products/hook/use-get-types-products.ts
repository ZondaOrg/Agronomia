import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Page } from "@/shared/types/page/Page";
import type { ProductType } from "../types/ProductType";
import getTypesProducts from "../service/get-types-products.service";

export const useGetTypesProducts = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<Page<ProductType>>();

    const getTypes = useCallback(
        (page: number, size: number) =>
            execute(getTypesProducts)(page, size),
        [execute],
    );

    return {
        data,
        error,
        loading: isLoading,
        getTypes,
        refresh,
    };
};