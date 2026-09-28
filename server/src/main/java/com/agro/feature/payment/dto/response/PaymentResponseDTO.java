package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.Payment;
import com.agro.shared.annotations.format.FixedTwoDecimals;

public record PaymentResponseDTO(
        long id,
        String description,
        String application,
        @FixedTwoDecimals
        double percentage,
        @FixedTwoDecimals
        double bonusPercentage
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
