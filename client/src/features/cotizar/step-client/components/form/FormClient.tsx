import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { HydrationForm } from "@/shared/components/step/components/form/HydratationForm";
import { CardCheckClient } from "../checks/CardCheckClient";
import type { Client } from "../../types/client";
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

const CAMPO_CLIENTE = "cliente";
const OBLIGATORIOS = [CAMPO_CLIENTE];

interface FormClientProps {
    items: Client[];
    loading?: boolean;
    stepId: string; // Nueva prop obligatoria
}

/**
 * Formulario de resultados del paso de cliente, conectado al slice `hidratationForm`.
 *
 * Registra el form al montar y traduce los avisos del `HydrationForm`
 * (cambio de valor, reset, guardado) en acciones del slice. Lee del slice
 * los pedidos del StepManager (`solicitarGuardado`, `mostrarFaltantes`)
 * y el valor ya guardado, para rehidratar al volver al paso.
 */
export const FormClient = ({
    items,
    loading = false,
    stepId,
}: FormClientProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initForm({ stepId: stepId, obligatorios: OBLIGATORIOS }));
    }, [dispatch]);

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
        (value: string | null) =>
            dispatch(
                setEstadoForm({
                    stepId: stepId,
                    formCompleto: Boolean(value),
                    camposFaltantes: value ? [] : OBLIGATORIOS,
                }),
            ),
        [dispatch],
    );
    const onReset = useCallback(() => dispatch(resetForm(stepId)), [dispatch]);
    const onSave = useCallback(
        (value: string | null) =>
            dispatch(
                guardarValores({
                    stepId: stepId,
                    valores: { [CAMPO_CLIENTE]: value },
                }),
            ),
        [dispatch],
    );

    return (
        <HydrationForm
            title="Clientes encontrados"
            subtitle="Selecciona uno para continuar"
            items={items}
            loading={loading}
            Input={CardCheckClient}
            error={highlightNonce > 0 && faltantes.includes(CAMPO_CLIENTE)}
            initialValue={valorGuardado}
            onValueChange={onValueChange}
            onReset={onReset}
            saveNonce={saveNonce}
            onSave={onSave}
        />
    );
};
