package com.agro.feature.product.dtos.add.request;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record AddProductRequestDTO(
        @NotNull @NotBlank @NotEmpty String name,
        @NotNull @NotBlank @NotEmpty String type,
        @NotNull Money money,
        @NotNull Double listPrice,
        @NotNull IVA iva,
        @NotNull Integer bonification,
        Double freight,
        String description,
        Set<AddedOptionalRequest> optionals
) {
}
