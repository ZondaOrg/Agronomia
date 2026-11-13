import { MAIN } from "./main";

export const PROVIDER_PATH = `${MAIN}/provider`;
export const PUT_PROVIDER_PATH = `${PROVIDER_PATH}`;
export const PROVIDER_PATH_BY_ID = (providerId: number) =>
    `${PROVIDER_PATH}/${providerId}`;
export const PROVIDER_SEARCH = `${PROVIDER_PATH}/search`;
