export type ProductTotal =
    | { kind: "unique"; total: number }
    | { kind: "convert"; totalArs: number; totalUsd: number }
    | { kind: "fallback"; totalUsd: number };

/** Monto con el que se completa el paso: null si no hay monto en pesos (fallback) o aún no hay total. */
export const getStepAmount = (total: ProductTotal | null): number | null => {
    switch (total?.kind) {
        case "unique":
            return total.total;
        case "convert":
            return total.totalArs;
        default:
            return null;
    }
};
