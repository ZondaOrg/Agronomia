import { useEffect, useState } from "react";
import { Pagination } from "@/shared/components/pagination/Pagination";
import Spinner from "@/shared/components/spinner/Spinner";
import { useGetTypesProducts } from "@/features/list-types-products/hook/use-get-types-products";
import { styles } from "./styles";

export const ListTypesProduct = () => {
    const { data, loading, getTypes } = useGetTypesProducts();
    const { container, grid, card, image, imagePlaceholder, name, spinnerWrapper } =
        styles();
    const [page, setPage] = useState(0);

    useEffect(() => {
        getTypes(page, 8);
    }, [getTypes, page]);

    return (
        <div className={container}>
            {loading && (
                <div className={spinnerWrapper}>
                    <Spinner />
                </div>
            )}

            {data && (
                <div className={grid}>
                    {data.content.map((productType) => (
                        <article
                            className={card}
                            key={productType.id}
                        >
                            {productType.image ? (
                                <img
                                    className={image}
                                    src={productType.image}
                                    alt={productType.name}
                                />
                            ) : (
                                <div
                                    className={imagePlaceholder}
                                    aria-label="Tipo de producto sin imagen"
                                />
                            )}
                            <h2 className={name}>{productType.name}</h2>
                        </article>
                    ))}
                </div>
            )}

            {data && (
                <Pagination
                    currentPage={page + 1}
                    totalPages={data.totalPages}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                />
            )}
        </div>
    );
};
