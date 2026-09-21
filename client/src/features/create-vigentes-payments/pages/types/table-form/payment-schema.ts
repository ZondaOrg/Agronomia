import * as z from "zod";
import { ADD_PAYMENT } from "../../../adapter/api-contract";

const paymentSchema = z
    .object({
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
    })
    .superRefine((data, ctx) => {
        const requiresValue =
            data[ADD_PAYMENT.application] === "Recargo" ||
            data[ADD_PAYMENT.application] === "Descuento";

        if (requiresValue && data[ADD_PAYMENT.percentage] <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Debe ingresar un valor mayor a 0 al aplicar un Recargo o Descuento",
                path: [ADD_PAYMENT.percentage],
            });
        }
    });

export type PaymentSchemaType = z.infer<typeof paymentSchema>;

export default paymentSchema;

export const adjustmentOptions = [
    { id: 1, label: "No Aplica", value: "No Aplica" },
    { id: 2, label: "Descuento", value: "Descuento" },
    { id: 3, label: "Recargo", value: "Recargo" },
];
