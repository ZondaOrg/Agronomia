import type { AxiosError, AxiosInstance } from "axios";
import type { ErrorResponse } from "../../types/error-response";
import { ErrorCause } from "../../types/error-cause";
import { REFRESH_SESSION_PATH } from "../../urls/session";
import { removeToken } from "../jwt/jwt";

async function handlerRefreshService(http: AxiosInstance, error: AxiosError<ErrorResponse>) {
    if (error.response?.data?.cause !== ErrorCause.EXPIRED_SESSION || !error.config)
        return Promise.reject(error);

    try {
        await http.post(REFRESH_SESSION_PATH);
    } catch {
        removeToken();
        return Promise.reject(error);
    }

    return http(error.config);
}

export default handlerRefreshService;
