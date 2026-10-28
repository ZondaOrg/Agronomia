import FilterChain from "@/shared/components/filter/chain/FilterChain";
import { clientFilters } from "./types/inputs";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { useCallback, useEffect, useMemo } from "react";
import {
    initStep,
    setFilterValue,
} from "@/features/cotizar/store/filterChain/filter-chain.slice";
import {
    selectFiltersCompleto,
    selectStepEnable,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";

import { selectMostrarFaltantesNonce } from "@/features/cotizar/store/hidratationForm/hidratation-selectors";

export const FilterClient = ({ stepId }: { stepId: string }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            initStep({
                stepId,
                filters: clientFilters.map(({ id, required }) => ({
                    id,
                    required,
                })),
            }),
        );
    }, [dispatch, stepId]);

    const filterValues = useAppSelector((s) => selectStepValues(s, stepId));
    const filterEnabled = useAppSelector((s) => selectStepEnable(s, stepId));
    const filtersCompleto = useAppSelector((s) =>
        selectFiltersCompleto(s, stepId),
    );

    const highlightNonce = useAppSelector((s) =>
        selectMostrarFaltantesNonce(s, stepId),
    );

    const filterErrors = useMemo(() => {
        if (highlightNonce === 0) return {};

        const errors: Record<string, boolean> = {};
        clientFilters.forEach((filter) => {
            if (filter.required && !filterValues[filter.id]) {
                errors[filter.id] = true;
            }
        });
        return errors;
    }, [highlightNonce, filterValues]);

    const handleFilterChange = useCallback(
        (filterId: string, value: string | null) =>
            dispatch(setFilterValue({ stepId, filterId, value })),
        [dispatch, stepId],
    );

    return (
        <FilterChain
            filters={clientFilters}
            values={filterValues}
            enabled={filterEnabled}
            onChange={handleFilterChange}
            completo={filtersCompleto}
            errors={filterErrors}
        />
    );
};
