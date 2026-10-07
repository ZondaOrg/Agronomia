import type { ADD_TYPE_PRODUCT } from "./api-contract";

export type TypeProductRequest = {
    [ADD_TYPE_PRODUCT.nameType]: string;
};
