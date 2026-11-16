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
        [ADD_PAYMENT.percentage]: z
            .string()
            .trim()
            .transform((value) => (value === "" ? undefined : Number(value)))
            .pipe(
                z
                    .number({ message: "El valor % debe ser un número" })
                    .min(0, { message: "El valor % no puede ser negativo" })
                    .max(100, { message: "El valor % no puede superar 100" })
                    .optional(),
            ),
        [ADD_PAYMENT.bonusPercentage]: z
            .string()
            .trim()
            .nonempty({ message: "La bonificación % es obligatoria" })
            .transform(Number)
            .pipe(
                z
                    .number({ message: "La bonificación % debe ser un número" })
                    .min(0, { message: "La bonificación % no puede ser negativa" })
                    .max(100, { message: "La bonificación % no puede superar 100" }),
            ),
    })
    .superRefine((data, ctx) => {
        const application = data[ADD_PAYMENT.application];
        const percentage = data[ADD_PAYMENT.percentage];
        const requiresValue =
            application === "Recargo" || application === "Descuento";

        if (requiresValue && (percentage === undefined || percentage <= 0)) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Debe ingresar un valor mayor a 0 al aplicar un Recargo o Descuento",
                path: [ADD_PAYMENT.percentage],
            });
        }

        if (application === "No Aplica" && percentage !== undefined) {
            ctx.addIssue({
                code: "custom",
                message:
                    "El valor % debe quedar vacío cuando la aplicación es No Aplica",
                path: [ADD_PAYMENT.percentage],
            });
        }
    });

export type PaymentSchemaType = z.infer<typeof paymentSchema>;

export const paymentListSchema = z
    .array(paymentSchema)
    .min(1, { message: "Debe agregar al menos un pago al listado" });

export default paymentSchema;
