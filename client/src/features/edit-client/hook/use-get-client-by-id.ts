import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { getClientById as getClientByIdService } from "../service/get-client-by-id.service";
import type { Client } from "../domain/client";

export const useGetClientById = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<Client>();
    const getClientById = useCallback(
        (id: number) => execute(getClientByIdService)(id),
        [execute],
    );

    return {
        data,
        error,
        loading: isLoading,
        getClientById,
        refresh,
    };
};
