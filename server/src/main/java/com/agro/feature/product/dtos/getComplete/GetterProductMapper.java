package com.agro.feature.product.dtos.getComplete;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.getComplete.response.ProductRowRequestDTO;

public class GetterProductMapper {

    public static ProductRowRequestDTO getProductRow(Product product) {
        return new ProductRowRequestDTO(
                product.getId(),
                product.getName(),
                product.getMoney(),
                product.getListPrice(),
                product.getBonification(),
                product.getFreight(),
                product.getIva(),
                product.getCreatedAt(),
                product.getDescription(),
                DetailsMapper.modelToDto(product)
        );
    }
}
