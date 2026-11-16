import { useMemo } from "react";
import { useAppSelector } from "@/core/store/hooks";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { selectFormValores } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import { PROVIDER } from "../../step-product/components/filter/types/inputs";
import { useGetPreview } from "./use-get-preview";

const PRODUCT_STEP_ID = "2";

export const useStepPayment = () => {
    const providerId = useAppSelector((s) =>
        selectFilterValue(s, PRODUCT_STEP_ID, PROVIDER),
    );

    const productFormValues = useAppSelector((s) =>
        selectFormValores(s, PRODUCT_STEP_ID),
    );

    const productId = productFormValues?.producto
        ? String(productFormValues.producto)
        : undefined;
    const flete = productFormValues?.flete;
    const total =
        typeof productFormValues?.total === "number"
            ? productFormValues.total
            : undefined;
    const moneda =
        typeof productFormValues?.moneda === "string"
            ? productFormValues.moneda
            : undefined;

    const savedOpcionales = productFormValues?.opcionales;
    const opcionales = useMemo(
        () =>
            Array.isArray(savedOpcionales)
                ? (savedOpcionales as number[])
                : [],
        [savedOpcionales],
    );

    const { data, error, loading } = useGetPreview(
        providerId,
        productId,
        opcionales,
    );

    return { data, error, loading, flete, total, moneda };
};
