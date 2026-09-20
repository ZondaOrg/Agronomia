import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import createVigentPaymentsService from "../service/create-vigent-payments.service";
import type { VigentesPayment } from "../types/VigentesPayment";
import type { VigentPaymentRequest } from "../adapter/PaymentRequest";

export const useCreateVigentPayments = () => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();

    const createVigentPayments = execute(createVigentPaymentsService);

    return {
        data,
        error,
        loading: isLoading,
        createVigentPayments: (payload: VigentPaymentRequest) =>
            createVigentPayments(payload),
        refresh,
    };
};
