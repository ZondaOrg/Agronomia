import { useEffect } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { Provider } from "../types/Provider";
import { getProviderById as getProviderByIdService } from "../service/get-provider-by-id.service";
import { useParams } from "react-router";

export const useGetProviderById = () => {
    const { data, execute } = useFetch<Provider>();
    const { providerId } = useParams<{ providerId: string }>();

    useEffect(() => {
        execute(() => getProviderByIdService(Number(providerId)))()
    }, [execute, providerId]);
    
    return {
        data,
        providerId: Number(providerId)
    };
};
