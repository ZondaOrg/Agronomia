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
    selectGuardadoNonce,
    selectMostrarFaltantesNonce,
} from "@/features/cotizar/store/hidratationForm/hidratation-selectors";

const STEP_ID = "1";
const CAMPO_CLIENTE = "cliente";
const OBLIGATORIOS = [CAMPO_CLIENTE];

interface FormClientProps {
    /** Clientes encontrados que se muestran para seleccionar. */
    items: Client[];
    /** @default false */
    loading?: boolean;
}

/**
 * Formulario de resultados del paso de cliente, conectado al slice `formChain`.
 *
 * Registra el form al montar y traduce los avisos del `HydrationForm`
 * (cambio de valor, reset, guardado) en acciones del slice. Lee del slice
 * los pedidos del StepManager (`solicitarGuardado`, `mostrarFaltantes`).
 */
export const FormClient = ({ items, loading = false }: FormClientProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initForm({ stepId: STEP_ID, obligatorios: OBLIGATORIOS }));
    }, [dispatch]);

    const faltantes = useAppSelector((s) => selectCamposFaltantes(s, STEP_ID));
    const saveNonce = useAppSelector((s) => selectGuardadoNonce(s, STEP_ID));
    const highlightNonce = useAppSelector((s) =>
        selectMostrarFaltantesNonce(s, STEP_ID),
    );

    const onValueChange = useCallback(
        (value: string | null) =>
            dispatch(
                setEstadoForm({
                    stepId: STEP_ID,
                    formCompleto: Boolean(value),
                    camposFaltantes: value ? [] : OBLIGATORIOS,
                }),
            ),
        [dispatch],
    );
    const onReset = useCallback(() => dispatch(resetForm(STEP_ID)), [dispatch]);
    const onSave = useCallback(
        (value: string | null) =>
            dispatch(
                guardarValores({
                    stepId: STEP_ID,
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
            onValueChange={onValueChange}
            onReset={onReset}
            saveNonce={saveNonce}
            onSave={onSave}
        />
    );
};
