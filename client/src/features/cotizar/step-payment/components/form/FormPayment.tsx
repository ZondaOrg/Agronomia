import { useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { HydrationForm } from "@/shared/components/step/components/form/HydratationForm";
import {
    guardarValores,
    initForm,
    resetForm,
    setEstadoForm,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import {
    selectCamposFaltantes,
    selectFormValores,
    selectGuardadoNonce,
    selectMostrarFaltantesNonce,
} from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import { validateStepSchema } from "@/shared/components/step/components/form/schema-validator";
import { CardCheckPayment } from "../checks/CardCheckPayment";
import { AdditionalInformation } from "./AdditionalInformation";
import type { PaymentPreview } from "../../types/step-preview";
import {
    stepPaymentSchema,
    type StepPaymentFormValues,
} from "./payment-schema";

const FIELD_NAME = "payment";

interface FormPaymentProps {
    items: PaymentPreview[];
    loading?: boolean;
    stepId: string;
}

export const FormPayment = ({
    items,
    loading = false,
    stepId,
}: FormPaymentProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            initForm({
                stepId,
                obligatorios: [FIELD_NAME],
            }),
        );
    }, [dispatch, stepId]);

    const faltantes = useAppSelector((state) =>
        selectCamposFaltantes(state, stepId),
    );
    const saveNonce = useAppSelector((state) =>
        selectGuardadoNonce(state, stepId),
    );
    const highlightNonce = useAppSelector((state) =>
        selectMostrarFaltantesNonce(state, stepId),
    );
    const valoresGuardados = useAppSelector((state) =>
        selectFormValores(state, stepId),
    );
    const valorGuardado =
        typeof valoresGuardados?.[FIELD_NAME] === "string"
            ? valoresGuardados[FIELD_NAME]
            : "";
    const observacionesGuardadas =
        typeof valoresGuardados?.observations === "string"
            ? valoresGuardados.observations
            : "";

    const onValuesChange = useCallback(
        (values: StepPaymentFormValues) => {
            const result = validateStepSchema(stepPaymentSchema, values);

            dispatch(setEstadoForm({ stepId, ...result }));
        },
        [dispatch, stepId],
    );

    const onReset = useCallback(
        () => dispatch(resetForm(stepId)),
        [dispatch, stepId],
    );

    const onSave = useCallback(
        (values: StepPaymentFormValues) =>
            dispatch(guardarValores({ stepId, valores: values })),
        [dispatch, stepId],
    );

    return (
        <HydrationForm<PaymentPreview, StepPaymentFormValues>
            title="Formas de pago seleccionadas"
            subtitle="Elegí una forma de pago de la lista"
            items={items}
            loading={loading}
            Input={CardCheckPayment}
            fieldName={FIELD_NAME}
            defaultValues={{
                payment: valorGuardado,
                observations: observacionesGuardadas,
            }}
            error={highlightNonce > 0 && faltantes.includes(FIELD_NAME)}
            onValuesChange={onValuesChange}
            renderAdditionalFields={(control) => (
                <Controller
                    name="observations"
                    control={control}
                    render={({ field }) => (
                        <AdditionalInformation
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />
            )}
            onReset={onReset}
            saveNonce={saveNonce}
            onSave={onSave}
        />
    );
};
