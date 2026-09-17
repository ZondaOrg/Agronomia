package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.Payment;

public record PaymentResponseDTO(
        long id,
        String description,
        String application,
        int percentage,
        int bonusPercentage
) {
    public static PaymentResponseDTO fromModel(Payment payments) {
        return new PaymentResponseDTO(
                payments.getId(),
                payments.getDescription(),
                payments.getApplication().getLabel(),
                payments.getPercentage(),
                payments.getBonusPercentage()
        );
    }
}
