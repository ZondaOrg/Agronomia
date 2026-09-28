import type { Row, Table } from "@/shared/types/table/Table";
import type { Product } from "../../domain/product";
import type { ProductResponse } from "../product/response";
import adapterProduct from "../product/adapter";

function adapterTableRequest(table: Table<ProductResponse>): Table<Product> {
    const { rows, ...response } = table;
    return {
        ...response,
        rows: adapterProductRows(rows)
    }
}

function adapterProductRows(rows: Row<ProductResponse>[]) {
    return rows.map(row => {
        return {
            id: row.id,
            data: adapterProduct(row.data)
        }
    })
}

export default adapterTableRequest;