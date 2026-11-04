import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useCallback } from "react";
import type { Client } from "../domain/client";
import getClientsService from "../services/get-providers.service";
import type { Page } from "@/shared/types/page/Page";
import usePaginatedWithSerch from "@/shared/hooks/use-paginator/use-paginator-serch";

const EMPTY_ARGS: [] = [];

export const useGetClients = () => {
    const { data, error, isLoading, execute, refresh } = useFetch<Page<Client>>();
    
    const getClients = useCallback(
        (page: number, _: number, search: string) =>
            execute(getClientsService)(page, search),
        [execute],
    );

    const { currentPage, search, handleChange, onSearch } = usePaginatedWithSerch(getClients, 10, EMPTY_ARGS);
    
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
