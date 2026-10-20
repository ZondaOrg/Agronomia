// Step.tsx
import { useEffect } from "react";
import { useAppSelector } from "@/core/store/hooks";
import {
    selectFiltersCompleto,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";

/** Valores de los filtros de un paso, indexados por id de filtro. */
export type FilterValues = Record<string, string>;

/** Propiedades del componente {@link Step}. */
export interface StepProps {
    /** Id del paso en el slice `filterChain`. Debe coincidir con el del filtro. */
    stepId: string;
    /** Componente que envuelve el contenido del paso. */
    Container: React.ComponentType<{ children: React.ReactNode }>;
    /** Filtro del paso. */
    filter: React.ReactNode;
    /** Se ejecuta con los valores del filtro cuando está completo. Debe tener una referencia estable. */
    service: (values: FilterValues) => void;
    /** Contenido del paso (resultados). */
    children: React.ReactNode;
}

/**
 * Renderiza un paso del formulario: filtro + contenido.
 *
 * Cuando el slice del filtro indica que está completo, ejecuta `service`
 * con los valores actuales.
 */
export const Step = ({
    stepId,
    Container,
    filter,
    service,
    children,
}: StepProps) => {
    const completo = useAppSelector((s) => selectFiltersCompleto(s, stepId));
    const values = useAppSelector((s) => selectStepValues(s, stepId));

    useEffect(() => {
        if (completo) service(values);
    }, [completo, values, service]);

    return (
        <Container>
            {filter}
            {children}
        </Container>
    );
};
