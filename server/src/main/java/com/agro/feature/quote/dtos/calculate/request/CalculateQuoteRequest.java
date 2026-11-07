package com.agro.feature.quote.dtos.calculate.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record CalculateQuoteRequest(
        @NotNull Long productId,
        @NotNull @Positive Integer quantity,
        @NotNull List<Long> optionalIds,
        @NotNull Boolean includeFreight
) {
}
