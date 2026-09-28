import type { Table } from "@/shared/types/table/Table";
import type { Optional } from "../domain/optional";
import http from "@/core/server/http-client";
import { PAGE_OFF } from "@/core/server/urls/optionals";

export async function getPageOffOptionals(
    page: number, 
    size: number,
    idProduct: string
) : Promise<Table<Optional>> {
    const optionals = await http.get(PAGE_OFF(idProduct), {
        params: { page, size }
    });
    return optionals.data
}