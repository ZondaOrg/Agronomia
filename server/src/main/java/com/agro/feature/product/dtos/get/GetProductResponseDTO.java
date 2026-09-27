package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.dtos.OptionalResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

public record GetProductResponseDTO(
        Long id,
        String name,
        String type,
        Money money,
        Double listPrice,
        Integer bonification,
        Double freight,
        IVA iva,
        String description,
        LocalDateTime updateAt,
        List<OptionalResponseDTO> optionals
) {
}
