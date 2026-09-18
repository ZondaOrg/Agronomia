import type { InputData } from "@/shared/types/input/input";
import { ADD_PAYMENT } from "./api-contract";
import { adjustmentOptions } from "@/features/update-payments/types/ajustment-options";

export const paymentInputs: Record<string, InputData> = {
    [ADD_PAYMENT.description]: {
        type: "text",
        name: ADD_PAYMENT.description,
        title: "FORMA DE PAGO",
        placeholder: "Ingresa descripción",
        defaultValue: "",
        id: 1,
    },
    [ADD_PAYMENT.application]: {
        type: "select",
        name: ADD_PAYMENT.application,
        title: "RECARGO/DESCUENTO",
        placeholder: "Selecciona",
        defaultValue: "No Aplica",
        options: [...adjustmentOptions],
        id: 2,
    },

    [ADD_PAYMENT.percentage]: {
        type: "number",
        name: ADD_PAYMENT.percentage,
        title: "VALOR %",
        placeholder: "%",
        defaultValue: "",
        id: 3,
    },
    [ADD_PAYMENT.bonusPercentage]: {
        type: "number",
        name: ADD_PAYMENT.bonusPercentage,
        title: "BONIFICACIÓN %",
        placeholder: "%",
        defaultValue: "",
        id: 4,
    },
};
