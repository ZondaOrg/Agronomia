import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { Container } from "@/features/cotizar/components/Container";
import { StepClient } from "@/features/cotizar/step-client/page/StepClient";
import { StepPayment } from "@/features/cotizar/step-payment/pages/StepPayment";
import { StepPreview } from "@/features/cotizar/step-preview/pages/StepPreview";
import { StepProduct } from "@/features/cotizar/step-product/StepProduct";
import {
    selectFormCompleto,
    selectFormValores,
} from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import {
    mostrarFaltantes,
    solicitarGuardado,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import {
    StepManager,
    type StepDefinition,
} from "@/shared/components/step/StepManager";

const STEPS: StepDefinition[] = [
    { label: "Cliente", component: StepClient },
    { label: "Producto", component: StepProduct },
    { label: "Formas de pago", component: StepPayment },
    { component: StepPreview },
];

const getStepId = (index: number) => String(index + 1);

export const CotizarPanel = () => {
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const stepId = getStepId(currentStep);

    const formCompleto = useAppSelector((s) => selectFormCompleto(s, stepId));
    const valores = useAppSelector((s) => selectFormValores(s, stepId));

    const pendingNext = useRef(false);

    useEffect(() => {
        if (!pendingNext.current) return;
        pendingNext.current = false;
        setCurrentStep((c) => Math.min(c + 1, STEPS.length - 1));
    }, [valores]);

    const handleNext = useCallback(() => {
        if (!formCompleto) {
            dispatch(mostrarFaltantes(stepId));
            return;
        }
        pendingNext.current = true;
        dispatch(solicitarGuardado(stepId));
    }, [dispatch, formCompleto, stepId]);

    const handleCancel = useCallback(() => {
        setCurrentStep((c) => Math.max(c - 1, 0));
    }, []);

    return (
        <StepManager
            steps={STEPS}
            Container={Container}
            title="Nueva cotización"
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onNext={handleNext}
            onCancel={handleCancel}
        />
    );
};
