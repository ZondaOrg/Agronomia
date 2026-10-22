import { Chevron } from "./Chevron";
import { bulletRecipe, itemStyle, listStyle, stepRecipe } from "./styles";

/** Estado visual de un paso respecto al paso actual. */
type StepStatus = "previous" | "current" | "next";

/** Propiedades del componente {@link StepIndex}. */
export interface StepIndexProps {
    /** Títulos de los pasos del formulario, en orden. La vista previa se agrega sola al final. */
    steps: string[];
    /** Índice (base 0) del paso en el que está el usuario. */
    currentStep: number;
    /** Se llama con el índice del paso clickeado. Solo se dispara para pasos anteriores al actual. */
    onStepClick: (index: number) => void;
}

/** Título del último paso, que siempre se agrega al final de la lista. */
const PREVIEW_STEP = "Vista previa";

/**
 * Determina el estado de un paso comparando su índice con el del paso actual.
 *
 * @param index Índice del paso a evaluar.
 * @param currentStep Índice del paso actual.
 */
const getStatus = (index: number, currentStep: number): StepStatus => {
    if (index < currentStep) return "previous";
    if (index === currentStep) return "current";
    return "next";
};

/**
 * Renderiza el índice de pasos de un formulario.
 *
 * Muestra un indicador numerado por cada paso, más un último paso fijo de
 * vista previa. El paso actual se destaca en azul, los anteriores en celeste y
 * los siguientes en blanco. Solo los pasos anteriores son clickeables.
 *
 * Es un componente puramente visual: no conoce el estado global ni decide la
 * navegación, solo avisa mediante `onStepClick` qué paso se eligió.
 */
export const StepIndex = ({
    steps,
    currentStep,
    onStepClick,
}: StepIndexProps) => {
    const allSteps = [...steps, PREVIEW_STEP];

    return (
        <nav aria-label="Pasos del formulario">
            <ol className={listStyle}>
                {allSteps.map((step, index) => {
                    const status = getStatus(index, currentStep);
                    const isLast = index === allSteps.length - 1;

                    return (
                        <li
                            key={step}
                            className={itemStyle}
                        >
                            <button
                                type="button"
                                className={stepRecipe({ status })}
                                disabled={status !== "previous"}
                                aria-current={
                                    status === "current" ? "step" : undefined
                                }
                                onClick={() => onStepClick(index)}
                            >
                                <span className={bulletRecipe({ status })}>
                                    {index + 1}
                                </span>
                                <span>{step}</span>
                            </button>
                            {!isLast && <Chevron />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
