import type { FilterFieldConfig } from "../types/filter-chain";
import AutocompleteInput from "./AutocompleteInput";
import { filterFieldStyles } from "./styles";

interface Props {
    filter: FilterFieldConfig;
    value: string | null;
    enabled: boolean;
    onChange: (value: string | null) => void;
    error?: boolean;
}

export default function FilterField({
    filter,
    value,
    enabled,
    onChange,
    error,
}: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => onChange(e.target.value || null);

    return (
        <label className={filterFieldStyles.container}>
            <span className={filterFieldStyles.label({ error })}>
                {filter.label}
                {filter.required && " *"}
            </span>
            <div className={filterFieldStyles.row}>
            {filter.variant === "select" ? (
                <select
                    className={filterFieldStyles.control({ error })}
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
            ) : filter.variant === "autocomplete" ? (
                <AutocompleteInput
                    options={filter.options}
                    onSearch={filter.onSearch}
                    value={value}
                    enabled={enabled}
                    onChange={onChange}
                    error={error}
                />
            ) : (
                <input
                    className={filterFieldStyles.control({ error })}
                    disabled={!enabled}
                    type="text"
                    value={value ?? ""}
                    onChange={handleChange}
                />
            )}
            {filter.trailing}
            </div>
        </label>
    );
}
