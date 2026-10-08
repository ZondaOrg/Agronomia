package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.dtos.OptionalResponseDTO;
import com.agro.shared.dtos.table.TableResponseDTO;

import java.time.LocalDateTime;

public record GetProductResponseDTO(
        Long id,
        String name,
        Long idType,
        Money money,
        Double listPrice,
        Integer bonification,
        Double freight,
        IVA iva,
        String description,
        LocalDateTime updateAt,
        TableResponseDTO<OptionalResponseDTO> optionals
) {
}
