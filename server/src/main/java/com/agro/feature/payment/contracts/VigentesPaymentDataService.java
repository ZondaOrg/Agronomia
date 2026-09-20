package com.agro.feature.payment.contracts;

import com.agro.feature.payment.domain.VigentePayment;
import jakarta.validation.constraints.NotNull;

public interface VigentesPaymentDataService {
    VigentePayment getVigentePaymentsPaginatedById(Long providerId);

    VigentePayment createVigentePayment(VigentePayment model, @NotNull Long providerId);
}
