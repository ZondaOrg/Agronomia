import { useCallback, useEffect, useState } from "react";
import type { Freight } from "../domain/freight";
import type { QuoteMode } from "../types/quote-mode";
import { useQuoteProduct } from "./use-quote-product";
import { useCalculateByMode } from "./use-calculate-by-mode";

export const isValidQuantity = (q: number | null): q is number =>
    q !== null && Number.isInteger(q) && q > 0;


export const useProductQuote = (
    productId: string | undefined,
    quantity: number | null,
    freight: Freight | null,
    optionalIds: number[],
) => {
    const quoteProduct = useQuoteProduct();
    const [mode, setMode] = useState<QuoteMode>({ kind: "NATIVE" });
    const quote = useCalculateByMode(mode);
    const [calcProductId, setCalcProductId] = useState<number>();

    const { get } = quoteProduct;
    const { calculate, resetArs } = quote;

    const detail =
        quoteProduct.data && String(quoteProduct.data.id) === productId
            ? quoteProduct.data
            : undefined;
    const total =
        detail && calcProductId === detail.id ? quote.total : null;

    useEffect(() => {
        if (productId) get(Number(productId));
    }, [productId, get]);

    useEffect(() => {
        if (!detail || !isValidQuantity(quantity)) return;
        calculate({
            productId: detail.id,
            quantity,
            optionalIds,
            includeFreight: freight === "INCLUDED",
        })
            .then(() => setCalcProductId(detail.id))
            .catch(() => undefined);
    }, [detail, quantity, freight, optionalIds, calculate]);

    const requestOfficial = useCallback(
        () => setMode({ kind: "OFFICIAL" }),
        [],
    );
    const requestManual = useCallback(
        (dolarPrice: number) => setMode({ kind: "MANUAL", dolarPrice }),
        [],
    );
    const requestNative = useCallback(() => {
        setMode({ kind: "NATIVE" });
        resetArs();
    }, [resetArs]);

    return {
        detail,
        total,
        ars: quote.ars,
        arsLoading: quote.arsLoading,
        requestOfficial,
        requestManual,
        requestNative,
        loading: quoteProduct.loading || quote.loading,
    };
};
