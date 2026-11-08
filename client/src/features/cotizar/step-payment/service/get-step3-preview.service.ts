import http from "@/core/server/http-client";
import { STEP3_PREVIEW_PATH } from "@/core/server/urls/report";
import { step3PreviewRequestAdapter } from "../adapters/request";
import {
    stepPreviewResponseAdapter,
    type StepPreviewResponseDTO,
} from "../adapters/response";
import type { Step3PreviewRequest, StepPreview } from "../types/step-preview";

export async function getStep3Preview(
    request: Step3PreviewRequest,
): Promise<StepPreview> {
    const response = await http.post<StepPreviewResponseDTO>(
        STEP3_PREVIEW_PATH,
        step3PreviewRequestAdapter(request),
    );

    return stepPreviewResponseAdapter(response.data);
}
