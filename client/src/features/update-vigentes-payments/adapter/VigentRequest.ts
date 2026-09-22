import type { ADD_VIGENT_PAYMENTS } from "./api-update-contract";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";

export type vigentUpdateRequest = {
    vigentId: number;
    [ADD_VIGENT_PAYMENTS.nameList]: string;
    [ADD_VIGENT_PAYMENTS.newPayments]: Array<Omit<Payment, "id">>;
    [ADD_VIGENT_PAYMENTS.deletePayments]: number[];
};
