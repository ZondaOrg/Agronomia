import { useCallback } from "react";
import {
    Step,
    type FilterValues,
} from "@/shared/components/step/components/step/Step";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.slice";
import { selectFilterValue } from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import { FilterProduct } from "./components/filter/FilterProduct";
import { PRODUCT, PROVIDER } from "./components/filter/types/inputs";
import { useSearchProviders } from "./hooks/use-search-providers";
import { ProductForm } from "./components/form/ProductForm";
import { useStepProduct } from "./hooks/use-step-product";
import { useSearchProducts } from "./hooks/use-search-products";

interface StepProductProps {
    stepId: string;
}

export const StepProduct = ({ stepId }: StepProductProps) => {
    const dispatch = useAppDispatch();
    const providers = useSearchProviders();
    const products = useSearchProducts();
    const product = useStepProduct(stepId);
    const providerId = useAppSelector((s) =>
        selectFilterValue(s, stepId, PROVIDER),
    );

    const searchProducts = products.search;
    const handleSearchProduct = useCallback(
        (text: string) => {
            if (providerId) searchProducts(Number(providerId), text);
        },
        [providerId, searchProducts],
    );

    const handleSelectProvider = useCallback(
        (value: string | null) =>
            dispatch(setFilterValue({ stepId, filterId: PROVIDER, value })),
        [dispatch, stepId],
    );

    const handleSelectProduct = useCallback(
        (value: string | null) =>
            dispatch(setFilterValue({ stepId, filterId: PRODUCT, value })),
        [dispatch, stepId],
    );

    const handleSearch = useCallback((filters: FilterValues) => {
        // TODO: Implementar la lógica de búsqueda o llamada al servicio
    }, []);

    const handleClear = useCallback(() => {
        // TODO: Implementar la lógica para limpiar o resetear datos
    }, []);

    return (
        <Step
            stepId={stepId}
            filter={
                <FilterProduct
                    stepId={stepId}
                    providers={providers.data ?? []}
                    products={products.data ?? []}
                    onSearchProvider={providers.search}
                    onSearchProduct={handleSearchProduct}
                    onSelectProvider={handleSelectProvider}
                    onSelectProduct={handleSelectProduct}
                />
            }
            form={
                <ProductForm
                    detail={product.detail}
                    moneda={product.moneda}
                    freight={product.freight}
                    quantity={product.quantity}
                    total={product.total}
                    onMonedaChange={product.onMonedaChange}
                    onFreightChange={product.onFreightChange}
                    onQuantityChange={product.onQuantityChange}
                />
            }
            service={handleSearch}
            onClear={handleClear}
            actionsPosition="aside"
            // actions={<TuAccionAdicional />} // Opcional
        />
    );
};
