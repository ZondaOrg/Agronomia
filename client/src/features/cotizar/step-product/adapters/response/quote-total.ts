import type { QuoteTotal } from "../../domain/quote-total";

export type CalculateResponse = {
    total: number;
};

export function quoteTotalAdapter(response: CalculateResponse): QuoteTotal {
    return { total: response.total };
}
