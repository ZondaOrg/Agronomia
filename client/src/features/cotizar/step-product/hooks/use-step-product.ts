import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAppSelector } from "@/core/store/hooks";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { PRODUCT } from "../components/filter/types/inputs";
import {
    DEFAULT_UNIDADES,
    type StepProductFormValues,
} from "../components/form/product-schema";
import { useProductQuote } from "./use-product-quote";

/**
 * Orquesta el formulario del paso Producto.
 * El form (react-hook-form) se comparte con `HydrationForm` y con el input
 * de unidades, que vive fuera del form.
 */
export const useStepProduct = (stepId: string) => {
    const productId = useAppSelector((s) =>
        selectFilterValue(s, stepId, PRODUCT),
    );

    const form = useForm<StepProductFormValues>({
        defaultValues: {
            producto: productId ?? "",
            unidades: DEFAULT_UNIDADES,
            moneda: null,
            flete: null,
            opcionales: [],
        },
    });
    const { control, setValue } = form;

    // Al cambiar de producto se descarta la moneda y el flete elegidos.
    const lastProductId = useRef(productId);
    useEffect(() => {
        if (lastProductId.current === productId) return;
        lastProductId.current = productId;
        setValue("producto", productId ?? "");
        setValue("moneda", null);
        setValue("flete", null);
        setValue("opcionales", []);
    }, [productId, setValue]);

    const [unidades, flete, opcionales] = useWatch({
        control,
        name: ["unidades", "flete", "opcionales"],
    });

    const { detail, total, loading } = useProductQuote(
        productId,
        unidades ?? null,
        flete ?? null,
        opcionales ?? [],
    );

    return { form, detail, total, loading };
};
