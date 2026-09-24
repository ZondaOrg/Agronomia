import { PAYMENT_PATH_BY_PROVIDER_ID } from "@/core/server/urls/payment";
import http from "@/core/server/http-client";
import type { VigentesPayment } from "../types/VigentesPayment";

export const getPaymentsByProviderService = async (
    providerId: number,
    description = "",
): Promise<VigentesPayment> => {
    const { data } = await http.get<VigentesPayment>(
        PAYMENT_PATH_BY_PROVIDER_ID(providerId),
        { params: { description } },
    );

    return data;
};

export default getPaymentsByProviderService;
