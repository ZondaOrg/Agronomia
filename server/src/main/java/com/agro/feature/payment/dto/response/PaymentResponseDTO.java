package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.Payment;

public record PaymentResponseDTO(
        long id,
        String application,
        String description,
        int percentage,
        int bonusPercentage
) {
    public static PaymentResponseDTO fromModel(Payment payments) {
        return new PaymentResponseDTO(
                payments.getId(),
                payments.getApplication().getLabel(),
                payments.getDescription(),
                payments.getPercentage(),
                payments.getBonusPercentage()
        );
    }
}
