package com.agro.feature.quote.dtos.calculateArsManual.response;

import java.math.BigDecimal;

public record CalculateArsManualResponse(
        BigDecimal totalArs,
        BigDecimal totalUsd,
        BigDecimal dolarPrice,
        BigDecimal listPriceArs
) {
}
