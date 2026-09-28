package com.agro.feature.productType.persistence;

import com.agro.feature.productType.domain.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeDAO extends JpaRepository<ProductType, Long> {
}
