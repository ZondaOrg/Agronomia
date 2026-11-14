package com.agro.feature.quote.dtos.calculateArsManual.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

public record CalculateArsManualRequest(
        @NotNull Long productId,
        @NotNull @Positive Integer quantity,
        @NotNull List<Long> optionalIds,
        @NotNull Boolean includeFreight,
        @NotNull @Positive BigDecimal dolarPrice
) {
}
