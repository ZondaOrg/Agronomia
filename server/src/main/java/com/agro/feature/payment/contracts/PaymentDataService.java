package com.agro.feature.payment.contracts;

import com.agro.feature.payment.domain.VigentePayment;

public interface PaymentDataService {
    VigentePayment getVigentePaymentsPaginatedById(Long providerId, int page, int size);
}
