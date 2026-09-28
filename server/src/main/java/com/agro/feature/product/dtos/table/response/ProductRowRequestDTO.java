package com.agro.feature.product.dtos.table.response;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import java.time.LocalDateTime;

public record ProductRowRequestDTO(
        Long id,
        String name,
        Money money,
        Double listPrice,
        Integer bonification,
        Double freight,
        IVA iva,
        LocalDateTime updateAt,
        DetailsOfProductDTO details
) {
}