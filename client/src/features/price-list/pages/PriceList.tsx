import { Searcher } from "@/shared/components/searcher/Sercher";
import useGetPageOfProducts from "../hooks/get-pages-of-products";
import { container } from "./styles";
import ViewSelector from "../components/view-selector/ViewSelector";

const ListPrice = () => {
    const { data, search, onSearch, handleChange } = useGetPageOfProducts();

    return (
        <div className={container}>
            <Searcher 
                value={search} 
                title = "Buscar Producto"
                placeholder = "Ingrese el producto"
                onChange={onSearch} />
            {data && <ViewSelector products={data} search={search} handleChange={handleChange} />}
        </div>
    )
}

export default ListPrice;