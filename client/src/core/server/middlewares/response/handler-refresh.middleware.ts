import type { ErrorResponse } from "@/core/server/types/error-response";
import type { AxiosError, AxiosInstance } from "axios";
import handlerRefreshService from "../../services/response/handler-refresh.service";

function handlerRefreshMiddleware(http: AxiosInstance) {
    http.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ErrorResponse>) => handlerRefreshService(http, error)
    )
}

export default handlerRefreshMiddleware;
