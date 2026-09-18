import type { InputData } from "@/shared/types/input/input";
import { ADD_PAYMENT } from "../../../../../update-payments/adapter/api-contract";
import { adjustmentOptions } from "../../../../../update-payments/types/ajustment-options";

export const paymentInputs: Record<string, InputData> = {
    [ADD_PAYMENT.description]: {
        type: "text",
        name: ADD_PAYMENT.description,
        title: "Descripción",
        placeholder: "Ingresa descripción",
        defaultValue: "",
        id: 1,
    },
    [ADD_PAYMENT.application]: {
        type: "select",
        name: ADD_PAYMENT.application,
        title: "Aplicación",
        placeholder: "Selecciona",
        defaultValue: "No Aplica",
        options: [...adjustmentOptions],
        id: 2,
    },

    [ADD_PAYMENT.percentage]: {
        type: "number",
        name: ADD_PAYMENT.percentage,
        title: "Valor %",
        placeholder: "%",
        defaultValue: "",
        id: 3,
    },
    [ADD_PAYMENT.bonusPercentage]: {
        type: "number",
        name: ADD_PAYMENT.bonusPercentage,
        title: "Bonificación %",
        placeholder: "%",
        defaultValue: "",
        id: 4,
    },
};
