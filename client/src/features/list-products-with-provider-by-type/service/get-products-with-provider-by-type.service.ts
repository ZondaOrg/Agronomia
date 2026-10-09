import http from "@/core/server/http-client";
import { PRODUCTS_BY_TYPE } from "@/core/server/urls/product";
import type { Table } from "@/shared/types/table/Table";
import type { ProductWithProvider } from "../types/ProductWithProvider";

type ProductWithProviderResponse = {
    idProduct: number;
    name: string;
    nameProvider: string;
};

const getProductsWithProviderByType = async (
    typeId: number,
    page = 0,
    size = 5,
): Promise<Table<ProductWithProvider>> => {
    const response = await http.get<Table<ProductWithProviderResponse>>(
        PRODUCTS_BY_TYPE(typeId),
        { params: { page, size } },
    );

    return {
        ...response.data,
        rows: response.data.rows.map((row) => ({
            ...row,
            data: {
                idProduct: row.data.idProduct,
                product: row.data.name,
                provider: row.data.nameProvider,
            },
        })),
    };
};

export default getProductsWithProviderByType;