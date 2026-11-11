package com.agro.feature.product.dtos.quote.response;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.dtos.OptionalResponseDTO;

import java.util.List;

public record QuoteProductResponse(
        Long id,
        String name,
        Money money,
        Double listPrice,
        IVA iva,
        Double freight,
        List<OptionalResponseDTO> optionals
) {
}
