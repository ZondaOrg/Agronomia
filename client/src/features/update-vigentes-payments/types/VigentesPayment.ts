import type { Table } from "@/shared/types/table/Table";

export type VigentesPayment = {
    id: number;
    nameList: string;
    payments: Table<Payment>;
};

export type Payment = {
    id: number;
    application: string;
    description: string;
    percentage: number;
    bonusPercentage: number;
};
