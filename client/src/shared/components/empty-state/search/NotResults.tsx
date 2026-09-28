import { SearchIcon } from "@/shared/components/icon/components/icons/Search";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";

type NotResultsProps = {
    search: string;
    entity: string;
    description?: string;
};

export const NotResults = ({
    search,
    entity,
    description = "Cambiá tu búsqueda o intentá nuevamente.",
}: NotResultsProps) => (
    <EmptyState
        icon={<SearchIcon />}
        title={
            <>
                El {entity} <strong>{search}</strong> no fue encontrado
            </>
        }
        description={description}
    />
);
