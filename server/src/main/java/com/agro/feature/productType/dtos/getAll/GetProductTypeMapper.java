package com.agro.feature.productType.dtos.getAll;

import com.agro.feature.productType.domain.ProductType;

public class GetProductTypeMapper {
    public static GetProductTypeResponseDTO modelToDto(ProductType productType) {
        return new GetProductTypeResponseDTO(productType.getName(), productType.getId());
    }
}
