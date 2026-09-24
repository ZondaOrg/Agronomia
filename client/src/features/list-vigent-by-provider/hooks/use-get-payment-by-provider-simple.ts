import { useCallback, useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import getPaymentsByProviderService from "../service/get-vigent-payments-by-provider-simple.service";
import type { VigentesPayment } from "../types/VigentesPayment";
import useSearch from "@/shared/hooks/use-search";

export const useGetVigentesPaymentsByProvider = (providerId: number) => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();
    const { search, handleSearch } = useSearch();

    const getVigentPaymentsByProvider = useCallback(
        (description: string) =>
            execute(getPaymentsByProviderService)(providerId, description),
        [execute, providerId],
    );

    function onSearch(newSearch: string) {
        handleSearch(newSearch);
        console.log("newSearch", newSearch);
        getVigentPaymentsByProvider(newSearch);
    }

    useEffect(() => {
        getVigentPaymentsByProvider(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerId]);

    return {
        data,
        error,
        isLoading,
        search,
        onSearch,
        refresh,
    };
};
