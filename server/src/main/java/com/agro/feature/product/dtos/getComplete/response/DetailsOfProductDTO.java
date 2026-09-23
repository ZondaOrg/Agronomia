package com.agro.feature.product.dtos.getComplete.response;

import java.util.List;

public record DetailsOfProductDTO(
        String description,
        List<OptionalResponseDTO> optionals
) {
}
