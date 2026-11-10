import http from "@/core/server/http-client";
import { PROVIDER_SEARCH } from "@/core/server/urls/provider";
import type { ProviderOption } from "../domain/provider-option";
import { optionsAdapter, type OptionResponse } from "../adapters/response";

async function searchProviders(search: string): Promise<ProviderOption[]> {
    const response = await http.get<OptionResponse[]>(PROVIDER_SEARCH, {
        params: { search },
    });
    return optionsAdapter(response.data);
}

export default searchProviders;
