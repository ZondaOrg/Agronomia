import { useEffect, useMemo } from "react";
import FilterChain from "@/shared/components/filter/chain/FilterChain";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { initStep } from "@/features/cotizar/store/filterChain/filter-chain.slice";
import {
    selectStepEnable,
    selectStepLabels,
    selectStepValues,
} from "@/features/cotizar/store/filterChain/filter-chain.selectors";
import type { ProviderOption } from "../../domain/provider-option";
import type { ProductOption } from "../../domain/product-option";

import { PRODUCT, PROVIDER, productFilters } from "./types/inputs";

interface FilterProductProps {
    stepId: string;
    providers: ProviderOption[];
    products: ProductOption[];
    onSearchProvider: (text: string) => void;
    onSearchProduct: (text: string) => void;
    onSelectProvider: (providerId: string | null) => void;
    onSelectProduct: (productId: string | null) => void;
}

/** Agrega la opción seleccionada si no está en la lista de resultados. */
const withSelected = <T extends { id: number; name: string }>(
    options: T[],
    value: string | undefined | null,
    label: string | undefined,
): { id: number; name: string }[] =>
    value && label && !options.some((o) => String(o.id) === value)
        ? [...options, { id: Number(value), name: label }]
        : options;

export const FilterProduct = ({
    stepId,
    providers,
    products,
    onSearchProvider,
    onSearchProduct,
    onSelectProvider,
    onSelectProduct,
}: FilterProductProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            initStep({
                stepId,
                filters: [
                    { id: PROVIDER, required: true },
                    { id: PRODUCT, required: true },
                ],
            }),
        );
    }, [dispatch, stepId]);

    const values = useAppSelector((s) => selectStepValues(s, stepId));
    const enabled = useAppSelector((s) => selectStepEnable(s, stepId));

    const labels = useAppSelector((s) => selectStepLabels(s, stepId));

    // Al remontar el paso las opciones fetcheadas están vacías: se agrega la
    // opción ya seleccionada (guardada en el store) para restaurar su texto.
    const filters = useMemo(
        () =>
            productFilters({
                providers: withSelected(providers, values[PROVIDER], labels[PROVIDER]),
                products: withSelected(products, values[PRODUCT], labels[PRODUCT]),
                onSearchProvider,
                onSearchProduct,
            }),
        [providers, products, values, labels, onSearchProvider, onSearchProduct],
    );

    const handleChange = (filterId: string, value: string | null) =>
        filterId === PROVIDER
            ? onSelectProvider(value)
            : onSelectProduct(value);

    return (
        <FilterChain
            filters={filters}
            values={values}
            enabled={enabled}
            onChange={handleChange}
        />
    );
};
