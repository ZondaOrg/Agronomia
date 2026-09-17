package com.agro.feature.payment.contracts;

import com.agro.feature.payment.domain.VigentePayment;

public interface VigentesPaymentDataService {
    VigentePayment getVigentePaymentsPaginatedById(Long providerId);
}
