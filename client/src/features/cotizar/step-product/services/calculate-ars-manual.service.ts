import http from "@/core/server/http-client";
import { QUOTE_CALCULATE_ARS_MANUAL } from "@/core/server/urls/quote";
import type { ManualQuoteSelection } from "../domain/manual-quote-selection";
import type { QuoteArs } from "../domain/ars-quote";
import { calculateArsManualRequestAdapter } from "../adapters/request/calculate-ars-manual";
import {
    quoteArsAdapter,
    type CalculateArsResponse,
} from "../adapters/response/ars-quote";

async function calculateArsManual(
    selection: ManualQuoteSelection,
): Promise<QuoteArs> {
    const response = await http.post<CalculateArsResponse>(
        QUOTE_CALCULATE_ARS_MANUAL,
        calculateArsManualRequestAdapter(selection),
    );
    return quoteArsAdapter(response.data);
}

export default calculateArsManual;
