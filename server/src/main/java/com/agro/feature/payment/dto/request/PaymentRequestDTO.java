package com.agro.feature.payment.dto.request;

import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PaymentRequestDTO(
        @NotNull
        String description,
        String application,
        @Min(0)
        @Max(100)
        int percentage,
        @Min(0)
        @Max(100)
        int bonusPercentage
) {
    public Payment toModel() {
        return Payment.builder()
                .description(description)
                .application(Application.fromLabel(application))
                .percentage(percentage)
                .bonusPercentage(bonusPercentage)
                .build();
    }

}
