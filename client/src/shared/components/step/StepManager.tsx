import { useMemo } from "react";
import { token } from "@styled-system/tokens";
import { StepIndex } from "@/shared/components/step/components/index/StepIndex";
import Button from "../button/Button";
import { actions } from "./stepManager.style";

export interface StepDefinition {
    /** Texto que aparece en el índice. Si se omite, el paso no se muestra en el índice. */
    label?: string;
    component: React.ComponentType;
}

export interface StepManagerProps {
    title?: string;
    steps: StepDefinition[];
    Container: React.ComponentType<{
        children: React.ReactNode;
        title?: string;
    }>;
    currentStep: number;
    onStepChange: (step: number) => void;
    onNext: () => void;
    onCancel?: () => void;
}

export const StepManager = ({
    steps,
    Container,
    title,
    currentStep,
    onStepChange,
    onNext,
    onCancel,
}: StepManagerProps) => {
    const indexes = useMemo(
        () =>
            steps
                .map((s) => s.label)
                .filter((label): label is string => Boolean(label)),
        [steps],
    );

    const CurrentStep = steps[currentStep].component;

    return (
        <Container title={title}>
            <StepIndex
                steps={indexes}
                currentStep={currentStep}
                onStepClick={onStepChange}
            />
            <CurrentStep />
            <div className={actions}>
                <Button
                    color="white"
                    fullWidth
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={onCancel}
                >
                    {currentStep === 0 ? "Cancelar" : "Anterior"}
                </Button>
                <Button
                    fullWidth
                    color={token("colors.primaryColor")}
                    hoverColor={token("colors.primaryColorHover")}
                    textColor="white"
                    onClick={onNext}
                >
                    {currentStep === steps.length - 1
                        ? "Vista previa"
                        : "Siguiente"}
                </Button>
            </div>
        </Container>
    );
};
