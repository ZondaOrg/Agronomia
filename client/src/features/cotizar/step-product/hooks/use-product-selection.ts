import { useCallback, useState } from "react";
import type { Money } from "@/shared/domain/money/money";
import type { Freight } from "../domain/freight";

interface Selection {
    productId: string | undefined;
    moneda: keyof Money | null;
    freight: Freight | null;
}

export const useProductSelection = (productId: string | undefined) => {
    const [selection, setSelection] = useState<Selection>({
        productId: undefined,
        moneda: null,
        freight: null,
    });

    const current = selection.productId === productId ? selection : null;

    const onMonedaChange = useCallback(
        (moneda: keyof Money | null) =>
            setSelection((prev) => ({
                productId,
                freight: prev.productId === productId ? prev.freight : null,
                moneda,
            })),
        [productId],
    );

    const onFreightChange = useCallback(
        (freight: Freight | null) =>
            setSelection((prev) => ({
                productId,
                moneda: prev.productId === productId ? prev.moneda : null,
                freight,
            })),
        [productId],
    );

    return {
        moneda: current?.moneda ?? null,
        freight: current?.freight ?? null,
        onMonedaChange,
        onFreightChange,
    };
};
