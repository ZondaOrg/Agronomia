import http from "@/core/server/http-client";
import { QUOTE_CALCULATE } from "@/core/server/urls/quote";
import type { QuoteSelection } from "../domain/quote-selection";
import type { QuoteTotal } from "../domain/quote-total";
import { calculateRequestAdapter } from "../adapters/request/calculate";
import {
    quoteTotalAdapter,
    type CalculateResponse,
} from "../adapters/response/quote-total";

async function calculateQuote(selection: QuoteSelection): Promise<QuoteTotal> {
    const response = await http.post<CalculateResponse>(
        QUOTE_CALCULATE,
        calculateRequestAdapter(selection),
    );
    return quoteTotalAdapter(response.data);
}

export default calculateQuote;
