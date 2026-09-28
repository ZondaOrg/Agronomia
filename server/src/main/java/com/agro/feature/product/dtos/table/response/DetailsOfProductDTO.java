package com.agro.feature.product.dtos.table.response;

import com.agro.feature.product.dtos.OptionalResponseDTO;

import java.util.List;

public record DetailsOfProductDTO(
        String description,
        List<OptionalResponseDTO> optionals
) {
}
