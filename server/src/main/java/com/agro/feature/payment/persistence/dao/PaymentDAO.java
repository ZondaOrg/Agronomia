package com.agro.feature.payment.persistence.dao;

import com.agro.feature.payment.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentDAO extends JpaRepository<Payment, Long> {

    @Modifying
    @Query("UPDATE Payment p SET p.deleted = true WHERE p.id IN :ids")
    void softDeleteByIds(@Param("ids") List<Long> ids);
}
