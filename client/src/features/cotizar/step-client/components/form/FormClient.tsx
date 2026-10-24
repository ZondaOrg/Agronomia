import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { HydrationForm } from "@/shared/components/step/components/form/HydratationForm";
import { CardCheckClient } from "../checks/CardCheckClient";
import type { Client } from "../../types/client";
import { stepClientSchema, type StepClientFormValues } from "./client-schema";
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

const CAMPO_CLIENTE = "cliente";

interface FormClientProps {
    items: Client[];
    loading?: boolean;
    stepId: string;
}

export const FormClient = ({
    items,
    loading = false,
    stepId,
}: FormClientProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            initForm({
                stepId,
                obligatorios: Object.keys(stepClientSchema.shape),
            }),
        );
    }, [dispatch, stepId]);

    const faltantes = useAppSelector((s) => selectCamposFaltantes(s, stepId));
    const saveNonce = useAppSelector((s) => selectGuardadoNonce(s, stepId));
    const highlightNonce = useAppSelector((s) =>
        selectMostrarFaltantesNonce(s, stepId),
    );
    const valorGuardado = useAppSelector(
        (s) =>
            (selectFormValores(s, stepId)?.[CAMPO_CLIENTE] as
                | string
                | null
                | undefined) ?? null,
    );

    const onValueChange = useCallback(
        (value: string | null) => {
            const currentValues = { [CAMPO_CLIENTE]: value ?? "" };

            const { formCompleto, camposFaltantes } = validateStepSchema(
                stepClientSchema,
                currentValues,
            );

            dispatch(
                setEstadoForm({
                    stepId,
                    formCompleto,
                    camposFaltantes,
                }),
            );
        },
        [dispatch, stepId],
    );

    const onReset = useCallback(
        () => dispatch(resetForm(stepId)),
        [dispatch, stepId],
    );

    const onSave = useCallback(
        (values: StepClientFormValues) =>
            dispatch(
                guardarValores({
                    stepId,
                    valores: values,
                }),
            ),
        [dispatch, stepId],
    );

    return (
        <HydrationForm<Client, StepClientFormValues>
            title="Clientes encontrados"
            subtitle="Selecciona uno para continuar"
            items={items}
            loading={loading}
            Input={CardCheckClient}
            fieldName="cliente"
            defaultValues={{ cliente: valorGuardado ?? "" }}
            error={highlightNonce > 0 && faltantes.includes(CAMPO_CLIENTE)}
            onValueChange={onValueChange}
            onReset={onReset}
            saveNonce={saveNonce}
            onSave={onSave}
        />
    );
};
