import type { ArsQuoteResult } from "./ars-quote";

export type DolarStatus = "LOADING" | "OBTAINED" | "MANUAL";

export const getDolarStatus = (
    loading: boolean,
    ars: ArsQuoteResult | undefined,
): DolarStatus => {
    if (loading) return "LOADING";
    return ars?.source === "FALLBACK" ? "MANUAL" : "OBTAINED";
};
