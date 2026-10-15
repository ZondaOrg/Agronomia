import {
    selectFilterValue,
    selectIsFilterEnabled,
} from "@/core/store/slices/filterChain/filter-chain.selectors";
import type { FilterFieldConfig } from "../types/filter-chain";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setFilterValue } from "@/core/store/slices/filterChain/filter-chain.slice";
import { filterFieldStyles } from "./styles";

interface Props {
    stepId: string;
    filter: FilterFieldConfig;
}

export default function FilterField({ stepId, filter }: Props) {
    const dispatch = useAppDispatch();
    const value = useAppSelector((s) =>
        selectFilterValue(s, stepId, filter.id),
    );
    const enabled = useAppSelector((s) =>
        selectIsFilterEnabled(s, stepId, filter.id),
    );

    return (
        <label className={filterFieldStyles.container}>
            <span className={filterFieldStyles.label}>
                {filter.label}
                {filter.required && " *"}
            </span>
            {filter.variant === "select" ? (
                <select
                    className={filterFieldStyles.control}
                    disabled={!enabled}
                    value={value ?? ""}
                    onChange={(e) =>
                        dispatch(
                            setFilterValue({
                                stepId,
                                filterId: filter.id,
                                value: e.target.value || null,
                            }),
                        )
                    }
                >
                    <option value="">Seleccionar...</option>
                    {filter.options.map((o) => (
                        <option
                            key={o.value}
                            value={o.value}
                        >
                            {o.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    className={filterFieldStyles.control}
                    disabled={!enabled}
                    type="text"
                    value={value ?? ""}
                    onChange={(e) =>
                        dispatch(
                            setFilterValue({
                                stepId,
                                filterId: filter.id,
                                value: e.target.value || null,
                            }),
                        )
                    }
                />
            )}
        </label>
    );
}
