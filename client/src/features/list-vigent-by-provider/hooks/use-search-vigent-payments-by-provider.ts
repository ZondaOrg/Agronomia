import { useCallback, useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import useSearch from "@/shared/hooks/use-search";
import { searchVigentPaymentsByProviderService } from "../service/search-vigent-payments-by-provider.service";
import type { Payment } from "../types/VigentesPayment";

export const useSearchVigentPaymentsByProvider = (providerId: number) => {
    const { data, error, isLoading, execute } = useFetch<Payment[]>();
    const { search, handleSearch } = useSearch();

    const searchPayments = useCallback(
        (description: string) =>
            execute(searchVigentPaymentsByProviderService)(
                providerId,
                description,
            ),
        [execute, providerId],
    );

    const onSearch = (description: string) => {
        handleSearch(description);
        searchPayments(description);
    };

    useEffect(() => {
        searchPayments(search);
    }, [providerId, searchPayments]);

    return { data, error, isLoading, search, onSearch };
};
