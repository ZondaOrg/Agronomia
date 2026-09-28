import { MAIN } from "./main";

export const PAYMENT_PATH = `${MAIN}/payment`;
export const PAYMENT_PATH_BY_TABLE_PROVIDER_ID = (paymentId: number) =>
    `${PAYMENT_PATH}/table/${paymentId}`;
export const PAYMENT_PATH_BY_PROVIDER_ID = (paymentId: number) =>
    `${PAYMENT_PATH}/${paymentId}`;
export const PAYMENT_SEARCH_PATH_BY_PROVIDER_ID = (providerId: number) =>
    `${PAYMENT_PATH}/${providerId}/search`;
