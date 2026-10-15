import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterChainState, FilterConfig } from "../types/filter-chain";

const initialState: FilterChainState = {
    steps: {},
};

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
    },
});

export const { initStep } = filterChainSlice.actions;
export const filterChainReducer = filterChainSlice.reducer;
