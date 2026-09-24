import http from "@/core/server/http-client";
import { PAGE_OF } from "@/core/server/urls/url";
import type { Product } from "../domain/product";
import adapterTableRequest from "../adapters/table/adapter";
import type { Table } from "@/shared/types/table/Table";

export async function getProducts(
    page: number, 
    size: number, 
    search: string,
    providerId: string
): Promise<Table<Product>> {
    const pageOfProducts = await http.get(PAGE_OF(providerId), {
        params: { page, size, search }
    });
    return adapterTableRequest(pageOfProducts.data);
}