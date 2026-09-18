import type { VigentesPayment } from "../types/VigentesPayment";
import { PAYMENT_PATH_BY_PROVIDER_ID } from "@/core/server/urls/payment";
import http from "@/core/server/http-client";

export const getPaymentsByProviderService = async (
    providerId: number,
    page = 0,
    size = 4,
): Promise<VigentesPayment> => {
    const { data } = await http.get<VigentesPayment>(
        PAYMENT_PATH_BY_PROVIDER_ID(providerId),
        { params: { page, size } },
    );

    return data;
};

export default getPaymentsByProviderService;
