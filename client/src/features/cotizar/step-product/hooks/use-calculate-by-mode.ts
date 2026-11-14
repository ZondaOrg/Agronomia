import { useCallback, useState } from "react";
import type { ProductTotal } from "../domain/product-total";
import type { QuoteSelection } from "../domain/quote-selection";
import type { QuoteMode } from "../types/quote-mode";
import { useCalculateConvert } from "./use-calculate-convert";
import { useCalculateQuote } from "./use-calculate-quote";

export const useCalculateByMode = (
    mode: QuoteMode,
    productId: number | undefined,
) => {
    const usd = useCalculateQuote();
    const ars = useCalculateConvert();
    const [calcProductId, setCalcProductId] = useState<number>();

    const { calculate: calculateUsd } = usd;
    const {
        calculate: calculateOfficial,
        calculateManual,
        reset: resetArs,
    } = ars;

    const request = useCallback(
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

    const calculate = useCallback(
        async (selection: QuoteSelection) => {
            const result = await request(selection);
            setCalcProductId(selection.productId);
            return result;
        },
        [request],
    );

    const total = ((): ProductTotal | null => {
        if (productId === undefined || calcProductId !== productId) return null;
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
