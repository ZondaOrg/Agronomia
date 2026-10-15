import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { selectFiltersCompleto } from "@/core/store/slices/filterChain/filter-chain.selectors";
import { initStep } from "@/core/store/slices/filterChain/filter-chain.slice";
import { useEffect } from "react";
import type { FilterFieldConfig } from "./types/filter-chain";
import FilterField from "./field/FilterField";

interface Props {
    stepId: string;
    filters: FilterFieldConfig[];
}

export default function FilterChain({ stepId, filters }: Props) {
    const dispatch = useAppDispatch();
    const completo = useAppSelector((s) => selectFiltersCompleto(s, stepId));

    useEffect(() => {
        dispatch(
            initStep({
                stepId,
                filters: filters.map(({ id, required }) => ({ id, required })),
            }),
        );
    }, [dispatch, stepId]);

    return (
        <div>
            {filters.map((f) => (
                <FilterField
                    key={f.id}
                    stepId={stepId}
                    filter={f}
                />
            ))}
            <p>Completo: {completo ? "sí" : "no"}</p>
        </div>
    );
}
