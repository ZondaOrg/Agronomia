import { useParams } from "react-router";
import { Searcher } from "@/shared/components/searcher/Sercher";
import { useGetProductsWithProviderByType } from "../hooks/use-get-products-with-provider-by-type";
import ViewSelector from "../components/ViewSelector";

const ListProductByType = () => {
    const { typeId, typeName } = useParams();
    const parsedTypeId = Number(typeId);
    const { data, search, onSearch, handleChange } =
        useGetProductsWithProviderByType(parsedTypeId);

    if (!Number.isInteger(parsedTypeId) || parsedTypeId <= 0) {
        return <p>El tipo de producto no es válido.</p>;
    }

    return (
        <>
            <Searcher
                value={search}
                title="Buscar Producto"
                placeholder="Ingrese el producto"
                onChange={onSearch}
            />
            {data && (
                <ViewSelector
                    products={data}
                    search={search}
                    typeName={typeName}
                    onPageChange={handleChange}
                />
            )}
        </>
    );
};

export default ListProductByType;
