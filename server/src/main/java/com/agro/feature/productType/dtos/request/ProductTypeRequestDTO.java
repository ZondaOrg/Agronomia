package com.agro.feature.productType.dtos.request;

import com.agro.feature.productType.domain.ProductType;

public record ProductTypeRequestDTO(
        String nameType
) {
    public ProductType toModel() {
        return ProductType.builder().name(nameType).build();
    }
}
