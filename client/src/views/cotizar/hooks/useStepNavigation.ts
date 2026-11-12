import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/core/store/hooks";
import {
    clearAllForms,
    clearFormsPosteriores,
} from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import { clearStep } from "@/features/cotizar/store/filterChain/filter-chain.slice";
import { STEP_ADVERTENCE } from "@/features/cotizar/types/step-advertence";
import type { AdvertenceData } from "@/shared/components/notify/types/advertence-data";

export const getStepId = (index: number) => String(index + 1);

const EXIT_TARGET = -1;

interface UseStepNavigationParams {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    openNotify: () => void;
    closeNotify: () => void;
}

export const useStepNavigation = ({
    currentStep,
    setCurrentStep,
    openNotify,
    closeNotify,
}: UseStepNavigationParams) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [backTarget, setBackTarget] = useState<number | null>(null);

    const requestBack = useCallback(
        (target: number) => {
            setBackTarget(target);
            openNotify();
        },
        [openNotify],
    );

    const handleCancel = useCallback(
        () => requestBack(currentStep - 1),
        [requestBack, currentStep],
    );

    const handleStepClick = useCallback(
        (index: number) => requestBack(index),
        [requestBack],
    );

    const advertenceData = useMemo<AdvertenceData | undefined>(() => {
        if (backTarget === null) return undefined;

        const textos = STEP_ADVERTENCE[currentStep];

        const clearFilters = (from: number) => {
            for (let i = from; i <= currentStep; i++) {
                dispatch(clearStep(getStepId(i)));
            }
        };

        if (backTarget === EXIT_TARGET) {
            return {
                ...textos,
                onConfirm: () => {
                    dispatch(clearAllForms());
                    clearFilters(0);
                    closeNotify();
                    navigate(-1);
                },
            };
        }

        return {
            ...textos,
            onConfirm: () => {
                dispatch(clearFormsPosteriores(getStepId(backTarget)));
                clearFilters(backTarget + 1);
                setCurrentStep(backTarget);
                closeNotify();
            },
        };
    }, [backTarget, currentStep, dispatch, navigate, closeNotify, setCurrentStep]);

    return { handleCancel, handleStepClick, advertenceData };
};
