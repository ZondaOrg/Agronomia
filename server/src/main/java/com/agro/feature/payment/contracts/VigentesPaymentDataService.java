package com.agro.feature.payment.contracts;

import com.agro.feature.payment.domain.VigentePayment;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface VigentesPaymentDataService {
    VigentePayment getVigentePaymentsPaginatedById(Long providerId);

    VigentePayment createVigentePayment(VigentePayment model, @NotNull Long providerId);

    VigentePayment updateVigent(@NotNull Long vigentId, List<Long> deletePayments, VigentePayment model);
}
