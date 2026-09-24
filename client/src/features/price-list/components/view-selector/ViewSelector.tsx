import type { Table } from "@/shared/types/table/Table"
import ProductTable from "../table/ProductTable"
import type { Product } from "../../domain/product"
import NoSearchResults from "../no-search-results/NoSearchResults"
import EmptyProduct from "../empty-product/EmptyProduct"

interface ViewSelectorProps {
    products: Table<Product>
    search: string 
    handleChange: (page: number) => void
}

const ViewSelector = ({products, search, handleChange}: ViewSelectorProps) => {
    if(products.page.totalElements === 0 && search === "") {
        return <EmptyProduct />
    }
    else if(products.page.totalElements === 0) {
        return <NoSearchResults search={search} />
    }
    else {
        return <ProductTable products={products} handleChange={handleChange}/>
    }
}

export default ViewSelector;