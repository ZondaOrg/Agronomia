import FilterChain from "@/shared/components/filter/chain/FilterChain";
import { clientFilters } from "./types/inputs";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { useCallback, useEffect } from "react";
import {
    initStep,
    setFilterValue,
} from "@/features/cotizar/store/filterChain/filter-chain.slice";
import {
    selectFiltersCompleto,
    selectStepEnable,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";

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
        />
    );
};
