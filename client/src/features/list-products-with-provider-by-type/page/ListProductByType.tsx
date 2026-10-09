import { useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "@/shared/components/spinner/Spinner";
import Table from "@/shared/components/table/simple-table/Table";
import { useGetProductsWithProviderByType } from "../hooks/use-get-products-with-provider-by-type";
import { EmptyState } from "@/features/get-clients/components/emptyState/EmptyState";
import { TractorIcon } from "@/shared/components/icon/components/icons/Tractor";
import ProductByTypeActions from "../components/ProductByTypeActions";

const ListProductByType = () => {
    const { typeId, typeName } = useParams();
    const parsedTypeId = Number(typeId);
    const { data, error, loading, getProducts, onPageChange } =
        useGetProductsWithProviderByType(parsedTypeId);

    useEffect(() => {
        if (Number.isInteger(parsedTypeId) && parsedTypeId > 0) {
            getProducts();
        }
    }, [getProducts, parsedTypeId]);

    if (!Number.isInteger(parsedTypeId) || parsedTypeId <= 0) {
        return <p>El tipo de producto no es válido.</p>;
    }

    if (loading && !data) {
        return <Spinner />;
    }

    if (error) {
        return <p>No se pudieron cargar los productos.</p>;
    }

    if (!data || data.page.totalElements === 0) {
        return (
            <EmptyState
                icon={<TractorIcon />}
                title={`Todavía no cargaste ningún producto en ${typeName ?? "este tipo"}`}
                description={`Agregá un producto para ${typeName ?? "este tipo"}`}
            />
        );
    }

    return (
        <Table
            table={data}
            nameElements="productos"
            onPageChange={onPageChange}
            renderRowActions={() => <ProductByTypeActions />}
        />
    );
};

export default ListProductByType;
