import * as z from "zod";
import { ADD_PAYMENT } from "../../../../../update-payments/adapter/api-contract";

const paymentSchema = z.object({
    [ADD_PAYMENT.description]: z
        .string()
        .nonempty({ message: "La descripción es obligatoria" }),
    [ADD_PAYMENT.application]: z
        .string()
        .nonempty({ message: "La aplicación es obligatoria" }),
    [ADD_PAYMENT.percentage]: z.coerce
        .number({ message: "El valor % debe ser un número" })
        .min(0, { message: "El valor % no puede ser negativo" })
        .max(100, { message: "El valor % no puede superar 100" }),
    [ADD_PAYMENT.bonusPercentage]: z.coerce
        .number({ message: "La bonificación % debe ser un número" })
        .min(0, { message: "La bonificación % no puede ser negativa" })
        .max(100, { message: "La bonificación % no puede superar 100" }),
});

export type PaymentSchema = typeof paymentSchema;

export default paymentSchema;
