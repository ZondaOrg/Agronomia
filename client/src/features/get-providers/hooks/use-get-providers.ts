import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Provider } from "../types/Provider";
import getProvidersService from "../services/get-providers.service";
import type { Page } from "@/shared/types/page/Page";
import usePaginatedWithSerch from "@/shared/hooks/use-paginator/use-paginator-serch";

const EMPTY_ARGS: [] = [];

export const useGetProviders = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<Page<Provider>>();

    const fetchProviders = useCallback(
        (page: number, size: number, search: string) => {
            return execute(getProvidersService)(page, search);
        },
        [execute],
    );

    const { currentPage, search, handleChange, onSearch } =
        usePaginatedWithSerch(fetchProviders, 10, EMPTY_ARGS);

    return {
        data,
        error,
        loading: isLoading,
        currentPage,
        search,
        handlePageChange: handleChange,
        onSearch,
        refresh,
    };
};
