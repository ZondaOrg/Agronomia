import type { Table } from "@/shared/types/table/Table"
import ProductTable from "../table/ProductTable"
import type { Product } from "../../domain/product"
import { NotResults } from "@/shared/components/empty-state/search/NotResults";
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
        return (
            <NotResults
                search={search}
                entity="producto"
                description="Cambiá tu búsqueda o añade un producto"
            />
        );
    }
    else {
        return <ProductTable products={products} handleChange={handleChange}/>
    }
}

export default ViewSelector;
