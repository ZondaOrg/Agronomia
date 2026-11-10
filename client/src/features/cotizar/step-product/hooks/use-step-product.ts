import { useState } from "react";
import { useAppSelector } from "@/core/store/hooks";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { PRODUCT } from "../components/filter/types/inputs";
import { DEFAULT_UNIDADES } from "../components/form/product-schema";
import { useProductSelection } from "./use-product-selection";
import { useProductQuote } from "./use-product-quote";
import { useProductFormSync } from "./use-product-form-sync";

/**
 * Orquesta el formulario del paso Producto.
 */
export const useStepProduct = (stepId: string) => {
    const [quantity, setQuantity] = useState<number | null>(DEFAULT_UNIDADES);
    const productId = useAppSelector((s) =>
        selectFilterValue(s, stepId, PRODUCT),
    );

    const { moneda, freight, onMonedaChange, onFreightChange } =
        useProductSelection(productId);
    const { detail, total, loading } = useProductQuote(
        productId,
        quantity,
        freight,
    );

    useProductFormSync(stepId, { productId, quantity, moneda, freight, total });

    return {
        detail,
        moneda,
        freight,
        quantity,
        total,
        loading,
        onQuantityChange: setQuantity,
        onMonedaChange,
        onFreightChange,
    };
};
