import type { ErrorCauseType } from "./error-cause";
import type { ErrorMotive } from "./error-motive";

export interface ErrorResponse {
    id: string;
    title: string;
    message: string;
    path: string;
    timestamp: Date;
    cause: ErrorCauseType;
    motives?: ErrorMotive[]
}