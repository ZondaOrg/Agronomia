package com.agro.feature.productType.dtos.request;

import com.agro.feature.productType.domain.ProductType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ProductTypeRequestDTO(
        @NotNull @NotBlank @NotEmpty
        String nameType
) {
    public ProductType toModel() {
        return ProductType.builder().name(nameType).build();
    }
}
