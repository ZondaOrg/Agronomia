import type { Product } from "../../domain/product"
import { Table } from "@/shared/components/table/simple-table/Table"
import type { ProductTableProps } from "./types"


const ProductTable = ({products, handleChange}: ProductTableProps) => {
    return (
        <Table<Product>
            table={products}
            nameElements="productos"
            onPageChange={handleChange}
            renderRowActions={(_, products) => (
            <div>
                <button onClick={() => console.log(products)}>Editar</button>
                <button onClick={() => console.log(products)}>
                Eliminar
                </button>
            </div>
            )}
        />
    )
}

export default ProductTable;