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

const STEP_ID = "1";

export const FilterClient = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            initStep({
                stepId: STEP_ID,
                filters: clientFilters.map(({ id, required }) => ({
                    id,
                    required,
                })),
            }),
        );
    }, [dispatch]);

    const filterValues = useAppSelector((s) =>
        selectStepValues(s, STEP_ID),
    );
    const filterEnabled = useAppSelector((s) =>
        selectStepEnable(s, STEP_ID),
    );
    const filtersCompleto = useAppSelector((s) =>
        selectFiltersCompleto(s, STEP_ID),
    );

    const handleFilterChange = useCallback(
        (filterId: string, value: string | null) =>
            dispatch(setFilterValue({ stepId: STEP_ID, filterId, value })),
        [dispatch],
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
