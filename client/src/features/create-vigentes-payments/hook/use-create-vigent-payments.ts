import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import createVigentPaymentsService from "../service/create-vigent-payments.service";
import type { VigentesPayment } from "../types/VigentesPayment";

export const useCreateVigentPayments = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();
    return {
        data,
        error,
        loading: isLoading,
        createVigentPayments: execute(createVigentPaymentsService),
        refresh,
    };
};
