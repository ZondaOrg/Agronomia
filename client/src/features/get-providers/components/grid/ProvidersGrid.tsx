import { useGetProviders } from "../../hooks/use-get-providers";
import { ProviderCard } from "../card/ProviderCard";
import { styles } from "./style";
import { NoProviders } from "./emptyState/NoProviders";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import { PaginatedGrid } from "@/shared/components/pagination/PaginatedGrid";

export const ProvidersGrid = () => {
    const { data, loading, currentPage, search, handlePageChange } =
        useGetProviders();
    const { container, grid } = styles();

    const emptyState = search ? (
        <NotResults
            search={search}
            entity="proveedor"
            description="Cambiá tu búsqueda o añade un proveedor"
        />
    ) : (
        <NoProviders />
    );

    return (
        <PaginatedGrid
            data={data}
            loading={loading}
            currentPage={currentPage + 1}
            onPageChange={(newPage) => handlePageChange(newPage - 1)}
            containerClassName={container}
            gridClassName={grid}
            emptyState={emptyState}
            renderCard={(provider) => (
                <ProviderCard
                    key={provider.id}
                    provider={provider}
                />
            )}
        />
    );
};
