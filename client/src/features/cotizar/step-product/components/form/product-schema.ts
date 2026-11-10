import { z } from "zod";
import { moneys, type Money } from "@/shared/domain/money/money";
import type { Freight } from "../../domain/freight";

export const DEFAULT_UNIDADES = 1;

export const stepProductSchema = z.object({
    producto: z.string().min(1, "Debes seleccionar un producto"),
    unidades: z
        .number("Ingresá una cantidad")
        .int("Las unidades deben ser un entero")
        .positive("Las unidades deben ser mayores que cero"),
    moneda: z.enum(moneys, "Debes seleccionar una moneda"),
    flete: z.enum(["INCLUDED", "NOT_INCLUDED"], "Debes elegir el flete"),
});

/** Valores del form en edición: los campos sin elegir son `null`. */
export interface StepProductFormValues {
    producto: string;
    unidades: number | null;
    moneda: keyof Money | null;
    flete: Freight | null;
}
