import { useGetClients } from "./hooks/use-get-clients";
import ClientCard from "./components/card/ClientCard";
import EmptyClient from "./components/empty-clients/EmptyClients";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import { PaginatedGrid } from "@/shared/components/pagination/PaginatedGrid";
import { styles } from "./style";

export const ClientsGrid = () => {
    const { data, loading, currentPage, search, handlePageChange } = useGetClients();
    const { container, grid } = styles();

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
            currentPage={currentPage + 1}
            onPageChange={(page) => handlePageChange(page - 1)}
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
