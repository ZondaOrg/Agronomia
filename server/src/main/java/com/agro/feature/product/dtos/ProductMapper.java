package com.agro.feature.product.dtos;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.response.AddProductResponseDTO;

public class ProductMapper {

    public static Product dtoToModel(AddProductRequestDTO request) {
        if(request.freight() == null) {
            return new Product(
                    request.name(),
                    request.description(),
                    request.money(),
                    request.listPrice(),
                    request.iva(),
                    request.bonification()
            );
        }
        return new Product(
                request.name(),
                request.description(),
                request.money(),
                request.listPrice(),
                request.iva(),
                request.bonification(),
                request.freight()
        );
    }

    public static AddProductResponseDTO modelToDto(Product addedProduct) {
        return new AddProductResponseDTO(addedProduct.getName(), addedProduct.getId());
    }
}
