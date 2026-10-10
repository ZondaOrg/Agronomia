package com.agro.feature.productType.dtos.response;

import com.agro.feature.productType.domain.ProductType;

public record ProductTypeResponseDTO(
        Long id,
        String name,
        String image
) {
    public static ProductTypeResponseDTO fromModel(ProductType productType) {
        return new ProductTypeResponseDTO(
                productType.getId(),
                productType.getName(),
                productType.getImage()
        );
    }
}
