import { useEffect, useState } from "react";
import SectionPanel from "@/shared/components/section/components/section-panel/SectionPanel";
import Spinner from "@/shared/components/spinner/Spinner";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useGetTypesProducts } from "../hook/use-get-types-products";
import { ProductTypesGrid } from "../components/product-types-grid/ProductTypesGrid";
import { styles } from "./styles";

export const ListTypesProductsPage = () => {
    const { data, loading, getTypes } = useGetTypesProducts();
    const { container, empty, spinnerWrapper } = styles();
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTypes(page, 9);
    }, [getTypes, page]);

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
                    <p className={empty}>
                        No hay tipos de productos disponibles.
                    </p>
                )}

                {data && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page + 1}
                        totalPages={data.totalPages}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                    />
                )}
            </div>
        </SectionPanel>
    );
};
