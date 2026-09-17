import type { TableForm } from "@/shared/types/table/Table";

export type VigentesPaymentResponse = {
    id: number;
    nameList: string;
    payments: TableForm<PaymentResponse>;
};

export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: TableForm<Payment>;
};

export type PaymentResponse = {
    id: number;
    application: string;
    description: string;
    percentage: number;
    bonusPercentage: number;
};

export type Payment = {
    id: number;
    application: string;
    description: string;
    percentage: number;
    bonusPercentage: number;
};
