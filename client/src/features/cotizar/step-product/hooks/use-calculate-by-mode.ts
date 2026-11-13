import { useCallback } from "react";
import type { ProductTotal } from "../domain/product-total";
import type { QuoteSelection } from "../domain/quote-selection";
import type { QuoteMode } from "../types/quote-mode";
import { useCalculateArs } from "./use-calculate-ars";
import { useCalculateQuote } from "./use-calculate-quote";

export const useCalculateByMode = (mode: QuoteMode) => {
    const usd = useCalculateQuote();
    const ars = useCalculateArs();

    const { calculate: calculateUsd } = usd;
    const {
        calculate: calculateOfficial,
        calculateManual,
        reset: resetArs,
    } = ars;

    const calculate = useCallback(
        (selection: QuoteSelection) => {
            switch (mode.kind) {
                case "OFFICIAL":
                    return calculateOfficial(selection);
                case "MANUAL":
                    return calculateManual({
                        ...selection,
                        dolarPrice: mode.dolarPrice,
                    });
                case "NATIVE":
                    return calculateUsd(selection);
            }
        },
        [mode, calculateUsd, calculateOfficial, calculateManual],
    );

    const total = ((): ProductTotal | null => {
        if (mode.kind === "NATIVE") {
            return usd.data ? { kind: "unique", total: usd.data.total } : null;
        }
        if (!ars.data) return null;
        return ars.data.source === "OFFICIAL"
            ? {
                  kind: "convert",
                  totalArs: ars.data.totalArs,
                  totalUsd: ars.data.totalUsd,
              }
            : { kind: "fallback", totalUsd: ars.data.totalUsd };
    })();

    return {
        calculate,
        total,
        ars: ars.data,
        arsLoading: ars.loading,
        loading: usd.loading || ars.loading,
        resetArs,
    };
};
