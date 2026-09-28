package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.dtos.OptionalResponseDTO;
import org.springframework.data.domain.Page;

public class GetOptionalMapper {

    public static Page<OptionalResponseDTO> modelsToDto(Page<Optional> optionals) {
        return optionals.map(GetOptionalMapper::modelToDto);
    }

    static OptionalResponseDTO modelToDto(Optional optional) {
        return new OptionalResponseDTO(
                optional.getId(),
                optional.getName(),
                optional.getPrice()
        );
    }
}
