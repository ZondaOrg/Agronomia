import { PAYMENT_PATH_BY_PROVIDER_ID } from "@/core/server/urls/payment";
import http from "@/core/server/http-client";
import type { VigentesPayment } from "../types/VigentesPayment";

export const getPaymentsByProviderService = async (
    providerId: number,
): Promise<VigentesPayment> => {
    const response = await http.get<VigentesPayment>(
        PAYMENT_PATH_BY_PROVIDER_ID(providerId),
    );

    return response.data;
};

export default getPaymentsByProviderService;
