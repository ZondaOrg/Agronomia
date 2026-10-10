import type { ErrorCauseType } from "../types/error-cause";
import type { ErrorResponse } from "../types/error-response";

const logger = {
    success: <T>(debug: SuccessType<T>) => 
        console.info(
            '[SUCESS]' + ' ' + isField(debug.status), 
            debug.message, 
            {data: debug.data, path: debug.path}
        ),
    error: (error: ErrorType) => 
        console.error(
            '[ERROR]' + ' ' + isField(error.status),
            error.message,
            {data: error.data, path: error.data.path},
        ),
    uknow: (status?: number) =>
        console.error(
            '[ERROR]' + ' ' + isField(status),
            'Hubo un problema inesperado'
        ),
}

type ErrorType = {
    message: string
    data: ErrorResponse, 
    status?: number
}

type SuccessType<T> = {
    data: T, 
    message: string
    status?: number, 
    path?: string
}

const isField = (field?: number | string | ErrorCauseType) => field ? field : '';

export default logger;