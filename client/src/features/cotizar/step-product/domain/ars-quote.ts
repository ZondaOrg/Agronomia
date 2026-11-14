export interface QuoteArs {
    totalArs: number;
    totalUsd: number;
    dolarPrice: number;
    listPriceArs: number; 
}

export interface QuoteArsFallback {
    totalUsd: number;
}

export type ArsQuoteResult =
    | ({ source: "OFFICIAL" } & QuoteArs)
    | ({ source: "FALLBACK" } & QuoteArsFallback);