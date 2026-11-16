import { useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { StepPreview } from "../types/step-preview";
import { getStep3Preview } from "../service/get-step3-preview.service";

export const useGetPreview = (
    providerId: string | undefined,
    productId: string | undefined,
    opcionales: number[],
) => {
    const { data, error, isLoading, execute } = useFetch<StepPreview>();

    useEffect(() => {
        if (providerId && productId) {
            execute(getStep3Preview)({
                idProvider: Number(providerId),
                idProduct: Number(productId),
                idOptionals: opcionales,
            });
        }
    }, [execute, providerId, productId, opcionales]);

    return { data, error, loading: isLoading };
};
