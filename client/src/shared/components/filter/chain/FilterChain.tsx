import FilterField from "./field/FilterField";
import type { FilterFieldConfig } from "./types/filter-chain";

interface Props {
    filters: FilterFieldConfig[];
    values: Record<string, string | null>;
    enabled: Record<string, boolean>;
    onChange: (filterId: string, value: string | null) => void;
    completo?: boolean;
}

export default function FilterChain({
    filters,
    values,
    enabled,
    onChange,
}: Props) {
    return (
        <div>
            {filters.map((f) => (
                <FilterField
                    key={f.id}
                    filter={f}
                    value={values[f.id] ?? null}
                    enabled={enabled[f.id] ?? true}
                    onChange={(v) => onChange(f.id, v)}
                />
            ))}
        </div>
    );
}
