package com.agro.feature.cotizar.orchestrator.previewStep2;

import com.agro.feature.cotizar.dto.response.StepPreviewResponseDTO;

import java.util.List;

public interface PreviewStep2 {
    StepPreviewResponseDTO getPreview(Long idProvider, Long idProduct, List<Long> idsOptionals);
}
