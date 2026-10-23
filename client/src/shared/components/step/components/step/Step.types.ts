import type { ReactNode } from "react";
import type { HydrationFormProps } from "../form/HydratationForm";
import type { ActionsVariants } from "./step.style";

/** Valores de los filtros de un paso, indexados por id de filtro. */
export type FilterValues = Record<string, string>;

/**
 * Dónde se renderiza el bloque de acciones dentro del paso.
 *
 * - `top`: arriba de todo, antes del filtro.
 * - `aside`: a la derecha del filtro, en la misma fila.
 * - `between`: entre el filtro y el formulario de hidratación.
 * - `bottom`: debajo de todo, después del formulario.
 */
export type ActionsPosition = "top" | "aside" | "between" | "bottom";

/** Propiedades del componente `Step`. */
export interface StepProps<TItem> {
    /** Id del paso en el slice `filterChain`. Debe coincidir con el del filtro. */
    stepId: string;

    /** Filtro del paso. */
    filter: ReactNode;

    /** Título del paso. */
    title?: string;

    /**
     * Se ejecuta con los valores del filtro cuando está completo.
     * Debe tener una referencia estable.
     */
    service: (values: FilterValues) => void;

    /**
     * Se ejecuta cuando el filtro deja de estar completo (y al montar, si
     * arranca incompleto). Sirve para vaciar los datos del paso.
     * Debe tener una referencia estable.
     */
    onClear?: () => void;

    /** Props del `HydrationForm` que muestra los resultados del paso. */
    form: HydrationFormProps<TItem>;

    /**
     * Contenido del bloque de acciones (por ejemplo, botones).
     * Si no se pasa, no se renderiza el bloque.
     */
    actions?: ReactNode;

    /**
     * Posición del bloque de acciones dentro del paso.
     * @default "bottom"
     */
    actionsPosition?: ActionsPosition;

    /**
     * Alineación horizontal de las acciones.
     * @default "right"
     */
    actionsAlign?: ActionsVariants["align"];

    /**
     * Separación entre las acciones.
     * @default "md"
     */
    actionsGap?: ActionsVariants["gap"];
}
