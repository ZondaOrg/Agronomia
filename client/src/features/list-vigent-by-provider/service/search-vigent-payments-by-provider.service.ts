import { PAYMENT_SEARCH_PATH_BY_PROVIDER_ID } from "@/core/server/urls/payment";
import http from "@/core/server/http-client";
import type { Payment } from "../types/VigentesPayment";

export const searchVigentPaymentsByProviderService = async (
    providerId: number,
    description: string,
): Promise<Payment[]> => {
    const { data } = await http.post<Payment[]>(
        PAYMENT_SEARCH_PATH_BY_PROVIDER_ID(providerId),
        { description },
    );

    return data;
};
