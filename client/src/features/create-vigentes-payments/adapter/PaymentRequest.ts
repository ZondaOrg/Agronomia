import type { ADD_PAYMENT } from "./api-contract";
import type { ADD_VIGENT_PAYMENTS } from "./api-contract";
import type { Payment } from "@/features/get-vigentes-payments-by-provider/types/VigentesPayment";

export type VigentPaymentRequest = {
    [ADD_VIGENT_PAYMENTS.nameList]: string;
    providerId: number;
    payments: Array<Omit<Payment, "id">>;
};

export type PaymentRequest = {
    [ADD_PAYMENT.application]: string;
    [ADD_PAYMENT.description]: string;
    [ADD_PAYMENT.percentage]: number;
    [ADD_PAYMENT.bonusPercentage]: number;
};
