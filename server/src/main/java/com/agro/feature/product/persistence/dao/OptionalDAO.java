package com.agro.feature.product.persistence.dao;

import com.agro.feature.product.domain.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionalDAO extends JpaRepository<Optional, Long> {
    List<Optional> findByIdInAndProductId(List<Long> ids, Long productId);
}
