import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { useCallback } from "react";
import type { ClientFilterPayload } from "../service/get-clientes-by-type-and-name.service";
import type { Client } from "../types/client";
import getClientsByTypeAndNameService from "../service/get-clientes-by-type-and-name.service";

export const useGetClientsByTypeAndName = () => {
    const { data, error, isLoading, execute, refresh } = useFetch<Client[]>();

    const getClientsByTypeAndName = useCallback(
        (filter: ClientFilterPayload) =>
            execute(getClientsByTypeAndNameService)(filter),
        [execute],
    );

    return {
        data,
        error,
        loading: isLoading,
        getClientsByTypeAndName,
        refresh,
    };
};
