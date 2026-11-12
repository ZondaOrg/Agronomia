import { useState } from "react";
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

    const requestBack = (target: number) => {
        setBackTarget(target);
        openNotify();
    };

    const handleCancel = () => requestBack(currentStep - 1);

    const handleStepClick = (index: number) => requestBack(index);

    const clearFilters = (from: number) => {
        for (let i = from; i <= currentStep; i++) {
            dispatch(clearStep(getStepId(i)));
        }
    };

    const buildAdvertenceData = (
        target: number,
    ): AdvertenceData => {
        const textos = STEP_ADVERTENCE[currentStep];

        if (target === EXIT_TARGET) {
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
                dispatch(clearFormsPosteriores(getStepId(target)));
                clearFilters(target + 1);
                setCurrentStep(target);
                closeNotify();
            },
        };
    };

    const advertenceData =
        backTarget === null ? undefined : buildAdvertenceData(backTarget);

    return { handleCancel, handleStepClick, advertenceData };
};
