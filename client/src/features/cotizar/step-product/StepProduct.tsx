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
import { Controller } from "react-hook-form";
import { resetForm } from "@/features/cotizar/store/hidratationForm/hidratation-form.slice";
import { FormProduct } from "./components/form/FormProduct";
import { QuantityInput } from "./components/form/quantity-input/QuantityInput";
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
    const productId = useAppSelector((s) =>
        selectFilterValue(s, stepId, PRODUCT),
    );

    const searchProducts = products.search;
    const handleSearchProduct = useCallback(
        (text: string) => {
            if (providerId) searchProducts(Number(providerId), text);
        },
        [providerId, searchProducts],
    );

    const providerOptions = providers.data;
    const handleSelectProvider = useCallback(
        (value: string | null) =>
            dispatch(
                setFilterValue({
                    stepId,
                    filterId: PROVIDER,
                    value,
                    label: providerOptions?.find((p) => String(p.id) === value)
                        ?.name,
                }),
            ),
        [dispatch, stepId, providerOptions],
    );

    const productOptions = products.data;
    const handleSelectProduct = useCallback(
        (value: string | null) =>
            dispatch(
                setFilterValue({
                    stepId,
                    filterId: PRODUCT,
                    value,
                    label: productOptions?.find((p) => String(p.id) === value)
                        ?.name,
                }),
            ),
        [dispatch, stepId, productOptions],
    );

    const handleSearch = useCallback((filters: FilterValues) => {
        // TODO: Implementar la lógica de búsqueda o llamada al servicio
    }, []);

    const handleClear = useCallback(
        () => dispatch(resetForm(stepId)),
        [dispatch, stepId],
    );

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
                <FormProduct
                    stepId={stepId}
                    form={product.form}
                    detail={product.detail}
                    total={product.total}
                    ars={product.ars}
                    arsLoading={product.arsLoading}
                    onSelectMoneda={product.onSelectMoneda}
                    onApplyDolar={product.onApplyDolar}
                />
            }
            service={handleSearch}
            onClear={handleClear}
            actionsPosition="aside"
            actions={
                productId ? (
                    <Controller
                        name="unidades"
                        control={product.form.control}
                        render={({ field }) => (
                            <QuantityInput
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                ) : undefined
            }
        />
    );
};
