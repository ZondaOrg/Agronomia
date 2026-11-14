import type { Step3PreviewRequest } from "../types/step-preview";

export type Step3PreviewRequestDTO = Step3PreviewRequest;

export function step3PreviewRequestAdapter(
    request: Step3PreviewRequest,
): Step3PreviewRequestDTO {
    return {
        idProvider: request.idProvider,
        idProduct: request.idProduct,
        idOptionals: request.idOptionals,
    };
}
