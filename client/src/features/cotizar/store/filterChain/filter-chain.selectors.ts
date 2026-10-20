import type { RootState } from "../../../../core/store";

const EMPTY_VALUES: Record<string, string> = {};
const EMPTY_ENABLED: Record<string, boolean> = {};

export const selectStepValues = (state: RootState, stepId: string) =>
    state.filterChain.steps[stepId]?.values ?? EMPTY_VALUES;

export const selectFilterValues = selectStepValues;

export const selectFilterValue = (
    state: RootState,
    stepId: string,
    filterId: string,
) => state.filterChain.steps[stepId]?.values[filterId];

export const selectFiltersCompleto = (state: RootState, stepId: string) =>
    state.filterChain.steps[stepId]?.completo ?? false;

export const selectIsFilterEnabled = (
    state: RootState,
    stepId: string,
    filterId: string,
) => {
    const step = state.filterChain.steps[stepId];
    if (!step) return false;

    const index = step.config.findIndex((f) => f.id === filterId);
    if (index === -1) return false;
    if (index === 0) return true;

    return !!step.values[step.config[index - 1].id];
};

export const selectStepEnable = (state: RootState, stepId: string) => {
    const step = state.filterChain.steps[stepId];
    if (!step) return EMPTY_ENABLED;

    return step.config.reduce<Record<string, boolean>>((enabled, filter, index) => {
        enabled[filter.id] =
            index === 0 || !!step.values[step.config[index - 1].id];
        return enabled;
    }, {});
};

export const selectStepEnabled = selectStepEnable;
