import type { QuoteSelection } from "./quote-selection";

export interface ManualQuoteSelection extends QuoteSelection {
    dolarPrice: number;
}
