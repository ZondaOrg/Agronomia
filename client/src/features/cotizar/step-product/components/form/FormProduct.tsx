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
import type { QuoteProduct } from "../../domain/quote-product";
import type { StepProductValues } from "../../domain/step-product-values";
import { ProductForm } from "./product-form/ProductForm";
import { stepProductSchema, type StepProductFormValues } from "./product-schema";

interface FormProductProps {
    stepId: string;
    form: UseFormReturn<StepProductFormValues>;
    detail: QuoteProduct | undefined;
    total: number | null;
}

export const FormProduct = ({ stepId, form, detail, total }: FormProductProps) => {
    const dispatch = useAppDispatch();
    const saveNonce = useAppSelector((s) => selectGuardadoNonce(s, stepId));
    const values = useWatch({ control: form.control });

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
                formCompleto: formCompleto && total !== null,
                camposFaltantes,
            }),
        );
    }, [dispatch, stepId, values, total]);

    const onSave = useCallback(
        (current: StepProductFormValues) => {
            const parsed = stepProductSchema.safeParse(current);
            if (!parsed.success || total === null) return;
            const { producto, unidades, moneda } = parsed.data;
            const valores: StepProductValues = {
                producto,
                unidades,
                moneda,
                total,
            };
            dispatch(guardarValores({ stepId, valores: { ...valores } }));
        },
        [dispatch, stepId, total],
    );

    return (
        <HydrationForm<unknown, StepProductFormValues>
            loading={false}
            form={form}
            saveNonce={saveNonce}
            onSave={onSave}
        >
            <ProductForm control={form.control} detail={detail} total={total} />
        </HydrationForm>
    );
};
