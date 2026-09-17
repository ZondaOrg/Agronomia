import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { VigentesPayment } from "../types/VigentesPayment";
import { getPaymentsByProviderService } from "../services/get-payments-by-provider.service";

export const useGetPayments = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();
    const getPayments = useCallback(
        (page: number, size: number, providerId: number) =>
            execute(getPaymentsByProviderService)(providerId, page, size),
        [execute],
    );

    return {
        data,
        error,
        isLoading,
        getPayments,
        refresh,
    };
};
