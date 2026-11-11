import { z } from "zod";

export const DEFAULT_UNIDADES = 1;

export const stepProductSchema = z.object({
    unidades: z
        .number("Ingresá una cantidad")
        .int("Las unidades deben ser un entero")
        .positive("Las unidades deben ser mayores que cero"),
});

export type StepProductFormValues = z.infer<typeof stepProductSchema>;
