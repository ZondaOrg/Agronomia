import { useEffect, useState } from "react";
import type { Freight } from "../domain/freight";
import { useQuoteProduct } from "./use-quote-product";
import { useCalculateQuote } from "./use-calculate-quote";

export const isValidQuantity = (q: number | null): q is number =>
    q !== null && Number.isInteger(q) && q > 0;


export const useProductQuote = (
    productId: string | undefined,
    quantity: number | null,
    freight: Freight | null,
    optionalIds: number[],
) => {
    const quoteProduct = useQuoteProduct();
    const quoteTotal = useCalculateQuote();
    const [calcProductId, setCalcProductId] = useState<number>();

    const { get } = quoteProduct;
    const { calculate } = quoteTotal;

    const detail =
        quoteProduct.data && String(quoteProduct.data.id) === productId
            ? quoteProduct.data
            : undefined;
    const total =
        detail && calcProductId === detail.id
            ? (quoteTotal.data?.total ?? null)
            : null;

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

    return {
        detail,
        total,
        loading: quoteProduct.loading || quoteTotal.loading,
    };
};
