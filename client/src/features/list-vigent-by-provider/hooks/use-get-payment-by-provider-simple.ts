import { useCallback, useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import getPaymentsByProviderService from "../service/get-vigent-payments-by-provider-simple.service";
import type { VigentesPayment } from "../types/VigentesPayment";

export const useGetVigentesPaymentsByProvider = (providerId: number) => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();
    const getVigentPaymentsByProvider = useCallback(
        () => execute(getPaymentsByProviderService)(providerId),
        [execute, providerId],
    );

    useEffect(() => {
        getVigentPaymentsByProvider();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerId]);

    return {
        data,
        error,
        isLoading,
        refresh,
    };
};
