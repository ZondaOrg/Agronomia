package com.agro.feature.payment.persistence.dao;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.provider.domain.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VigentesPaymentDAO extends JpaRepository<VigentePayment, Long> {
    Optional<VigentePayment> findByProvider(Provider provider);
}