import type { FilterFieldConfig } from "../types/filter-chain";
import { filterFieldStyles } from "./styles";

/** Propiedades del componente {@link FilterField}. */
interface Props {
    /** Configuración del filtro: etiqueta, variante (`select` o texto), opciones y si es obligatorio. */
    filter: FilterFieldConfig;
    /** Valor actual del campo. `null` equivale a "sin selección" y se muestra como cadena vacía. */
    value: string | null;
    /** Si es `false`, el control se muestra deshabilitado y el usuario no puede modificarlo. */
    enabled: boolean;
    /** Se ejecuta cuando el usuario cambia el valor. Recibe `null` si el valor queda vacío. */
    onChange: (value: string | null) => void;
}

/**
 * Renderiza un único campo de filtro con su etiqueta.
 *
 * Según `filter.variant` muestra:
 * - `"select"`: un desplegable con la opción "Seleccionar..." (valor vacío) seguida de `filter.options`.
 * - cualquier otro valor: un input de texto.
 *
 * Es un componente controlado: no guarda estado propio. Si el campo es
 * obligatorio (`filter.required`), se agrega un asterisco a la etiqueta.
 * Los valores vacíos se normalizan a `null` antes de llamar a `onChange`.
 *
 * @example
 * ```tsx
 * <FilterField
 *     filter={{ id: "marca", label: "Marca", variant: "select", options, required: true }}
 *     value={values.marca ?? null}
 *     enabled={enabled.marca ?? true}
 *     onChange={(v) => setValue("marca", v)}
 * />
 * ```
 */
export default function FilterField({
    filter,
    value,
    enabled,
    onChange,
}: Props) {
    /** Normaliza el valor del control: cadena vacía pasa a `null`. */
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
