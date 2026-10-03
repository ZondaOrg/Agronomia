import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";

import putClient from "../service/put-client.service";
import type { Client } from "../domain/client";

export const usePutClient = () => {
    const { error, data, isLoading, execute, refresh } =
        useFetch<Client>();

    return {
        error,
        data,
        isLoading,
        editClient: execute(putClient),
        refresh,
    };
};
