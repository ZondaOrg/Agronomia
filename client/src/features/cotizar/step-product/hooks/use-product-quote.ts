import { useCallback, useEffect, useState } from "react";
import type { Freight } from "../domain/freight";
import type { QuoteMode } from "../types/quote-mode";
import { useGetProductQuote } from "./use-get-product-quote";
import { useCalculateByMode } from "./use-calculate-by-mode";

export const isValidQuantity = (q: number | null): q is number =>
    q !== null && Number.isInteger(q) && q > 0;


export const useProductQuote = (
    productId: string | undefined,
    quantity: number | null,
    freight: Freight | null,
    optionalIds: number[],
) => {
    const { detail, loading: productLoading } = useGetProductQuote(productId);
    const [mode, setMode] = useState<QuoteMode>({ kind: "NATIVE" });
    const {
        calculate,
        total,
        ars,
        arsLoading,
        loading: calcLoading,
        resetArs,
    } = useCalculateByMode(mode, detail?.id);

    useEffect(() => {
        if (!detail || !isValidQuantity(quantity)) return;
        calculate({
            productId: detail.id,
            quantity,
            optionalIds,
            includeFreight: freight === "INCLUDED",
        }).catch(() => undefined);
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
        ars,
        arsLoading,
        requestOfficial,
        requestManual,
        requestNative,
        loading: productLoading || calcLoading,
    };
};
