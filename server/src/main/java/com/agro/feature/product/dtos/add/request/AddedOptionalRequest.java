package com.agro.feature.product.dtos.add.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AddedOptionalRequest(
        @NotNull @NotBlank @NotEmpty String name,
        @NotNull @Min(0) Double price
) {
}
