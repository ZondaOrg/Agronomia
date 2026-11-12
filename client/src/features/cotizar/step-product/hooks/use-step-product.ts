import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAppSelector } from "@/core/store/hooks";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { selectFormValores } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import type { StepProductValues } from "../domain/step-product-values";
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

    // Valores guardados al avanzar: rehidratan el form al volver al paso.
    const saved = useAppSelector((s) => selectFormValores(s, stepId)) as
        | Partial<StepProductValues>
        | undefined;

    const form = useForm<StepProductFormValues>({
        defaultValues: {
            producto: productId ?? "",
            unidades: saved?.unidades ?? DEFAULT_UNIDADES,
            moneda: saved?.moneda ?? null,
            flete: saved?.flete ?? null,
            opcionales: saved?.opcionales ?? [],
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

    const listMoney = detail?.money;
    useEffect(() => {
        if (listMoney === "ARS") setValue("moneda", "ARS");
    }, [listMoney, detail?.id, setValue]);

    return { form, detail, total, loading };
};
