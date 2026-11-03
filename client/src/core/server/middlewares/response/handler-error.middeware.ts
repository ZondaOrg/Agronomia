import type { ErrorResponse } from "@/core/server/types/error-response";
import { ErrorCause } from "@/core/server/types/error-cause";
import { HttpError } from "@/core/server/errors/http-error";
import type { AxiosError, AxiosInstance } from "axios";
import handlerErrorServices from "../../services/response/handler-error.service";

function handlerErrorMiddleware(http: AxiosInstance) {
    http.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ErrorResponse>) => {
            if (error.response) return handlerErrorServices(error);

            const networkError = new HttpError(
                {
                    id: "NETWORK_ERROR",
                    title: "Network error",
                    message: error.message,
                    path: error.config?.url ?? "",
                    timestamp: new Date(),
                    cause: ErrorCause.INTERNAL_SERVER_ERROR,
                },
                503,
            );
            return Promise.reject(networkError);
        },
    )
}

export default handlerErrorMiddleware;