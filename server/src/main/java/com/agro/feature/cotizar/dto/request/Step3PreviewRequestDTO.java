package com.agro.feature.cotizar.dto.request;

import java.util.List;

public record Step3PreviewRequestDTO(
        Long idProvider,
        Long idProduct,
        List<Long> idOptionals
) {
}
