package com.agro.feature.payment.contracts;

import com.agro.feature.payment.domain.VigentePayment;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface VigentesPaymentDataService {
    VigentePayment createVigentePayment(VigentePayment model, @NotNull Long providerId);

    VigentePayment updateVigent(@NotNull Long vigentId, List<Long> deletePayments, VigentePayment model);

    VigentePayment getVigentPaymentsById(Long providerId);

    VigentePayment searchVigentPaymentsByProviderId(Long providerId, String description);
}
