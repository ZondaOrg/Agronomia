package com.agro.feature.payment.persistence.dao;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.provider.domain.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VigentesPaymentDAO extends JpaRepository<VigentePayment, Long> {
    VigentePayment findByProvider(Provider provider);
}
