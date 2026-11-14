export type QuoteMode =
    | { kind: "NATIVE" }
    | { kind: "OFFICIAL" }
    | { kind: "MANUAL"; dolarPrice: number };
