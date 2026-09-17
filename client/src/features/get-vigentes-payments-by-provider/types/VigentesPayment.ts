import type { Table } from "@/shared/types/table/Table";

export type VigentesPaymentResponse = {
    id: number;
    nameList: string;
    payments: Table<PaymentResponse>;
};

export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: Table<Payment>;
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
