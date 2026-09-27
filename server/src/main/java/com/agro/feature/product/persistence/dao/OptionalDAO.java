package com.agro.feature.product.persistence.dao;

import com.agro.feature.product.domain.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionalDAO extends JpaRepository<Optional, Long> {
    @Query("SELECT o.name FROM Optional o WHERE o.id IN :ids AND o.product.id = :productId")
    List<String> findNameByIdInAndProductId(
            @Param("ids") List<Long> ids,
            @Param("productId") Long productId);
}
