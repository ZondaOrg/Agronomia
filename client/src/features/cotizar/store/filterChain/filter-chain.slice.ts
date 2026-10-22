import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    FilterChainState,
    FilterConfig,
    StepFiltersState,
} from "../../types/filter-chain";

const initialState: FilterChainState = {
    steps: {},
};

const isStepComplete = (step: StepFiltersState) =>
    step.config.filter((f) => f.required).every((f) => !!step.values[f.id]);

const filterChainSlice = createSlice({
    name: "filterChain",
    initialState,
    reducers: {
        initStep: (
            state,
            action: PayloadAction<{ stepId: string; filters: FilterConfig[] }>,
        ) => {
            const { stepId, filters } = action.payload;
            state.steps[stepId] = {
                config: filters,
                values: {},
                completo: false,
            };
        },
        setFilterValue: (
            state,
            action: PayloadAction<{
                stepId: string;
                filterId: string;
                value: string | null;
            }>,
        ) => {
            const { stepId, filterId, value } = action.payload;
            const step = state.steps[stepId];
            if (!step) return;

            const index = step.config.findIndex((f) => f.id === filterId);
            if (index === -1) return;

            step.config.slice(index).forEach((f) => {
                delete step.values[f.id];
            });
            if (value) step.values[filterId] = value;

            step.completo = isStepComplete(step);
        },
    },
});

export const { initStep, setFilterValue } = filterChainSlice.actions;
export const filterChainReducer = filterChainSlice.reducer;
