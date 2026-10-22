// StepManager.tsx
import { useState } from "react";
import { StepIndex } from "@/shared/components/step/components/index/StepIndex";

/** Propiedades del componente {@link StepManager}. */
export interface StepManagerProps {
    /** Titulo que muestra el container **/
    title?: string;
    /** Títulos que muestra el índice. La vista previa la agrega `StepIndex` sola. */
    indexes: string[];
    /** Componentes de cada paso, en orden. Incluye la vista previa como último. */
    steps: React.ComponentType[];
    /** Componente que envuelve el índice y el paso actual. */
    Container: React.ComponentType<{
        children: React.ReactNode;
        title?: string;
    }>;
}

/**
 * Orquesta la navegación entre los pasos del formulario.
 *
 * Renderiza el índice y el paso actual dentro del `Container`. Solo se puede
 * volver a pasos anteriores, ya que `StepIndex` no permite clickear los siguientes.
 */
export const StepManager = ({
    indexes,
    steps,
    Container,
    title,
}: StepManagerProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const CurrentStep = steps[currentStep];

    return (
        <Container title={title}>
            <StepIndex
                steps={indexes}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
            />
            <CurrentStep />
        </Container>
    );
};
