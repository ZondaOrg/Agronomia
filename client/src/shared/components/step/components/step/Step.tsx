import { useEffect } from "react";
import { useAppSelector } from "@/core/store/hooks";
import {
    selectFiltersCompleto,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { HydrationForm } from "../form/HydratationForm";
import type { StepProps } from "./Step.types";
import { actionsRecipe, asideRowRecipe } from "./step.style";

export type { ActionsPosition, FilterValues, StepProps } from "./Step.types";

/**
 * Renderiza un paso del formulario: filtro + formulario de hidratación,
 * con un bloque opcional de acciones.
 *
 * Cuando el slice del filtro indica que está completo, ejecuta `service`
 * con los valores actuales. Cuando deja de estar completo, ejecuta `onClear`
 * para que quien usa el paso limpie los datos que hidratan el formulario.
 *
 * El bloque `actions` se ubica según `actionsPosition`:
 * - `top`: arriba de todo.
 * - `aside`: a la derecha del filtro, en la misma fila.
 * - `between`: entre el filtro y el formulario.
 * - `bottom`: debajo de todo.
 *
 * Se estiliza con las variantes `actionsAlign` y `actionsGap`.
 *
 * @example
 * <Step
 *     stepId="cliente"
 *     filter={<FilterClient />}
 *     service={buscarClientes}
 *     onClear={limpiarClientes}
 *     form={formProps}
 *     actionsPosition="aside"
 *     actions={<AddClientAction onClick={handleAddClient} />}
 * />
 */
export const Step = <TItem,>({
    stepId,
    filter,
    service,
    onClear,
    form,
    actions,
    actionsPosition = "bottom",
    actionsAlign,
    actionsGap,
    title,
}: StepProps<TItem>) => {
    const completo = useAppSelector((s) => selectFiltersCompleto(s, stepId));
    const values = useAppSelector((s) => selectStepValues(s, stepId));

    useEffect(() => {
        if (completo) service(values);
    }, [completo, values, service]);

    useEffect(() => {
        if (!completo) onClear?.();
    }, [completo, onClear]);

    const actionsBlock = actions ? (
        <div
            className={actionsRecipe({
                align: actionsAlign,
                gap: actionsGap,
                position: actionsPosition,
            })}
        >
            {actions}
        </div>
    ) : null;

    return (
        <>
            {title && <h1 className={title}>{title}</h1>}
            {actionsPosition === "top" && actionsBlock}
            {actionsPosition === "aside" ? (
                <div className={asideRowRecipe()}>
                    {filter}
                    {actionsBlock}
                </div>
            ) : (
                filter
            )}
            {actionsPosition === "between" && actionsBlock}
            <HydrationForm {...form} />
            {actionsPosition === "bottom" && actionsBlock}
        </>
    );
};
