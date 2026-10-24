import { z } from "zod";

export interface ValidationResult {
    formCompleto: boolean;
    camposFaltantes: string[];
}

/**
 * Evalúa los valores contra un esquema Zod y formatea la salida para el store.
 */
export const validateStepSchema = <T>(
    schema: z.ZodSchema<T>,
    values: unknown,
): ValidationResult => {
    const result = schema.safeParse(values);

    if (result.success) {
        return {
            formCompleto: true,
            camposFaltantes: [],
        };
    }

    const faltantes: string[] = result.error.issues.map((issue) =>
        String(issue.path[0]),
    );

    return {
        formCompleto: false,
        camposFaltantes: Array.from(new Set<string>(faltantes)),
    };
};
