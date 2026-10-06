import { useEffect } from "react";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useGetTypesProducts } from "../hook/use-get-types-products";
import { ProductTypesGrid } from "../components/product-types-grid/ProductTypesGrid";
import { styles } from "./styles";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";

export const ListTypesProductsPage = () => {
    const { data, loading, currentPage, getTypes, onPageChange } =
        useGetTypesProducts();
    const { container, spinnerWrapper } = styles();

    useEffect(() => {
        getTypes();
    }, [getTypes]);

    return (
        <SectionPanel
            titleSize="xl"
            maxWidth="full"
        >
            <div className={container}>
                {loading && (
                    <div className={spinnerWrapper}>
                        <Spinner />
                    </div>
                )}

                {data && data.content.length > 0 && (
                    <ProductTypesGrid productTypes={data.content} />
                )}

                {data && data.content.length === 0 && !loading && (
                    <EmptyState
                        icon={<TractorIcon />}
                        title="Todavía no cargaste ningún categorias de productos"
                    />
                )}

                {data && data.totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage + 1}
                        totalPages={data.totalPages}
                        onPageChange={(newPage) => onPageChange(newPage - 1)}
                    />
                )}
            </div>
        </SectionPanel>
    );
};
