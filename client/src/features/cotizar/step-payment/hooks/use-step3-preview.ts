import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Step3PreviewRequest, StepPreview } from "../types/step-preview";
import { getStep3Preview } from "../service/get-step3-preview.service";

export const useStep3Preview = () => {
    const { data, error, isLoading, refresh, execute } =
        useFetch<StepPreview>();

    const getPreview = useCallback(
        (request: Step3PreviewRequest) => execute(getStep3Preview)(request),
        [execute],
    );

    return {
        data,
        error,
        loading: isLoading,
        getPreview,
        refresh,
    };
};
