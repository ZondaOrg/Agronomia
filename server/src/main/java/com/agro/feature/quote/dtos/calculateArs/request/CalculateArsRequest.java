package com.agro.feature.quote.dtos.calculateArs.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record CalculateArsRequest(
        @NotNull Long productId,
        @NotNull @Positive Integer quantity,
        @NotNull List<Long> optionalIds,
        @NotNull Boolean includeFreight
) {
}
