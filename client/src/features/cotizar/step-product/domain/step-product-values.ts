import type { Money } from "@/shared/domain/money/money";
import type { Freight } from "./freight";

export interface StepProductValues {
    producto: string;
    unidades: number;
    moneda: keyof Money;
    flete: Freight;
    opcionales: number[];
    total: number;
}
