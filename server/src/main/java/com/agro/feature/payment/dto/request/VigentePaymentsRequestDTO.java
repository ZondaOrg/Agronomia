package com.agro.feature.payment.dto.request;

import com.agro.feature.payment.domain.VigentePayment;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record VigentePaymentsRequestDTO(
        @NotNull
        Long providerId,
        @NotNull
        String nameList,
        List<PaymentRequestDTO> payments
) {

    public VigentePayment toModel() {
        return VigentePayment.builder()
                .nameList(nameList)
                .payments(payments.stream().map(PaymentRequestDTO::toModel).toList())
                .build();
    }
}
