import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import calculateArsService from "../services/calculate-ars.service";
import calculateArsManualService from "../services/calculate-ars-manual.service";
import type { ArsQuoteResult } from "../domain/ars-quote";
import type { QuoteSelection } from "../domain/quote-selection";
import type { ManualQuoteSelection } from "../domain/manual-quote-selection";

export const useCalculateConvert = () => {
    const { data, isLoading, execute, refresh } = useFetch<ArsQuoteResult>();

    const calculate = useCallback(
        (selection: QuoteSelection) => execute(calculateArsService)(selection),
        [execute],
    );

    const calculateManual = useCallback(
        (selection: ManualQuoteSelection) =>
            execute(async (s: ManualQuoteSelection) => ({
                source: "OFFICIAL" as const,
                ...(await calculateArsManualService(s)),
            }))(selection),
        [execute],
    );

    return {
        data,
        loading: isLoading,
        calculate,
        calculateManual,
        reset: refresh,
    };
};
