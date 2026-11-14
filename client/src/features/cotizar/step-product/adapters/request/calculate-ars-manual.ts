import type { ManualQuoteSelection } from "../../domain/manual-quote-selection";
import { calculateRequestAdapter } from "./calculate";
import type { CalculateArsRequest } from "./calculate-ars";

export type CalculateArsManualRequest = CalculateArsRequest & {
    dolarPrice: number;
};

export function calculateArsManualRequestAdapter(
    selection: ManualQuoteSelection,
): CalculateArsManualRequest {
    return {
        ...calculateRequestAdapter(selection),
        dolarPrice: selection.dolarPrice,
    };
}
