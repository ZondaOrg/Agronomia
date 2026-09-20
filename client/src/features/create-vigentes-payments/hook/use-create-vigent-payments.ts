import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import createVigentPaymentsService from "../service/create-vigent-payments.service";
import type { VigentesPayment } from "../types/VigentesPayment";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";
import type { VigentPaymentRequest } from "../adapter/PaymentRequest";

export const useCreateVigentPayments = (providerId: number) => {
    const { data, error, isLoading, execute, refresh } =
        useFetch<VigentesPayment>();

    const createVigentPayments = execute(createVigentPaymentsService);

    const withPayments =
        (payments: Payment[]) =>
        (rest: Pick<VigentPaymentRequest, "nameList">) => {
            const payload: VigentPaymentRequest = {
                nameList: rest.nameList,
                providerId,
                payments,
            };
            createVigentPayments(payload);
        };

    return {
        data,
        error,
        loading: isLoading,
        withPayments,
        refresh,
    };
};
