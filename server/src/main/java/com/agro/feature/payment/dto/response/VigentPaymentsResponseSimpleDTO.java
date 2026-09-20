package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.VigentePayment;
import org.jspecify.annotations.Nullable;

import java.util.List;

public record VigentPaymentsResponseSimpleDTO(
        Long id,
        String nameList,
        List<PaymentResponseDTO> payments
) {
    public static @Nullable VigentPaymentsResponseSimpleDTO fromModel(VigentePayment vigent) {
        return new VigentPaymentsResponseSimpleDTO(
                vigent.getId(),
                vigent.getNameList(),
                vigent.getPayments().stream().map(PaymentResponseDTO::fromModel).toList()
        );
    }
}
