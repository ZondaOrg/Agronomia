import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import getPaymentsByProviderService from "../service/get-vigent-payments-by-provider-simple.service";
import type { VigentesPayment } from "../types/VigentesPayment";

export const useGetVigentesPaymentsByProvider = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();
    const getVigentPaymentsByProvider = useCallback(
        (providerId: number) =>
            execute(getPaymentsByProviderService)(providerId),
        [execute],
    );

    return {
        data,
        error,
        isLoading,
        getVigentPaymentsByProvider,
        refresh,
    };
};
