import type { ArsQuoteResult, QuoteArs } from "../../domain/ars-quote";

export type CalculateArsResponse = {
    totalArs: number;
    totalUsd: number;
    dolarPrice: number;
    listPriceArs: number;
};

export type CalculateArsFallbackResponse = {
    total: number;
};

const isFallbackResponse = (
    data: CalculateArsResponse | CalculateArsFallbackResponse,
): data is CalculateArsFallbackResponse => "total" in data;

export function quoteArsAdapter(response: CalculateArsResponse): QuoteArs {
    return {
        totalArs: response.totalArs,
        totalUsd: response.totalUsd,
        dolarPrice: response.dolarPrice,
        listPriceArs: response.listPriceArs,
    };
}

export function arsQuoteAdapter(
    status: number,
    data: CalculateArsResponse | CalculateArsFallbackResponse,
): ArsQuoteResult {
    if (status === 206 && isFallbackResponse(data)) {
        return { source: "FALLBACK", totalUsd: data.total };
    }
    if (isFallbackResponse(data)) {
        throw new Error(`Respuesta inesperada con status ${status}`);
    }
    return { source: "OFFICIAL", ...quoteArsAdapter(data) };
}
