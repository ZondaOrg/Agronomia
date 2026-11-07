package com.agro.feature.report.orchestrator.previewStep2;

import com.agro.feature.report.dto.response.StepPreviewResponseDTO;

import java.util.List;

public interface PreviewStep3 {
    StepPreviewResponseDTO getPreview(Long idProvider, Long idProduct, List<Long> idsOptionals);
}
