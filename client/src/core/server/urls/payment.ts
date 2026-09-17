import { MAIN } from "./main";

export const PAYMENT_PATH = `${MAIN}/payment`;
export const PAYMENT_PATH_BY_PROVIDER_ID = (paymentId: number) =>
    `${PAYMENT_PATH}/${paymentId}`;
