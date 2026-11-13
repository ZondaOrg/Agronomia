export type ProductTotal =
    | { kind: "unique"; total: number }
    | { kind: "convert"; totalArs: number; totalUsd: number }
    | { kind: "fallback"; totalUsd: number };
