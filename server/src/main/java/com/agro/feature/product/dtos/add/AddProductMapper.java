package com.agro.feature.product.dtos.add;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.add.response.AddProductResponseDTO;

public class AddProductMapper {

    public static Product dtoToModel(AddProductRequestDTO request) {
        if(request.freight() == null) {
            return new Product(
                    request.name(),
                    request.description(),
                    request.money(),
                    request.listPrice(),
                    request.iva(),
                    request.type(),
                    request.bonification()
            );
        }
        return new Product(
                request.name(),
                request.description(),
                request.money(),
                request.listPrice(),
                request.iva(),
                request.type(),
                request.bonification(),
                request.freight()
        );
    }

    public static AddProductResponseDTO modelToDto(Product addedProduct) {
        return new AddProductResponseDTO(addedProduct.getName(), addedProduct.getId());
    }
}
