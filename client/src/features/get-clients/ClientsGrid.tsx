import { useGetClients } from "./hooks/use-get-clients";
import { useSearchParams } from "react-router";
import { styles } from "./style";
import { useEffect, useState } from "react";
import ClientCard from "./components/card/ClientCard";
import EmptyClient from "./components/empty-clients/EmptyClients";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import { PaginatedGrid } from "@/shared/components/pagination/PaginatedGrid";
import { css } from "@styled-system/css";

const grid = css({
    display: "grid",
    gridTemplateColumns: {
        base: "1fr",
        sm: "repeat(2, 1fr)",
    },
    gap: "4",
});

export const ClientsGrid = () => {
    const { data, loading, getClients } = useGetClients();
    const { container } = styles();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const [page, setPage] = useState(0);
    const [prevSearch, setPrevSearch] = useState(search);

    if (search !== prevSearch) {
        setPrevSearch(search);
        setPage(0);
    }

    useEffect(() => {
        getClients(page, search);
    }, [getClients, page, search]);

    const emptyState = search ? (
        <NotResults
            search={search}
            entity="cliente"
            description="Cambiá tu búsqueda o añade un cliente"
        />
    ) : (
        <EmptyClient />
    );

    return (
        <PaginatedGrid
            data={data}
            loading={loading}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
            containerClassName={container}
            gridClassName={grid}
            emptyState={emptyState}
            renderCard={(client) => (
                <ClientCard
                    key={client.id}
                    client={client}
                />
            )}
        />
    );
};

export default ClientsGrid;
