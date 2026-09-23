import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import { getPaymentsByProviderService } from "../services/get-payments-by-provider.service";

export const useGetPayments = () => {
    const adapterService = (page: number, size: number, providerId: number) =>
        getPaymentsByProviderService(providerId, page, size);

    const { data, error, isLoading, fetchPage, handlePageChange } =
        usePaginatedFetch(adapterService, 4);

    const getPayments = (providerId: number, page = 0, size = 4) => {
        fetchPage(page, size, providerId);
    };

    return {
        data,
        error,
        isLoading,
        getPayments,
        onPageChange: handlePageChange,
    };
};
