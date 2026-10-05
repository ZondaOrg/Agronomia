import http from "@/core/server/http-client";
import { GET_ALL_WITH_IMAGES_PATH } from "@/core/server/urls/product-type";
import type { Page } from "@/shared/types/page/Page";
import type { ProductType } from "../types/ProductType";

async function getTypesProducts(
    page = 0,
    size = 8,
): Promise<Page<ProductType>> {
    const response = await http.get<Page<ProductType>>(
        GET_ALL_WITH_IMAGES_PATH,
        { params: { page, size } },
    );

    return response.data;
}

export default getTypesProducts;