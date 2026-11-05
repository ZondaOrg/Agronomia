import { useCallback, useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import { getClientById as getClientByIdService } from "../service/get-client-by-id.service";
import type { Client } from "../domain/client";
import { useParams } from "react-router";

export const useGetClientById = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const { data, isLoading, execute } = useFetch<Client>();

    const getClientById = useCallback(
        (id: number) => execute(getClientByIdService)(id),
        [execute],
    );

    useEffect(() => {
        if (clientId) {
            getClientById(Number(clientId));
        }
    }, [clientId, getClientById]);

    return {
        client: data,
        id: Number(clientId),
        isLoading
    };
};
