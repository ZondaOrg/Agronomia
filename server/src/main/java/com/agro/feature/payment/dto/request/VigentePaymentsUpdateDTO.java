package com.agro.feature.payment.dto.request;

import com.agro.feature.payment.domain.VigentePayment;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record VigentePaymentsUpdateDTO(
        @NotNull
        Long vigentId,
        @NotNull
        String nameList,
        @Valid
        List<PaymentRequestDTO> newPayments,
        List<Long> deletePayments
) {
    public VigentePayment toModel() {
        return VigentePayment.builder()
            .nameList(nameList)
            .payments(newPayments.stream().map(PaymentRequestDTO::toModel).toList())
            .build();
    }
}
