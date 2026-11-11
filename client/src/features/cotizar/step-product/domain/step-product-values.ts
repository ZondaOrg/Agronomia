import type { Money } from "@/shared/domain/money/money";

export interface StepProductValues {
    producto: string;
    unidades: number;
    moneda: keyof Money;
    total: number;
}
