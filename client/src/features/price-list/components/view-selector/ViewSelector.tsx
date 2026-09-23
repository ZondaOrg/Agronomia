import type { Table } from "@/shared/types/table/Table"
import ProductTable from "../table/ProductTable"
import type { Product } from "../../domain/product"

interface ViewSelectorProps {
    products: Table<Product>
    search: string 
    handleChange: (page: number) => void
}

const ViewSelector = ({products, search, handleChange}: ViewSelectorProps) => {
    if(products.page.totalElements === 0 && search === "") {
        return <p>Nunca ingreso una chota</p>
    }
    else if(products.page.totalElements === 0) {
        return <p>Busqueda invalida</p>
    }
    else {
        return <ProductTable products={products} handleChange={handleChange}/>
    }
}

export default ViewSelector;