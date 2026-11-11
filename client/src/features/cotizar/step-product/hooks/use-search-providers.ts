import { useCallback } from "react";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import searchProvidersService from "../services/search-providers.service";
import type { ProviderOption } from "../domain/provider-option";

export const useSearchProviders = () => {
    const { data, isLoading, execute } = useFetch<ProviderOption[]>();

    const search = useCallback(
        (text: string) => execute(searchProvidersService)(text),
        [execute],
    );

    return { data, loading: isLoading, search };
};
