import type { ADD_PAYMENT } from "./api-contract";

export type PaymentRequest = {
    [ADD_PAYMENT.application]: string;
    [ADD_PAYMENT.description]: string;
    [ADD_PAYMENT.percentage]: number;
    [ADD_PAYMENT.bonusPercentage]: number;
};
