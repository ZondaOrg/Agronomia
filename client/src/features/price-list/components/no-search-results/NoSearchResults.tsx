import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { SearchIcon } from "@/shared/components/icon/components/icons/Search";

interface NoSearchResultsProps {
    search: string
}

export const NoSearchResults = ({ search }: NoSearchResultsProps) => (
    <EmptyState
        icon={<SearchIcon />}
        title={
            <>
                El producto <strong>{search}</strong> no fue encontrado
            </>
        }
        description="Cambiá tu búsqueda o añade un producto"
    />
);

export default NoSearchResults;
