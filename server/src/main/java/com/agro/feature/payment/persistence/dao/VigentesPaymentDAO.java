package com.agro.feature.payment.persistence.dao;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.provider.domain.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VigentesPaymentDAO extends JpaRepository<VigentePayment, Long> {
    Optional<VigentePayment> findByProvider(Provider provider);

    @Query("""
            SELECT DISTINCT vp FROM vigent_payments vp
            JOIN vp.payments p
            WHERE vp.provider = :provider
            AND p.description ILIKE %:description%
            """)
    Optional<VigentePayment> findByProviderAndPaymentDescriptionContaining(
            @Param("provider") Provider provider,
            @Param("description") String description
    );

}