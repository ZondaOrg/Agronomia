import http from "@/core/server/http-client";
import { PAYMENT_PATH } from "@/core/server/urls/payment";
import type { VigentPaymentRequest } from "../adapter/PaymentRequest";
import type { VigentesPayment } from "../types/VigentesPayment";

async function createVigentPaymentsService(
    vigent: VigentPaymentRequest,
): Promise<VigentesPayment> {
    const response = await http.post<VigentesPayment>(PAYMENT_PATH, vigent);
    return response.data;
}

export default createVigentPaymentsService;
