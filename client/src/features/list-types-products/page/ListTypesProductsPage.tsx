import { useEffect } from "react";
import { PaginatedGrid } from "@/shared/components/pagination/PaginatedGrid";
import { ProductTypeCard } from "../components/product-type-card/ProductTypeCard";
import { useGetTypesProducts } from "../hook/use-get-types-products";
import { styles } from "./styles";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import { styles as gridStyles } from "../components/product-types-grid/styles";

interface ListTypesProductsPageProps {
    onRefreshReady?: (refresh: () => void) => void;
}

export const ListTypesProductsPage = ({
    onRefreshReady,
}: ListTypesProductsPageProps) => {
    const { data, loading, currentPage, getTypes, onPageChange } =
        useGetTypesProducts();
    const { container } = styles();
    const { grid } = gridStyles();

    useEffect(() => {
        getTypes();
    }, [getTypes]);

    useEffect(() => {
        onRefreshReady?.(() => getTypes(currentPage));
    }, [currentPage, getTypes, onRefreshReady]);

    return (
        <PaginatedGrid
            data={data}
            loading={loading}
            currentPage={currentPage + 1}
            onPageChange={(newPage) => onPageChange(newPage - 1)}
            containerClassName={container}
            gridClassName={grid}
            emptyState={
                <EmptyState
                    icon={<TractorIcon />}
                    title="Todavía no cargaste ningún categorias de productos"
                />
            }
            renderCard={(productType) => (
                <ProductTypeCard
                    key={productType.id}
                    productType={productType}
                />
            )}
        />
    );
};
