import type { RootState } from "@/core/store";

/** Referencia estable para evitar renders cuando el form no existe aún. */
const EMPTY_LIST: string[] = [];

/** `true` si el form del paso cumple el esquema. Lo usa el StepManager para habilitar el botón. */
export const selectFormCompleto = (s: RootState, stepId: string) =>
    s.hidratationForm[stepId]?.formCompleto ?? false;

/** Campos obligatorios que todavía no están completos. */
export const selectCamposFaltantes = (s: RootState, stepId: string) =>
    s.hidratationForm[stepId]?.camposFaltantes ?? EMPTY_LIST;

/** Valores publicados por el form tras `solicitarGuardado`. */
export const selectFormValores = (s: RootState, stepId: string) =>
    s.hidratationForm[stepId]?.valores;

/** Contador de pedidos de guardado. */
export const selectGuardadoNonce = (s: RootState, stepId: string) =>
    s.hidratationForm[stepId]?.guardadoNonce ?? 0;

/** Contador de pedidos de resaltado. */
export const selectMostrarFaltantesNonce = (s: RootState, stepId: string) =>
    s.hidratationForm[stepId]?.mostrarFaltantesNonce ?? 0;
