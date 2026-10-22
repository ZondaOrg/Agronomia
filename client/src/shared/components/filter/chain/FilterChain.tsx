import FilterField from "./field/FilterField";
import type { FilterFieldConfig } from "./types/filter-chain";
import { title as titleStyle } from "./style";

/** Propiedades del componente {@link FilterChain}. */
interface Props {
    /** Título que se muestra sobre la cadena de filtros. */
    title?: string;
    /** Configuración de cada filtro, en el orden en que se renderizan. */
    filters: FilterFieldConfig[];
    /** Valor actual de cada filtro, indexado por id. `null` o ausente equivale a "sin selección". */
    values: Record<string, string | null>;
    /** Indica si cada filtro está habilitado, indexado por id. Si falta el id, se asume habilitado. */
    enabled: Record<string, boolean>;
    /** Se ejecuta cuando el usuario cambia el valor de un filtro. */
    onChange: (filterId: string, value: string | null) => void;
    /**
     * No se utiliza actualmente en el componente.
     * @deprecated Declarada en `Props` pero nunca leída; se puede eliminar.
     */
    completo?: boolean;
}

/**
 * Renderiza una cadena de filtros dependientes, uno debajo del otro.
 *
 * Es un componente controlado: no guarda estado propio. Los valores y la
 * habilitación de cada filtro vienen por props, y los cambios se informan
 * con `onChange`. Cada filtro se delega a {@link FilterField}.
 *
 * @example
 * ```tsx
 * <FilterChain
 *     title="Cotizar"
 *     filters={filters}
 *     values={values}
 *     enabled={enabled}
 *     onChange={(id, value) => dispatch(setFilterValue({ id, value }))}
 * />
 * ```
 */
export default function FilterChain({
    title,
    filters,
    values,
    enabled,
    onChange,
}: Props) {
    return (
        <div>
            <h1 className={titleStyle}>{title}</h1>
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
