import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { StepIndex } from "@/shared/components/step/components/index/StepIndex";
import {
    selectFormCompleto,
    selectFormValores,
} from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import {
    mostrarFaltantes,
    solicitarGuardado,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import Button from "../button/Button";
import { token } from "@styled-system/tokens";
import { actions } from "./stepManager.style";

export interface StepManagerProps {
    title?: string;
    indexes: string[];
    steps: React.ComponentType[];
    /** Id de cada paso en el store, en el mismo orden que `steps`. */
    stepIds: string[];
    Container: React.ComponentType<{
        children: React.ReactNode;
        title?: string;
    }>;
    /** Se ejecuta al presionar "Cancelar". */
    onCancel?: () => void;
}

export const StepManager = ({
    indexes,
    steps,
    stepIds,
    Container,
    title,
    onCancel,
}: StepManagerProps) => {
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const CurrentStep = steps[currentStep];
    const stepId = stepIds[currentStep];

    const formCompleto = useAppSelector((s) => selectFormCompleto(s, stepId));
    const valores = useAppSelector((s) => selectFormValores(s, stepId));

    // Esperamos a que el form publique los valores antes de avanzar
    const pendingNext = useRef(false);
    useEffect(() => {
        if (!pendingNext.current) return;
        pendingNext.current = false;
        setCurrentStep((c) => Math.min(c + 1, steps.length - 1));
    }, [valores, steps.length]);

    const handleNext = useCallback(() => {
        if (!formCompleto) {
            dispatch(mostrarFaltantes(stepId));
            return;
        }
        pendingNext.current = true;
        dispatch(solicitarGuardado(stepId));
    }, [dispatch, formCompleto, stepId]);

    return (
        <Container title={title}>
            <StepIndex
                steps={indexes}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
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
                    onClick={handleNext}
                >
                    {currentStep === steps.length - 1
                        ? "Vista previa"
                        : "Siguiente"}
                </Button>
            </div>
        </Container>
    );
};
