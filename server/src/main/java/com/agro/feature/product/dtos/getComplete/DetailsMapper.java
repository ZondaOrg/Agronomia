package com.agro.feature.product.dtos.getComplete;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.getComplete.response.DetailsOfProductDTO;
import com.agro.feature.product.dtos.getComplete.response.OptionalResponseDTO;

import java.util.List;

public class DetailsMapper {
    public static DetailsOfProductDTO modelToDto(Product product) {
        return new DetailsOfProductDTO(product.getDescription(), modelsToDto(product.getOptionals()));
    }

    static List<OptionalResponseDTO> modelsToDto(List<Optional> optionals) {
        return (List<OptionalResponseDTO>) optionals.stream().map(DetailsMapper::modelToDto);
    }

    static OptionalResponseDTO modelToDto(Optional optional) {
        return new OptionalResponseDTO(
                optional.getId(),
                optional.getName(),
                optional.getPrice()
        );
    }
}
