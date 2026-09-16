package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.Payment;

public record PaymentResponseDTO(
        long id
) {
    public static PaymentResponseDTO fromModel(Payment payments) {
        return new PaymentResponseDTO(payments.getId());
    }
}
