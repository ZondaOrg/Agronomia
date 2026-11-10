import type { FilterFieldConfig } from "@/shared/components/filter/chain/types/filter-chain";
import type { ProductOption } from "../../../domain/product-option";
import type { ProviderOption } from "../../../domain/provider-option";

export const PROVIDER = "proveedor";
export const PRODUCT = "producto";

interface ProductFiltersParams {
    providers: ProviderOption[];
    products: ProductOption[];
    onSearchProvider: (text: string) => void;
    onSearchProduct: (text: string) => void;
}

export const productFilters = ({
    providers,
    products,
    onSearchProvider,
    onSearchProduct,
}: ProductFiltersParams): FilterFieldConfig[] => [
    {
        id: PROVIDER,
        label: "Proveedor",
        required: true,
        variant: "autocomplete",
        options: providers.map((p) => ({
            value: String(p.id),
            label: p.name,
        })),
        onSearch: onSearchProvider,
    },
    {
        id: PRODUCT,
        label: "Producto",
        required: true,
        variant: "autocomplete",
        options: products.map((p) => ({
            value: String(p.id),
            label: p.name,
        })),
        onSearch: onSearchProduct,
    },
];
