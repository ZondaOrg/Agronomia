import type { Product } from "../../domain/product"
import { Table } from "@/shared/components/table/simple-table/Table"
import type { ProductTableProps } from "./types"
import ActionContainer from "./components/actions-container/ActionsContainer"


const ProductTable = ({products, handleChange}: ProductTableProps) => {
    return (
        <Table<Product>
            table={products}
            nameElements="productos"
            onPageChange={handleChange}
            renderRowActions={(_, product) => <ActionContainer product={product}/>}
        />
    )
}

export default ProductTable;