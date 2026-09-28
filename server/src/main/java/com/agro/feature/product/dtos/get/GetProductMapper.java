package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import org.springframework.data.domain.Page;

public class GetProductMapper {
    public static GetProductResponseDTO modelToDto(Product product, Page<Optional> pageOffOptionals) {
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
                product.getCreatedAt(),
                GetOptionalTable.modelsToDto(pageOffOptionals)
        );
    }
}
