import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    HidratationFormState,
    FormStepState,
    GuardarValoresPayload,
    InitFormPayload,
    SetEstadoFormPayload,
} from "./hidratation-form.types";

const initialState: HidratationFormState = {};

/** Estado inicial de un form: incompleto, con todos los obligatorios faltando. */
const createStepState = (obligatorios: string[]): FormStepState => ({
    obligatorios,
    formCompleto: false,
    camposFaltantes: [...obligatorios],
    valores: {},
    guardadoNonce: 0,
    mostrarFaltantesNonce: 0,
});

/** Compara dos listas de strings por contenido y orden. */
const sonIguales = (a: string[], b: string[]) =>
    a.length === b.length && a.every((item, i) => item === b[i]);

/**
 * Slice con el estado de los forms por paso.
 *
 * El form mantiene sus valores en estado local y publica acá solo su
 * completitud. Los valores se publican únicamente cuando el StepManager
 * despacha `solicitarGuardado`.
 */
const hidratationFormSlice = createSlice({
    name: "hidratationForm",
    initialState,
    reducers: {
        /**
         * Registra el form de un paso. Si ya existe, no hace nada, para no
         * pisar el estado al remontar el componente.
         */
        initForm: (state, { payload }: PayloadAction<InitFormPayload>) => {
            state[payload.stepId] ??= createStepState(payload.obligatorios);
        },

        /**
         * Resetea el form: `formCompleto` pasa a `false`, `camposFaltantes`
         * vuelve a la lista completa de obligatorios y se limpian el resaltado
         * y los valores publicados.
         *
         * Se despacha cuando cambia el contenido del form o cuando se vuelve
         * a un paso anterior.
         */
        resetForm: (state, { payload: stepId }: PayloadAction<string>) => {
            const step = state[stepId];
            if (!step) return;
            step.formCompleto = false;
            step.camposFaltantes = [...step.obligatorios];
            step.valores = {};
            step.mostrarFaltantesNonce = 0;
        },

        /**
         * Publica la completitud del form. Ignora el update si no cambió
         * nada, para evitar renders en cadena.
         */
        setEstadoForm: (
            state,
            { payload }: PayloadAction<SetEstadoFormPayload>,
        ) => {
            const step = state[payload.stepId];
            if (!step) return;
            if (
                step.formCompleto === payload.formCompleto &&
                sonIguales(step.camposFaltantes, payload.camposFaltantes)
            ) {
                return;
            }
            step.formCompleto = payload.formCompleto;
            step.camposFaltantes = payload.camposFaltantes;
        },

        /** Pide al form que publique sus valores. La despacha el StepManager. */
        solicitarGuardado: (
            state,
            { payload: stepId }: PayloadAction<string>,
        ) => {
            const step = state[stepId];
            if (step) step.guardadoNonce += 1;
        },

        /** Guarda los valores que publicó el form tras `solicitarGuardado`. */
        guardarValores: (
            state,
            { payload }: PayloadAction<GuardarValoresPayload>,
        ) => {
            const step = state[payload.stepId];
            if (step) step.valores = payload.valores;
        },

        /**
         * Pide al form que resalte los campos de `camposFaltantes`.
         * La despacha el StepManager.
         */
        mostrarFaltantes: (
            state,
            { payload: stepId }: PayloadAction<string>,
        ) => {
            const step = state[stepId];
            if (step) step.mostrarFaltantesNonce += 1;
        },
    },
});

export const {
    initForm,
    resetForm,
    setEstadoForm,
    solicitarGuardado,
    guardarValores,
    mostrarFaltantes,
} = hidratationFormSlice.actions;

export default hidratationFormSlice.reducer;
