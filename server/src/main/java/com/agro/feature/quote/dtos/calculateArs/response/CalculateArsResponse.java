package com.agro.feature.quote.dtos.calculateArs.response;

import java.math.BigDecimal;

public record CalculateArsResponse(
        BigDecimal totalArs,
        BigDecimal totalUsd,
        BigDecimal dolarPrice,
        BigDecimal listPriceArs
) {
}
