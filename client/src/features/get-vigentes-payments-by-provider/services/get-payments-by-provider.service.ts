import type {
    VigentesPayment,
    VigentesPaymentResponse,
    Payment,
    PaymentResponse,
} from "../types/VigentesPayment";
import { TableAdapter } from "@/shared/adapters/table/TableAdapter";
import { PAYMENT_PATH_BY_PROVIDER_ID } from "@/core/server/urls/payment";
import http from "@/core/server/http-client";

export const getPaymentsByProviderService = async (
    providerId: number,
    page = 0,
    size = 4,
): Promise<VigentesPayment> => {
    const { data } = await http.get<VigentesPaymentResponse>(
        PAYMENT_PATH_BY_PROVIDER_ID(providerId),
        { params: { page, size } },
    );

    return {
        id: data.id,
        nameList: data.nameList,
        payments: TableAdapter.adapt<PaymentResponse, Payment>(
            data.payments,
            (payment) => ({ ...payment }),
        ),
    };
};
