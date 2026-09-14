import type { DataRow } from "@/shared/components/table/types/Table";
import type { FormColumn } from "@/shared/components/table/form-table/FormTable";

const adjustmentOptions = [
    { id: 1, label: "No aplica", value: "No aplica" },
    { id: 2, label: "Descuento", value: "Descuento" },
    { id: 3, label: "Recargo", value: "Recargo" },
] as const;

type Adjustment = (typeof adjustmentOptions)[number]["value"];

export type PaymentRow = {
    paymentMethod: string;
    adjustment: Adjustment;
    percentage: string;
    bonusPercentage: string;
} & Record<string, unknown>;

export const paymentColumns: FormColumn[] = [
    {
        key: "paymentMethod",
        header: "FORMA DE PAGO",
        inputType: "text",
        placeholder: "Ingresa descripción forma de pago",
    },
    {
        key: "adjustment",
        header: "RECARGO/DESCUENTO",
        inputType: "select",
        options: [...adjustmentOptions],
    },
    {
        key: "percentage",
        header: "VALOR %",
        inputType: "number",
        placeholder: "%",
    },
    {
        key: "bonusPercentage",
        header: "BONIFICACIÓN",
        inputType: "number",
        placeholder: "%",
    },
];

export const initialPaymentDraft: PaymentRow = {
    paymentMethod: "",
    adjustment: "No aplica",
    percentage: "",
    bonusPercentage: "",
};

export const initialPaymentRows: DataRow<PaymentRow>[] = [
    {
        id: 1,
        data: {
            paymentMethod:
                "DOL720: 30% seña - 17,50% a 10 días - 17,50% a 360 días - 17,50% a 540 días",
            adjustment: "Descuento",
            percentage: "",
            bonusPercentage: "",
        },
    },
];
