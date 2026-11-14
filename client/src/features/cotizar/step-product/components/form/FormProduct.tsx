import { useCallback, useEffect } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { HydrationForm } from "@/shared/components/step/components/form/HydratationForm";
import { validateStepSchema } from "@/shared/components/step/components/form/schema-validator";
import {
    guardarValores,
    initForm,
    setEstadoForm,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import { selectGuardadoNonce } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import type { Money } from "@/shared/domain/money/money";
import type { ArsQuoteResult } from "../../domain/ars-quote";
import { getStepAmount, type ProductTotal } from "../../domain/product-total";
import type { QuoteProduct } from "../../domain/quote-product";
import type { StepProductValues } from "../../domain/step-product-values";
import { ArsProductForm } from "./ars-product-form/ArsProductForm";
import { UsdProductForm } from "./usd-product-form/UsdProductForm";
import { stepProductSchema, type StepProductFormValues } from "./product-schema";

interface FormProductProps {
    stepId: string;
    form: UseFormReturn<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: ProductTotal | null;
    ars: ArsQuoteResult | undefined;
    arsLoading: boolean;
    onSelectMoneda: (moneda: keyof Money | null) => void;
    onApplyDolar: (dolarPrice: number) => void;
}

export const FormProduct = ({
    stepId,
    form,
    detail,
    total,
    ars,
    arsLoading,
    onSelectMoneda,
    onApplyDolar,
}: FormProductProps) => {
    const dispatch = useAppDispatch();
    const saveNonce = useAppSelector((s) => selectGuardadoNonce(s, stepId));
    const values = useWatch({ control: form.control });
    const amount = getStepAmount(total);

    useEffect(() => {
        dispatch(
            initForm({
                stepId,
                obligatorios: Object.keys(stepProductSchema.shape),
            }),
        );
    }, [dispatch, stepId]);

    useEffect(() => {
        const { formCompleto, camposFaltantes } = validateStepSchema(
            stepProductSchema,
            values,
        );
        dispatch(
            setEstadoForm({
                stepId,
                formCompleto: formCompleto && amount !== null,
                camposFaltantes,
            }),
        );
    }, [dispatch, stepId, values, amount]);

    const onSave = useCallback(
        (current: StepProductFormValues) => {
            const parsed = stepProductSchema.safeParse(current);
            if (!parsed.success || amount === null) return;
            const { producto, unidades, moneda, flete } = parsed.data;
            const valores: StepProductValues = {
                producto,
                unidades,
                moneda,
                flete,
                opcionales: current.opcionales,
                total: amount,
            };
            dispatch(guardarValores({ stepId, valores: { ...valores } }));
        },
        [dispatch, stepId, amount],
    );

    return (
        <HydrationForm<unknown, StepProductFormValues>
            loading={false}
            form={form}
            saveNonce={saveNonce}
            onSave={onSave}
        >
            {detail?.money === "USD" ? (
                <UsdProductForm
                    control={form.control}
                    detail={detail}
                    total={total}
                    ars={ars}
                    arsLoading={arsLoading}
                    onSelectMoneda={onSelectMoneda}
                    onApplyDolar={onApplyDolar}
                />
            ) : (
                <ArsProductForm
                    control={form.control}
                    detail={detail}
                    total={total}
                />
            )}
        </HydrationForm>
    );
};
