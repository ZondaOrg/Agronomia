package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.dtos.OptionalResponseDTO;

import java.util.List;

public class GetOptionalMapper {

    public static List<OptionalResponseDTO> modelsToDto(List<Optional> optionals) {
        return optionals.stream().map(GetOptionalMapper::modelToDto).toList();
    }

    static OptionalResponseDTO modelToDto(Optional optional) {
        return new OptionalResponseDTO(
                optional.getId(),
                optional.getName(),
                optional.getPrice()
        );
    }
}
