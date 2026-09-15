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
        input: {
            type: "text",
            name: "paymentMethod",
            title: "Forma de pago",
            placeholder: "Ingresa descripción forma de pago",
            defaultValue: "",
            id: 1,
        },
    },
    {
        key: "adjustment",
        header: "RECARGO/DESCUENTO",
        input: {
            type: "select",
            name: "adjustment",
            title: "Recargo/descuento",
            placeholder: "Selecciona",
            defaultValue: "No aplica",
            options: [...adjustmentOptions],
            id: 2,
        },
    },
    {
        key: "percentage",
        header: "VALOR %",
        input: {
            type: "number",
            name: "percentage",
            title: "Valor %",
            placeholder: "%",
            defaultValue: "",
            id: 3,
        },
    },
    {
        key: "bonusPercentage",
        header: "BONIFICACIÓN %",
        input: {
            type: "number",
            name: "bonusPercentage",
            title: "Bonificación %",
            placeholder: "%",
            defaultValue: "",
            id: 4,
        },
    },
];

export const initialPaymentDraft = paymentColumns.reduce(
    (draft, column) => ({
        ...draft,
        [column.key]: column.input.defaultValue ?? "",
    }),
    {},
) as PaymentRow;

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
