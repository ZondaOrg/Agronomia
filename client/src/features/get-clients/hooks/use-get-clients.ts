import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useCallback } from "react";
import type { Client } from "../domain/client";
import getClientsService from "../services/get-providers.service";
import type { Page } from "@/shared/types/page/Page";

export const useGetClients = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<Page<Client>>();
    const getClients = useCallback(
        (page: number, search: string) =>
            execute(getClientsService)(page, search),
        [execute],
    );

    return {
        data,
        error,
        loading: isLoading,
        getClients,
        refresh,
    };
};
