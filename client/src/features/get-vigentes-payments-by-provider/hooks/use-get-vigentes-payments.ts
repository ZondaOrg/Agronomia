import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import { useCallback } from "react";
import { getPaymentsByProviderService } from "../services/get-payments-by-provider.service";

export const useGetPayments = () => {
    const adapterService = useCallback(
        (page: number, size: number, providerId: number) =>
            getPaymentsByProviderService(providerId, page, size),
        [],
    );

    const { data, error, isLoading, fetchPage, handlePageChange } =
        usePaginatedFetch(adapterService, 4);

    const getPayments = useCallback(
        (providerId: number, page = 0, size = 4) =>
            fetchPage(page, size, providerId),
        [fetchPage],
    );

    return {
        data,
        error,
        isLoading,
        getPayments,
        onPageChange: handlePageChange,
    };
};
