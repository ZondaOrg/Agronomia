import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import {
    selectFormCompleto,
    selectFormValores,
} from "@/features/cotizar/store/hidratationForm/hidratation-selectors";
import {
    mostrarFaltantes,
    solicitarGuardado,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import type { NotifyAction } from "@/shared/hooks/use-notify/modal-action";

const getStepId = (index: number) => String(index + 1);

export const useCotizador = (totalSteps: number) => {
    const dispatch = useAppDispatch();

    // Estado de pasos
    const [currentStep, setCurrentStep] = useState(0);
    const stepId = getStepId(currentStep);

    // Estado del Notify Handler
    const [isCancel, setIsCancel] = useState(false);
    const [action, setAction] = useState<NotifyAction | undefined>(undefined);

    const formCompleto = useAppSelector((s) => selectFormCompleto(s, stepId));
    const valores = useAppSelector((s) => selectFormValores(s, stepId));

    const pendingNext = useRef(false);

    // Avanza de paso solo cuando los valores se guardan correctamente
    useEffect(() => {
        if (!pendingNext.current) return;
        pendingNext.current = false;
        setCurrentStep((c) => Math.min(c + 1, totalSteps - 1));
    }, [valores, totalSteps]);

    const handleNext = useCallback(() => {
        if (!formCompleto) {
            dispatch(mostrarFaltantes(stepId));
            return;
        }
        pendingNext.current = true;
        dispatch(solicitarGuardado(stepId));
    }, [dispatch, formCompleto, stepId]);

    const handleCancel = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep((c) => c - 1);
        } else {
            setIsCancel(true);
            setAction("advertence");
        }
    }, [currentStep]);

    const closeNotify = useCallback(() => {
        setIsCancel(false);
        setAction(undefined);
    }, []);

    return {
        currentStep,
        setCurrentStep,
        handleNext,
        handleCancel,
        isCancel,
        setIsCancel,
        action,
        closeNotify,
    };
};
