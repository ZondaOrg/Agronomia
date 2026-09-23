import { Searcher } from "@/shared/components/searcher/Sercher";
import useGetPageOfProducts from "../hooks/get-pages-of-products";
import Table from "@/shared/components/table/simple-table/Table";
import type { Product } from "../domain/product";
import { container } from "./styles";

const ListPrice = () => {
    const { data, search, onSearch, handleChange } = useGetPageOfProducts();

    return (
        <div className={container}>
            <Searcher 
                value={search} 
                title = "Buscar Producto"
                placeholder = "Ingrese el producto"
                onChange={onSearch} />
            {data && 
                <Table<Product>
                    table={data}
                    nameElements="productos"
                    onPageChange={handleChange}
                    renderRowActions={(_, data) => (
                        <div>
                            <button onClick={() => console.log(data)}>Editar</button>
                            <button onClick={() => console.log(data)}>
                                Eliminar
                            </button>
                        </div>
            )}
            />}
        </div>
    )
}

export default ListPrice;