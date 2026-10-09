import type { Table } from "@/shared/types/table/Table";
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
import { EmptyState } from "@/features/get-clients/components/emptyState/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import ProductByTypeActions from "./ProductByTypeActions";
import TableComponent from "@/shared/components/table/simple-table/Table";
import type { ProductWithProvider } from "../types/ProductWithProvider";

type ViewSelectorProps = {
    products: Table<ProductWithProvider>;
    search: string;
    typeName?: string;
    onPageChange: (page: number) => void;
};

const ViewSelector = ({
    products,
    search,
    typeName,
    onPageChange,
}: ViewSelectorProps) => {
    if (products.page.totalElements === 0 && search === "") {
        return (
            <EmptyState
                icon={<TractorIcon />}
                title={`Todavía no cargaste ningún producto en ${typeName ?? "este tipo"}`}
                description={`Agregá un producto para ${typeName ?? "este tipo"}`}
            />
        );
    }

    if (products.page.totalElements === 0) {
        return (
            <NotResults
                search={search}
                entity="producto"
                description="Cambiá tu búsqueda o añade un producto"
            />
        );
    }

    return (
        <TableComponent
            table={products}
            nameElements="productos"
            onPageChange={onPageChange}
            renderRowActions={() => <ProductByTypeActions />}
        />
    );
};

export default ViewSelector;
