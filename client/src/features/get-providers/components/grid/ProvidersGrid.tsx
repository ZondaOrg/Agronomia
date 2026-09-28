import { useState, useEffect } from "react";
import { useGetProviders } from "../../hooks/use-get-providers";
import Spinner from "@/shared/components/spinner/Spinner";
import { ProviderCard } from "../card/ProviderCard";

import { styles } from "./style";
import { useSearchParams } from "react-router";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { NoProviders } from "./emptyState/NoProviders";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";

export const ProvidersGrid = () => {
    const { data, loading, getProviders } = useGetProviders();
    const { container, grid, spinnerWrapper } = styles();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const [page, setPage] = useState(0);
    const [prevSearch, setPrevSearch] = useState(search);

    if (search !== prevSearch) {
        setPrevSearch(search);
        setPage(0);
    }

    useEffect(() => {
        getProviders(page, search);
    }, [getProviders, page, search]);

    return (
        <div className={container}>
            {loading && (
                <div className={spinnerWrapper}>
                    <Spinner />
                </div>
            )}

            {data && (
                <div className={grid}>
                    {data.content.map((provider) => (
                        <ProviderCard
                            key={provider.id}
                            provider={provider}
                        />
                    ))}
                </div>
            )}

            {data &&
                data.content.length === 0 &&
                !loading &&
                (search ? (
                    <NotResults
                        search={search}
                        entity="proveedor"
                        description="Cambiá tu búsqueda o añade un proveedor"
                    />
                ) : (
                    <NoProviders />
                ))}

            {data && data.totalPages > 1 && (
                <Pagination
                    currentPage={page + 1}
                    totalPages={data.totalPages}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                />
            )}
        </div>
    );
};
