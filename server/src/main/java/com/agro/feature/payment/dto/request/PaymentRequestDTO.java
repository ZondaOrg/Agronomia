package com.agro.feature.payment.dto.request;

import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PaymentRequestDTO(
        @NotNull
        String description,

        @NotNull
        String application,

        @Min(0)
        @Max(100)
        Double percentage,

        @Min(0)
        @Max(100)
        double bonusPercentage
) {
    @AssertTrue(message = "Cuando la aplicación es No Aplica, el valor % debe estar vacío")
    public boolean isPercentageValidForApplication() {
        Application selectedApplication = Application.fromLabel(application);

        return selectedApplication != Application.NOAPLICA || percentage == null;
    }

    public Payment toModel() {
        return Payment.builder()
                .description(description)
                .application(Application.fromLabel(application))
                .percentage(percentage)
                .bonusPercentage(bonusPercentage)
                .build();
    }
}