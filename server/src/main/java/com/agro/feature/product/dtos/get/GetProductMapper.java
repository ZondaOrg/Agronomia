package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.Product;

public class GetProductMapper {
    public static GetProductResponseDTO modelToDto(Product product) {
        return new GetProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getProductType(),
                product.getMoney(),
                product.getListPrice(),
                product.getBonification(),
                product.getFreight(),
                product.getIva(),
                product.getDescription(),
                GetOptionalMapper.modelsToDto(product.getOptionals())
        );
    }
}
