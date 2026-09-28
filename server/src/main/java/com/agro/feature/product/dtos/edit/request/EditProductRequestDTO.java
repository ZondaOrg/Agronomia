package com.agro.feature.product.dtos.edit.request;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.dtos.add.request.AddedOptionalRequest;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record EditProductRequestDTO(
        @NotNull Money money,
        @NotNull Double listPrice,
        @NotNull IVA iva,
        @NotNull Integer bonification,
        @NotNull List<AddedOptionalRequest> optionalsToAdd,
        @NotNull List<Long> optionalsToDelete,
        Double freight,
        String description
) {
}
