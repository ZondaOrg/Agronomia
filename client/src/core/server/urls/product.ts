import { MAIN } from "./url";

export const ADD_PATH = (idProvider: string) => `${MAIN}/product/add/${idProvider}`
export const PAGE_OF  = (idProvider: string) => `${MAIN}/product/page-of/${idProvider}`
export const FIND_BY = (id: string) => `${MAIN}/product/find/${id}`
export const EDIT_TO = (id: string) => `${MAIN}/product/edit/${id}`
export const PRODUCTS_BY_TYPE = (typeId: number) => `${MAIN}/product/${typeId}`