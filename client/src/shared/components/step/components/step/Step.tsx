import { useEffect } from "react";
import { useAppSelector } from "@/core/store/hooks";
import {
    selectFiltersCompleto,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import type { StepProps } from "./Step.types";
import {
    actionsRecipe,
    asideRowRecipe,
    line,
    subtitleStyles,
    title as titleStyle,
} from "./step.style";
import { css } from "@styled-system/css";

export type {
    ActionsPosition,
    ExtraPosition,
    FilterValues,
    StepProps,
} from "./Step.types";

export const Step = ({
    stepId,
    title,
    subtitle,
    filter,
    form,
    extra,
    extraPosition = "after",
    service,
    onClear,
    actions,
    actionsPosition = "bottom",
    actionsAlign,
    actionsGap,
}: StepProps) => {
    const completo = useAppSelector((s) => selectFiltersCompleto(s, stepId));
    const values = useAppSelector((s) => selectStepValues(s, stepId));

    const hasFilter = Boolean(filter);

    useEffect(() => {
        if (hasFilter && completo && service) {
            service(values);
        }
    }, [hasFilter, completo, values, service]);

    useEffect(() => {
        if (hasFilter && !completo && onClear) {
            onClear();
        }
    }, [hasFilter, completo, onClear]);

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
            {title && <h2 className={titleStyle}>{title}</h2>}
            <hr className={line}/>
            {subtitle && <p className={subtitleStyles}>{subtitle}</p>}
            {actionsPosition === "top" && actionsBlock}

            {actionsPosition === "aside" && filter ? (
                <div className={asideRowRecipe()}>
                    {filter}
                    {actionsBlock}
                </div>
            ) : (
                filter
            )}

            {actionsPosition === "between" && actionsBlock}
            {extraPosition === "before" && extra}

            {hasFilter ? completo && form : form}

            {extraPosition === "after" && extra}
            {actionsPosition === "bottom" && actionsBlock}
        </>
    );
};
