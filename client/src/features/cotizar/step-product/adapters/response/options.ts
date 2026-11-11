import type { ProductOption } from "../../domain/product-option";
import type { ProviderOption } from "../../domain/provider-option";

export type OptionResponse = { 
    id: number; 
    name: string 
};

export function optionsAdapter(
    response: OptionResponse[],
): ProviderOption[] | ProductOption[] {
    return response.map(({ id, name }) => ({ id, name }));
}
