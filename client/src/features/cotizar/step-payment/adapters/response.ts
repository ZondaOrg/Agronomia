import type { StepPreview } from "../types/step-preview";

export interface StepPreviewResponseDTO {
    nameProvider: string;
    nameProduct: string;
    nameOptionals: string[];
}

export function stepPreviewResponseAdapter(
    response: StepPreviewResponseDTO,
): StepPreview {
    return {
        nameProvider: response.nameProvider,
        nameProduct: response.nameProduct,
        nameOptionals: response.nameOptionals,
    };
}
