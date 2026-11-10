import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import calculateQuoteService from "../services/calculate-quote.service";
import type { QuoteTotal } from "../domain/quote-total";
import type { QuoteSelection } from "../domain/quote-selection";

export const useCalculateQuote = () => {
    const { data, isLoading, execute, refresh } = useFetch<QuoteTotal>();

    const calculate = useCallback(
        (selection: QuoteSelection) =>
            execute(calculateQuoteService)(selection),
        [execute],
    );

    return { data, loading: isLoading, calculate, reset: refresh };
};
