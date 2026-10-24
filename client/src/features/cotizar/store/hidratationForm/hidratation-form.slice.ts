import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    obligatorios: string[];
    formCompleto: boolean;
    camposFaltantes: string[];
    valores: Record<string, unknown>;
    guardadoNonce: number;
    mostrarFaltantesNonce: number;
}

type HydratationState = Record<string, FormState>;

const initialState: HydratationState = {};

const hydratationFormSlice = createSlice({
    name: "hidratationForm",
    initialState,
    reducers: {
        // CAMBIA: si ya existe, no pisa lo guardado
        initForm(
            state,
            action: PayloadAction<{ stepId: string; obligatorios: string[] }>,
        ) {
            const { stepId, obligatorios } = action.payload;
            if (state[stepId]) {
                state[stepId].obligatorios = obligatorios;
                return;
            }
            state[stepId] = {
                obligatorios,
                formCompleto: false,
                camposFaltantes: obligatorios,
                valores: {},
                guardadoNonce: 0,
                mostrarFaltantesNonce: 0,
            };
        },

        setEstadoForm(
            state,
            action: PayloadAction<{
                stepId: string;
                formCompleto: boolean;
                camposFaltantes: string[];
            }>,
        ) {
            const { stepId, formCompleto, camposFaltantes } = action.payload;
            const form = state[stepId];
            if (!form) return;
            form.formCompleto = formCompleto;
            form.camposFaltantes = camposFaltantes;
        },

        // CAMBIA: limpia la selección en curso, pero NO toca `valores`
        resetForm(state, action: PayloadAction<string>) {
            const form = state[action.payload];
            if (!form) return;
            form.formCompleto = false;
            form.camposFaltantes = form.obligatorios;
        },

        // Borrado total (por ejemplo, al cancelar la cotización)
        clearForm(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },

        solicitarGuardado(state, action: PayloadAction<string>) {
            const form = state[action.payload];
            if (form) form.guardadoNonce += 1;
        },

        // CAMBIA: referencia nueva en cada guardado, para que el panel detecte el cambio
        guardarValores(
            state,
            action: PayloadAction<{
                stepId: string;
                valores: Record<string, unknown>;
            }>,
        ) {
            const { stepId, valores } = action.payload;
            const form = state[stepId];
            if (!form) return;
            form.valores = { ...valores };
        },

        mostrarFaltantes(state, action: PayloadAction<string>) {
            const form = state[action.payload];
            if (form) form.mostrarFaltantesNonce += 1;
        },
    },
});

export const {
    initForm,
    setEstadoForm,
    resetForm,
    clearForm,
    solicitarGuardado,
    guardarValores,
    mostrarFaltantes,
} = hydratationFormSlice.actions;

export default hydratationFormSlice.reducer;
