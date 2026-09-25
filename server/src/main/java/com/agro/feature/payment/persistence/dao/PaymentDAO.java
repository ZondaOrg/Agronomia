package com.agro.feature.payment.persistence.dao;

import com.agro.feature.payment.domain.Payment;
import com.agro.feature.provider.domain.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentDAO extends JpaRepository<Payment, Long> {

    @Modifying
    @Query("UPDATE Payment p SET p.deleted = true WHERE p.id IN :ids")
    void softDeleteByIds(@Param("ids") List<Long> ids);

    @Query("""
        SELECT p FROM Payment p
        WHERE p.vigentePayment.provider = :provider
        AND lower(function('translate', p.description, 'áéíóúÁÉÍÓÚñÑüÜ', 'aeiouAEIOUnNuU'))
            LIKE concat('%', lower(:description), '%')
        """)
    List<Payment> findAllByProviderAndDescriptionContainingIgnoreCase(
            @Param("provider") Provider provider,
            @Param("description") String description
    );
}