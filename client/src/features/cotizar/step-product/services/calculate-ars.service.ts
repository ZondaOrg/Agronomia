import http from "@/core/server/http-client";
import { QUOTE_CALCULATE_ARS } from "@/core/server/urls/quote";
import type { QuoteSelection } from "../domain/quote-selection";
import type { ArsQuoteResult } from "../domain/ars-quote";
import { calculateArsRequestAdapter } from "../adapters/request/calculate-ars";
import {
    arsQuoteAdapter,
    type CalculateArsFallbackResponse,
    type CalculateArsResponse,
} from "../adapters/response/ars-quote";

async function calculateArs(selection: QuoteSelection): Promise<ArsQuoteResult> {
    const response = await http.post<
        CalculateArsResponse | CalculateArsFallbackResponse
    >(QUOTE_CALCULATE_ARS, calculateArsRequestAdapter(selection));
    return arsQuoteAdapter(response.status, response.data);
}

export default calculateArs;
