import http from "@/core/server/http-client";
import { PAYMENT_PATH } from "@/core/server/urls/payment";
import type { VigentesPayment } from "../types/VigentesPayment";
import type { vigentUpdateRequest } from "../adapter/VigentRequest";

async function updateVigentPaymentsService(
    vigent: vigentUpdateRequest,
): Promise<VigentesPayment> {
    const response = await http.put<VigentesPayment>(PAYMENT_PATH, vigent);
    return response.data;
}

export default updateVigentPaymentsService;
