import type { Money } from "@/shared/domain/money/money";
import type { ProductTotal } from "../../../../domain/product-total";

export interface TotalDisplay {
    amount: number;
    currency: keyof Money | null;
}

/** Monto principal que muestra TotalPrice según el tipo de total. */
export const getTotalDisplay = (
    total: ProductTotal | null,
    moneda: keyof Money | null,
): TotalDisplay | null => {
    switch (total?.kind) {
        case "unique":
            return { amount: total.total, currency: moneda };
        case "convert":
            return { amount: total.totalArs, currency: "ARS" };
        case "fallback":
            return { amount: total.totalUsd, currency: "USD" };
        default:
            return null;
    }
};
