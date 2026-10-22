import { useEffect } from "react";
import { useAppSelector } from "@/core/store/hooks";
import {
    selectFiltersCompleto,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import {
    HydrationForm,
    type HydrationFormProps,
} from "../form/HydratationForm";

/** Valores de los filtros de un paso, indexados por id de filtro. */
export type FilterValues = Record<string, string>;

/** Propiedades del componente {@link Step}. */
export interface StepProps<TItem> {
    /** Id del paso en el slice `filterChain`. Debe coincidir con el del filtro. */
    stepId: string;
    /** Filtro del paso. */
    filter: React.ReactNode;
    /** Se ejecuta con los valores del filtro cuando está completo. Debe tener una referencia estable. */
    service: (values: FilterValues) => void;
    /**
     * Se ejecuta cuando el filtro deja de estar completo (y al montar, si arranca incompleto).
     * Sirve para vaciar los datos del paso. Debe tener una referencia estable.
     */
    onClear?: () => void;
    /** Props del {@link HydrationForm} que muestra los resultados del paso. */
    form: HydrationFormProps<TItem>;
}

/**
 * Renderiza un paso del formulario: filtro + formulario de hidratación.
 *
 * Cuando el slice del filtro indica que está completo, ejecuta `service`
 * con los valores actuales. Cuando deja de estar completo, ejecuta `onClear`
 * para que quien usa el paso limpie los datos que hidratan el formulario.
 */
export const Step = <TItem,>({
    stepId,
    filter,
    service,
    onClear,
    form,
}: StepProps<TItem>) => {
    const completo = useAppSelector((s) => selectFiltersCompleto(s, stepId));
    const values = useAppSelector((s) => selectStepValues(s, stepId));

    useEffect(() => {
        if (completo) service(values);
    }, [completo, values, service]);

    useEffect(() => {
        if (!completo) onClear?.();
    }, [completo, onClear]);

    return (
        <>
            {filter}
            <HydrationForm {...form} />
        </>
    );
};
