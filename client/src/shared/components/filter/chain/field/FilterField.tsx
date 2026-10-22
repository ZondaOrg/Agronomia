import type { FilterFieldConfig } from "../types/filter-chain";
import { filterFieldStyles } from "./styles";

interface Props {
    filter: FilterFieldConfig;
    value: string | null;
    enabled: boolean;
    onChange: (value: string | null) => void;
}

export default function FilterField({
    filter,
    value,
    enabled,
    onChange,
}: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => onChange(e.target.value || null);

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
                    onChange={handleChange}
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
                    onChange={handleChange}
                />
            )}
        </label>
    );
}
