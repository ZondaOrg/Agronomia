import type { QuoteSelection } from "../../domain/quote-selection";

export type CalculateRequest = {
    productId: number;
    quantity: number;
    optionalIds: number[];
    includeFreight: boolean;
};

export function calculateRequestAdapter(selection: QuoteSelection): CalculateRequest {
    return {
        productId: selection.productId,
        quantity: selection.quantity,
        optionalIds: selection.optionalIds,
        includeFreight: selection.includeFreight,
    };
}
