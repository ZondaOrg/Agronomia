package com.agro.feature.cotizar.dto.response;

import java.util.List;

public record StepPreviewResponseDTO(
        String nameProvider,
        String nameProduct,
        List<String> nameOptionals
) {
}
