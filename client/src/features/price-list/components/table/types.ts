import type { Table } from "@/shared/types/table/Table"
import type { Product } from "../../domain/product"

export interface ProductTableProps {
    products: Table<Product>
    handleChange: (page: number) => void
}